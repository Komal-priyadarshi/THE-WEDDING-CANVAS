const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify transporter
transporter.verify((error, success) => {
  if (error) {
    console.error('Email transporter error:', error);
  } else {
    console.log('✅ Email service is ready');
  }
});

// Send inquiry notification to admin
const sendInquiryEmail = async (inquiry) => {
  const { name, email, phone, weddingDate, guestCount, destination, message } = inquiry;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Georgia', serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        h2 { color: #8B4513; border-bottom: 2px solid #D4A574; padding-bottom: 10px; }
        .detail { padding: 8px 0; border-bottom: 1px solid #f0f0f0; }
        .label { font-weight: bold; color: #8B4513; display: inline-block; width: 140px; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #D4A574; color: #666; font-size: 14px; }
        .badge { background: #8B4513; color: white; padding: 3px 10px; border-radius: 3px; font-size: 12px; }
      </style>
    </head>
    <body>
      <h2>🕊️ New Wedding Inquiry</h2>
      <p><span class="badge">NEW</span> A new inquiry has been received.</p>
      
      <div style="background: #faf6f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <div class="detail"><span class="label">👤 Name:</span> ${name}</div>
        <div class="detail"><span class="label">📧 Email:</span> <a href="mailto:${email}">${email}</a></div>
        <div class="detail"><span class="label">📞 Phone:</span> ${phone}</div>
        <div class="detail"><span class="label">📅 Wedding Date:</span> ${weddingDate ? new Date(weddingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Not specified'}</div>
        <div class="detail"><span class="label">👥 Guest Count:</span> ${guestCount || 'Not specified'}</div>
        <div class="detail"><span class="label">📍 Destination:</span> ${destination || 'Not specified'}</div>
        ${message ? `<div class="detail"><span class="label">💬 Message:</span> ${message}</div>` : ''}
      </div>
      
      <div class="footer">
        <p>💫 The Wedding Canvas<br>
        <span style="font-size: 13px;">Bespoke luxury weddings, palace destinations, and cinematic experiences.</span></p>
        <p style="font-size: 12px;">Inquiry ID: ${inquiry._id}</p>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'komalpriyadarshi36@gmail.com',
    cc: process.env.EMAIL_USER,
    subject: `🕊️ New Wedding Inquiry from ${name}`,
    html,
    replyTo: email
  };

  return transporter.sendMail(mailOptions);
};

// Send confirmation email to client
const sendInquiryConfirmation = async (inquiry) => {
  const { name, email, weddingDate } = inquiry;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Georgia', serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        h2 { color: #8B4513; border-bottom: 2px solid #D4A574; padding-bottom: 10px; }
        .content { line-height: 1.8; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #D4A574; color: #666; font-size: 14px; }
        .highlight { color: #8B4513; font-weight: bold; }
      </style>
    </head>
    <body>
      <h2>✨ Thank You, ${name}!</h2>
      
      <div class="content">
        <p>Your inquiry has been received with warmth and excitement. We are honored that you are considering <span class="highlight">The Wedding Canvas</span> for your celebration.</p>
        
        <p>Komal Priyadarshi and our team will personally review your vision and reach out to you within <strong>24 hours</strong>.</p>
        
        ${weddingDate ? `<p>📅 We've noted your preferred wedding date: <strong>${new Date(weddingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</strong></p>` : ''}
        
        <div style="background: #faf6f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0;"><strong>📌 What to expect next:</strong></p>
          <ol style="margin: 10px 0 0 20px; padding-left: 0;">
            <li style="margin-bottom: 5px;">✨ A personalized call with Komal within 24 hours</li>
            <li style="margin-bottom: 5px;">📋 Discussion of your vision, preferences, and budget</li>
            <li>🗓️ A curated proposal tailored just for you</li>
          </ol>
        </div>
        
        <p>Until then, feel free to reach us at <a href="mailto:komalpriyadarshi36@gmail.com">komalpriyadarshi36@gmail.com</a> or call <strong>+91 92963 27465</strong>.</p>
        
        <p style="margin-top: 30px;">With love and anticipation,<br>
        <strong style="color: #8B4513; font-size: 18px;">The Wedding Canvas Team</strong></p>
      </div>
      
      <div class="footer">
        <p>💫 The Wedding Canvas · India · Worldwide<br>
        <span style="font-size: 12px;">Turning dreams into timeless celebrations.</span></p>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `✨ Thank You, ${name}! We've Received Your Inquiry`,
    html,
    bcc: process.env.EMAIL_USER
  };

  return transporter.sendMail(mailOptions);
};

// Send newsletter confirmation
const sendNewsletterConfirmation = async (email) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Georgia', serif; color: #333; max-width: 500px; margin: 0 auto; padding: 20px; }
        h2 { color: #8B4513; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #D4A574; color: #666; font-size: 13px; }
      </style>
    </head>
    <body>
      <h2>📬 Welcome to Our World of Weddings!</h2>
      <p>You've been subscribed to <strong>The Wedding Canvas</strong> newsletter.</p>
      <p>You'll receive exclusive wedding inspiration, behind-the-scenes stories, and first access to our curated experiences.</p>
      
      <p style="font-size: 14px; color: #666; margin-top: 20px;">
        <a href="http://localhost:5173/unsubscribe?email=${email}" style="color: #8B4513;">Unsubscribe</a> anytime.
      </p>
      
      <div class="footer">
        <p>💫 The Wedding Canvas · Turning dreams into timeless celebrations.</p>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: '📬 Welcome to The Wedding Canvas Newsletter!',
    html
  };

  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendInquiryEmail,
  sendInquiryConfirmation,
  sendNewsletterConfirmation
};