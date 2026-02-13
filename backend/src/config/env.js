const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

module.exports = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/imperium',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key',
  jwtExpire: process.env.JWT_EXPIRE || '7d',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
  smtpHost: process.env.SMTP_HOST,
  smtpPort: process.env.SMTP_PORT,
  smtpUser: process.env.SMTP_USER,
  smtpPass: process.env.SMTP_PASS,
  smtpFrom: process.env.SMTP_FROM,
};
