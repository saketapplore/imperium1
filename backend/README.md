# Imperium Backend API

A robust and scalable backend API built with Node.js, Express, and MongoDB.

## 🚀 Features

- **Authentication** - JWT-based authentication with bcrypt password hashing
- **User Management** - Complete CRUD operations for users
- **Role-Based Access Control** - Admin and user roles
- **Security** - Helmet, CORS, and input validation
- **Error Handling** - Centralized error handling with custom error responses
- **Environment Configuration** - Dotenv for environment variables
- **Database** - MongoDB with Mongoose ODM
- **Code Organization** - Clean architecture with separation of concerns

## 📁 Project Structure

```
backend/
│
├── src/
│   ├── config/
│   │   ├── db.js              # Database connection
│   │   ├── env.js             # Environment variables
│   │
│   ├── controllers/
│   │   ├── auth.controller.js # Authentication controllers
│   │   ├── user.controller.js # User controllers
│   │
│   ├── routes/
│   │   ├── auth.routes.js     # Authentication routes
│   │   ├── user.routes.js     # User routes
│   │
│   ├── models/
│   │   ├── user.model.js      # User model
│   │
│   ├── services/
│   │   ├── auth.service.js    # Authentication business logic
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js # JWT authentication middleware
│   │   ├── error.middleware.js# Error handling middleware
│   │
│   ├── utils/
│   │   ├── jwt.js             # JWT utilities
│   │   ├── response.js        # Response formatting utilities
│   │
│   ├── app.js                 # Express app configuration
│   └── server.js              # Server entry point
│
├── .env                       # Environment variables (not in git)
├── .gitignore                 # Git ignore rules
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## 🛠️ Installation

1. **Clone the repository** (if applicable)
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `.env` file and update the values:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/imperium
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRE=7d
   CLIENT_URL=http://localhost:3000
   ```

4. **Start MongoDB** (if running locally)
   ```bash
   # On Windows (if MongoDB is installed as a service)
   net start MongoDB
   
   # Or use MongoDB Atlas (cloud) - update MONGODB_URI in .env
   ```

5. **Run the server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/me` | Get current user profile | Private |

### Users

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/users` | Get all users | Admin |
| GET | `/api/users/:id` | Get user by ID | Admin |
| PUT | `/api/users/:id` | Update user | Private (Own) / Admin |
| DELETE | `/api/users/:id` | Delete user | Admin |
| PATCH | `/api/users/:id/toggle-status` | Toggle user status | Admin |

## 📝 API Usage Examples

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Current User (Protected)
```bash
GET /api/auth/me
Authorization: Bearer <your_jwt_token>
```

### Get All Users (Admin Only)
```bash
GET /api/users
Authorization: Bearer <admin_jwt_token>
```

## 🔐 Authentication

This API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 🛡️ Security Features

- **Helmet** - Secure HTTP headers
- **CORS** - Cross-Origin Resource Sharing
- **bcryptjs** - Password hashing
- **JWT** - Secure token-based authentication
- **Input Validation** - Mongoose schema validation
- **Role-Based Access Control** - Admin and user roles

## 🧪 Testing

Use tools like Postman, Insomnia, or Thunder Client to test the API endpoints.

Health check endpoint:
```bash
GET http://localhost:5000/health
```

## 📦 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **dotenv** - Environment variables
- **cors** - CORS middleware
- **helmet** - Security headers
- **morgan** - HTTP request logger

## 🚧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment mode | development |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/imperium |
| JWT_SECRET | JWT secret key | (required) |
| JWT_EXPIRE | JWT expiration time | 7d |
| CLIENT_URL | Frontend URL for CORS | http://localhost:3000 |

## 📄 License

ISC

## 👨‍💻 Author

Imperium Development Team
