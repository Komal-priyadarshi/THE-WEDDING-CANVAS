const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Newsletter = require('../models/Newsletter');
const { sendNewsletterConfirmation } = require('../services/emailService');
const { protect, authorize } = require('../middleware/auth');

// @route   POST /api/newsletter/subscribe
// @desc    Subscribe to newsletter
// @access  Public
router.post(
  '/subscribe',
  [
    body('email').isEmail().withMessage('Please enter a valid email')
      .normalizeEmail()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        });
      }

      const { email } = req.body;
      
      // Check if already subscribed
      let subscription = await Newsletter.findOne({ email });
      
      if (subscription) {
        if (subscription.active) {
          return res.status(409).json({
            success: false,
            message: 'This email is already subscribed to our newsletter.'
          });
        } else {
          // Reactivate subscription
          subscription.active = true;
          subscription.unsubscribedAt = null;
          await subscription.save();
          
          return res.json({
            success: true,
            message: 'Welcome back! You have been re-subscribed.'
          });
        }
      }

      // Create new subscription
      subscription = new Newsletter({
        email,
        ipAddress: req.ip,
        userAgent: req.get('user-agent')
      });
      await subscription.save();

      // Send confirmation email
      try {
        await sendNewsletterConfirmation(email);
      } catch (emailError) {
        console.error('Newsletter email error:', emailError);
        // Don't fail the request if email fails
      }

      res.status(201).json({
        success: true,
        message: 'Successfully subscribed to our newsletter!'
      });

    } catch (error) {
      console.error('Error subscribing:', error);
      res.status(500).json({
        success: false,
        message: 'Error subscribing. Please try again.'
      });
    }
  }
);

// @route   POST /api/newsletter/unsubscribe
// @desc    Unsubscribe from newsletter
// @access  Public
router.post(
  '/unsubscribe',
  [
    body('email').isEmail().withMessage('Please enter a valid email')
      .normalizeEmail()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        });
      }

      const { email } = req.body;
      const subscription = await Newsletter.findOne({ email });

      if (!subscription) {
        return res.status(404).json({
          success: false,
          message: 'Email not found in our newsletter list.'
        });
      }

      await subscription.unsubscribe();

      res.json({
        success: true,
        message: 'Successfully unsubscribed from our newsletter.'
      });

    } catch (error) {
      console.error('Error unsubscribing:', error);
      res.status(500).json({
        success: false,
        message: 'Error unsubscribing. Please try again.'
      });
    }
  }
);

// @route   GET /api/newsletter/subscribers
// @desc    Get all subscribers (admin only)
// @access  Private/Admin
router.get('/subscribers', protect, authorize('admin'), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;
    const active = req.query.active === 'true' ? true : 
                   req.query.active === 'false' ? false : undefined;

    const filter = {};
    if (active !== undefined) filter.active = active;

    const subscribers = await Newsletter.find(filter)
      .sort({ subscribedAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Newsletter.countDocuments(filter);

    res.json({
      success: true,
      data: subscribers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching subscribers:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching subscribers'
    });
  }
});

// @route   GET /api/newsletter/stats
// @desc    Get newsletter statistics (admin only)
// @access  Private/Admin
router.get('/stats', protect, authorize('admin'), async (req, res) => {
  try {
    const total = await Newsletter.countDocuments();
    const active = await Newsletter.getActiveCount();
    const today = await Newsletter.countDocuments({
      subscribedAt: { $gte: new Date().setHours(0, 0, 0, 0) }
    });

    res.json({
      success: true,
      data: {
        total,
        active,
        inactive: total - active,
        today
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