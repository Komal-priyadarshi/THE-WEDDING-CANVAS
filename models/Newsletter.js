const mongoose = require('mongoose');

const NewsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  active: {
    type: Boolean,
    default: true
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  },
  unsubscribedAt: {
    type: Date
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  }
}, {
  timestamps: true
});

// Method to unsubscribe
NewsletterSchema.methods.unsubscribe = async function() {
  this.active = false;
  this.unsubscribedAt = new Date();
  await this.save();
  return this;
};

// Static method to get active subscribers count
NewsletterSchema.statics.getActiveCount = async function() {
  return this.countDocuments({ active: true });
};

module.exports = mongoose.model('Newsletter', NewsletterSchema);