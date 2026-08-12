const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config({ path: '../.env' });

// Import models
const Inquiry = require('../models/Inquiry');
const Newsletter = require('../models/Newsletter');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Inquiry.deleteMany();
    await Newsletter.deleteMany();
    console.log('Cleared existing data');

    // Sample inquiries
    const inquiries = [
      {
        name: 'Priya Mehta',
        email: 'priya@example.com',
        phone: '+91 98765 43210',
        weddingDate: new Date('2025-12-15'),
        guestCount: 200,
        destination: 'Udaipur',
        message: 'We want a royal palace wedding in Udaipur with traditional Rajasthani elements.',
        status: 'new'
      },
      {
        name: 'Arjun Singh',
        email: 'arjun@example.com',
        phone: '+91 87654 32109',
        weddingDate: new Date('2025-11-20'),
        guestCount: 350,
        destination: 'Bali',
        message: 'Looking for a destination wedding in Bali with a beach ceremony.',
        status: 'contacted'
      }
    ];

    await Inquiry.insertMany(inquiries);
    console.log('✅ Sample inquiries seeded');

    // Sample newsletter subscribers
    const subscribers = [
      { email: 'test1@example.com', active: true },
      { email: 'test2@example.com', active: true },
      { email: 'test3@example.com', active: false }
    ];

    await Newsletter.insertMany(subscribers);
    console.log('✅ Sample subscribers seeded');

    console.log('✅ Database seeding completed!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();