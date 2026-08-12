const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Inquiry = require('../models/Inquiry');
const { sendInquiryEmail, sendInquiryConfirmation } = require('../services/emailService');
const { protect, authorize } = require('../middleware/auth');

// @route   POST /api/inquiries
// @desc    Submit a new inquiry
// @access  Public
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required')
      .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
    body('email').isEmail().withMessage('Please enter a valid email')
      .normalizeEmail(),
    body('phone').notEmpty().withMessage('Phone number is required')
      .matches(/^[0-9+\-\s()]{10,15}$/).withMessage('Please enter a valid phone number'),
    body('weddingDate').optional().isDate().withMessage('Please enter a valid date')
      .custom(value => new Date(value) >= new Date()).withMessage('Wedding date must be in the future'),
    body('guestCount').optional().isInt({ min: 1, max: 5000 }).withMessage('Guest count must be between 1 and 5000'),
    body('destination').optional().trim().isLength({ max: 100 }).withMessage('Destination cannot exceed 100 characters'),
    body('message').optional().trim().isLength({ max: 1000 }).withMessage('Message cannot exceed 1000 characters')
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        });
      }

      // Check for duplicate inquiries (same email within 24 hours)
      const existingInquiry = await Inquiry.findOne({
        email: req.body.email,
        createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
      });

      if (existingInquiry) {
        return res.status(429).json({
          success: false,
          message: 'You have already submitted an inquiry within the last 24 hours. Please wait before submitting again.'
        });
      }

      // Create new inquiry
      const inquiry = new Inquiry(req.body);
      await inquiry.save();

      // Send email notifications
      try {
        await sendInquiryEmail(inquiry);
        await sendInquiryConfirmation(inquiry);
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // Don't fail the request if email fails
      }

      res.status(201).json({
        success: true,
        message: 'Inquiry submitted successfully! We\'ll be in touch within 24 hours.',
        data: {
          id: inquiry._id,
          name: inquiry.name,
          email: inquiry.email,
          status: inquiry.status,
          createdAt: inquiry.createdAt
        }
      });

    } catch (error) {
      console.error('Error submitting inquiry:', error);
      res.status(500).json({
        success: false,
        message: 'Error submitting inquiry. Please try again.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
);

// @route   GET /api/inquiries
// @desc    Get all inquiries (admin only)
// @access  Private/Admin
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const status = req.query.status;

    // Build filter
    const filter = {};
    if (status) filter.status = status;

    const inquiries = await Inquiry.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Inquiry.countDocuments(filter);

    res.json({
      success: true,
      data: inquiries,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching inquiries'
    });
  }
});

// @route   GET /api/inquiries/:id
// @desc    Get single inquiry (admin only)
// @access  Private/Admin
router.get('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    res.json({
      success: true,
      data: inquiry
    });

  } catch (error) {
    console.error('Error fetching inquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching inquiry'
    });
  }
});

// @route   PUT /api/inquiries/:id
// @desc    Update inquiry status (admin only)
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    if (status) inquiry.status = status;
    if (notes) inquiry.notes = notes;
    inquiry.updatedAt = new Date();
    await inquiry.save();

    res.json({
      success: true,
      message: 'Inquiry updated successfully',
      data: inquiry
    });

  } catch (error) {
    console.error('Error updating inquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating inquiry'
    });
  }
});

// @route   DELETE /api/inquiries/:id
// @desc    Delete inquiry (admin only)
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    await inquiry.deleteOne();

    res.json({
      success: true,
      message: 'Inquiry deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting inquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting inquiry'
    });
  }
});

// @route   GET /api/inquiries/stats
// @desc    Get inquiry statistics (admin only)
// @access  Private/Admin
router.get('/stats/all', protect, authorize('admin'), async (req, res) => {
  try {
    const stats = await Inquiry.getStats();
    const total = await Inquiry.countDocuments();
    const today = await Inquiry.countDocuments({
      createdAt: { $gte: new Date().setHours(0, 0, 0, 0) }
    });

    res.json({
      success: true,
      data: {
        total,
        today,
        byStatus: stats
      }
    });

  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics'
    });
  }
});

module.exports = router;