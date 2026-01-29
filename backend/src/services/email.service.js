const nodemailer = require('nodemailer');

/**
 * Email Service using Nodemailer
 */

// Create transporter
const createTransporter = () => {
  // For development: use Gmail or any SMTP service
  // For production: use a service like SendGrid, Mailgun, AWS SES

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // Your email
      pass: process.env.SMTP_PASS, // Your email password or app password
    },
  });
};

/**
 * Send email
 * @param {Object} options - Email options
 * @param {String} options.to - Recipient email
 * @param {String} options.subject - Email subject
 * @param {String} options.text - Plain text content
 * @param {String} options.html - HTML content
 */
const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    throw new Error('Failed to send email');
  }
};

/**
 * Send password reset email
 * @param {String} email - Recipient email
 * @param {String} resetToken - Password reset token
 * @param {String} resetUrl - Reset URL
 */
const sendPasswordResetEmail = async (email, resetToken, resetUrl) => {
  const subject = 'Password Reset Request - Imperium Admin';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
        .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔐 Password Reset Request</h1>
        </div>
        <div class="content">
          <p>Hello Admin,</p>
          <p>You requested to reset your password for your Imperium Admin account.</p>
          <p>Click the button below to reset your password:</p>
          <p style="text-align: center;">
            <a href="${resetUrl}" class="button">Reset Password</a>
          </p>
          <p>Or copy and paste this link in your browser:</p>
          <p style="word-break: break-all; background: white; padding: 10px; border-radius: 5px;">
            ${resetUrl}
          </p>
          <div class="warning">
            <strong>⚠️ Important:</strong>
            <ul>
              <li>This link will expire in <strong>10 minutes</strong></li>
              <li>If you didn't request this, please ignore this email</li>
              <li>Your password won't change until you create a new one</li>
            </ul>
          </div>
          <p>For security reasons, we recommend using a strong password that includes:</p>
          <ul>
            <li>At least 8 characters</li>
            <li>A mix of uppercase and lowercase letters</li>
            <li>Numbers and special characters</li>
          </ul>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Imperium. All rights reserved.</p>
          <p>This is an automated email. Please do not reply.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
    Password Reset Request
    
    Hello Admin,
    
    You requested to reset your password for your Imperium Admin account.
    
    Please click on the following link to reset your password:
    ${resetUrl}
    
    This link will expire in 10 minutes.
    
    If you didn't request this, please ignore this email.
    
    © ${new Date().getFullYear()} Imperium
  `;

  await sendEmail({
    to: email,
    subject,
    text,
    html,
  });
};

/**
 * Send enquiry notification email to admin(s)
 * @param {Array|String} recipients - Recipient email(s)
 * @param {Object} enquiry - Enquiry data
 */
const sendEnquiryNotificationEmail = async (recipients, enquiry) => {
  const subject = `New Enquiry Received: ${enquiry.serviceSelected} - ${enquiry.name}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1a202c; margin: 0; padding: 0; }
        .wrapper { background-color: #f7fafc; padding: 40px 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 24px; overflow: hidden; shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .header { background: #1a202c; color: #ffffff; padding: 40px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.025em; }
        .content { padding: 40px; }
        .section-title { font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #a0aec0; margin-bottom: 24px; border-bottom: 1px solid #edf2f7; padding-bottom: 8px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 32px; }
        .info-item { margin-bottom: 20px; }
        .info-label { display: block; font-size: 11px; font-weight: 700; color: #718096; text-transform: uppercase; margin-bottom: 4px; }
        .info-value { display: block; font-size: 15px; font-weight: 600; color: #2d3748; }
        .message-box { background: #f8fafc; border-radius: 16px; padding: 24px; border: 1px solid #edf2f7; margin-bottom: 32px; }
        .footer { text-align: center; padding: 30px; font-size: 12px; color: #718096; background: #f9fafb; }
        .btn { display: inline-block; padding: 12px 24px; background: #3182ce; color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: 700; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          <div class="header">
            <h1>🚀 New Lead Captured</h1>
          </div>
          <div class="content">
            <div class="section-title">Client Information</div>
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">Name</span>
                <span class="info-value">${enquiry.name}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Email</span>
                <span class="info-value">${enquiry.email}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Company</span>
                <span class="info-value">${enquiry.company || 'Not Provided'}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Phone</span>
                <span class="info-value">${enquiry.phoneNumber || 'Not Provided'}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Country</span>
                <span class="info-value">${enquiry.country || 'Not Provided'}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Service</span>
                <span class="info-value">${enquiry.serviceSelected}</span>
              </div>
            </div>

            <div class="section-title">Project Requirements</div>
            <div class="message-box">
              ${enquiry.projectRequirements || 'No specific requirements mentioned.'}
            </div>

            <div class="section-title">Message</div>
            <p style="color: #4a5568;">${enquiry.message || 'No additional message.'}</p>
            
            <div style="text-align: center;">
              <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/enquiries" class="btn">View in Admin Panel</a>
            </div>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Imperium Admin. All rights reserved.</p>
            <p>This is an automated notification. Manage your alerts in the <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/contact-settings">Settings</a>.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
    New Enquiry Received
    
    Client: ${enquiry.name} (${enquiry.email})
    Company: ${enquiry.company || 'N/A'}
    Service: ${enquiry.serviceSelected}
    
    Project Requirements:
    ${enquiry.projectRequirements || 'N/A'}
    
    Message:
    ${enquiry.message || 'N/A'}
    
    View it here: ${process.env.CLIENT_URL || 'http://localhost:5173'}/enquiries
  `;

  await sendEmail({
    to: recipients,
    subject,
    text,
    html,
  });
};

module.exports = {
  sendEmail,
  sendPasswordResetEmail,
  sendEnquiryNotificationEmail,
};
