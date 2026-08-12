const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^[0-9+\-\s()]{10,15}$/, 'Please enter a valid phone number']
  },
  weddingDate: {
    type: Date,
    validate: {
      validator: function(value) {
        return value >= new Date();
      },
      message: 'Wedding date must be in the future'
    }
  },
  guestCount: {
    type: Number,
    min: [1, 'Guest count must be at least 1'],
    max: [5000, 'Guest count cannot exceed 5000']
  },
  destination: {
    type: String,
    trim: true,
    maxlength: [100, 'Destination cannot exceed 100 characters']
  },
  message: {
    type: String,
    trim: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'meeting', 'proposal', 'closed'],
    default: 'new'
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  source: {
    type: String,
    enum: ['website', 'instagram', 'facebook', 'referral', 'other'],
    default: 'website'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for response time
InquirySchema.virtual('responseTime').get(function() {
  if (this.updatedAt && this.createdAt) {
    const diff = this.updatedAt - this.createdAt;
    return Math.round(diff / (1000 * 60 * 60)); // hours
  }
  return null;
});

// Pre-save middleware
InquirySchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Static method to get stats
InquirySchema.statics.getStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);
  return stats;
};

module.exports = mongoose.model('Inquiry', InquirySchema);