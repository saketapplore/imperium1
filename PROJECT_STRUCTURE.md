# Imperium Project Structure

This document provides an overview of the complete Imperium project structure.

## Project Overview

The Imperium project consists of three main parts:
1. **Backend** - Node.js/Express API server (shared by both frontends)
2. **Admin Frontend** - React admin panel for content management
3. **Website Frontend** - Public-facing website

## Directory Structure

```
imperium/
├── backend/                    # Shared backend API
│   ├── src/
│   │   ├── models/            # MongoDB models
│   │   ├── controllers/       # API controllers
│   │   ├── routes/            # API routes
│   │   └── middleware/        # Auth & other middleware
│   ├── .env                   # Backend environment variables
│   └── package.json
│
├── admin-frontend/            # Admin panel
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── routes/           # Route configuration
│   │   ├── context/          # React contexts (Auth, Theme)
│   │   ├── hooks/            # Custom hooks
│   │   ├── services/         # API services
│   │   └── utils/            # Utility functions
│   ├── .env                  # Admin frontend env vars
│   └── package.json
│
└── website-frontend/          # Public website
    ├── src/
    │   ├── components/        # Reusable components
    │   │   ├── Header.jsx
    │   │   ├── HeroSection.jsx
    │   │   └── AboutSection.jsx
    │   ├── pages/            # Page components
    │   │   └── Home.jsx
    │   ├── routes/           # Route configuration
    │   │   └── AppRoutes.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── public/
    │   └── images/           # Static images
    ├── .env                  # Website frontend env vars
    └── package.json
```

## Running the Project

### Backend (Port 5000)
```bash
cd backend
npm run dev
```

### Admin Frontend (Port 5174)
```bash
cd admin-frontend
npm run dev
```

### Website Frontend (Port 5173)
```bash
cd website-frontend
npm run dev
```

## Technology Stack

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Nodemailer for emails

### Admin Frontend
- React 19
- Vite
- Tailwind CSS 4
- React Router
- Axios
- Lucide React (icons)

### Website Frontend
- React 19
- Vite
- Tailwind CSS 4
- React Router
- Axios
- Lucide React (icons)

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/imperium
JWT_SECRET=your_jwt_secret
SMTP_USER=your_email
SMTP_PASS=your_password
SMTP_FROM=your_email
```

### Admin Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

### Website Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## Key Features

### Admin Frontend
- User authentication (login/register)
- Protected routes
- Dashboard
- Content management for:
  - Home page content
  - About page content
  - Services
  - Leadership profiles
- Dark/Light theme toggle
- Responsive design

### Website Frontend
- Homepage with:
  - Fixed header navigation
  - Hero section with CTA
  - About section
  - Responsive design
- Dark theme with gold/bronze accents
- Smooth animations
- SEO optimized

## Design System

### Colors
- **Primary (Gold/Bronze)**: `#D4A574`
- **Dark Background**: `#1A1A2E`
- **Light Section**: `#FFF5F5`

### Typography
- Font Family: Inter (Google Fonts)
- Headings: Bold, various sizes
- Body: Regular weight

### Components
- Buttons: Primary (filled) and Secondary (outlined)
- Cards with hover effects
- Smooth transitions and animations

## API Endpoints

The backend provides RESTful APIs for:
- Authentication (`/api/auth/*`)
- Home content (`/api/home/*`)
- About content (`/api/about/*`)
- Services (`/api/services/*`)
- Form submissions (`/api/contact/*`)

Both frontends connect to the same backend API.
