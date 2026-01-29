const app = require('./app');
const connectDB = require('./config/db');
const { port, nodeEnv } = require('./config/env');

// Connect to database
connectDB();

// Start server
const server = app.listen(port, () => {
  console.log(`
╔═══════════════════════════════════════╗
║   🚀 Imperium Server Starting...     ║
╚═══════════════════════════════════════╝
  
  📡 Server running in ${nodeEnv} mode
  🌐 Port: ${port}
  🔗 URL: http://localhost:${port}
  💚 Health: http://localhost:${port}/health
  
╔═══════════════════════════════════════╗
║   Available Endpoints:               ║
╠═══════════════════════════════════════╣
║   🔐 Admin Authentication:           ║
║   POST   /api/admin/login            ║
║   POST   /api/admin/forgot-password  ║
║   POST   /api/admin/reset-password/:token    ║
║                                      ║
║   📝 Admin Content Management:       ║
║   GET/PUT   /api/admin/content/home-hero    ║
║   CRUD      /api/admin/content/core-offerings    ║
║   GET/PUT   /api/admin/content/about-us    ║
║   CRUD      /api/admin/content/leadership    ║
║   CRUD      /api/admin/content/services    ║
║                                      ║
║   🌐 Public Content (No Auth):       ║
║   GET    /api/content/home           ║
║   GET    /api/content/about          ║
║   GET    /api/content/services       ║
║   GET    /api/content/all            ║
╚═══════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  console.error(err.stack);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error(`❌ Uncaught Exception: ${err.message}`);
  console.error(err.stack);
  process.exit(1);
});
