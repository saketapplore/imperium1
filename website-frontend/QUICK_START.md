# Website Frontend - Quick Start Guide

## ✅ Setup Complete!

Your website frontend has been successfully created and configured.

## 🚀 Running the Development Server

To start the development server:

```bash
cd website-frontend
npm run dev
```

The website will be available at: **http://localhost:5173**

## 🔧 Recent Fixes Applied

1. ✅ **PostCSS Configuration** - Updated to use `@tailwindcss/postcss` for Tailwind CSS 4
2. ✅ **ES Module Syntax** - Changed from CommonJS to ES module exports
3. ✅ **Invalid CSS Utility** - Removed `border-border` utility class that doesn't exist

## 📁 Project Structure

```
website-frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navigation header
│   │   ├── HeroSection.jsx     # Hero section
│   │   └── AboutSection.jsx    # About section
│   ├── pages/
│   │   └── Home.jsx            # Home page
│   ├── routes/
│   │   └── AppRoutes.jsx       # Routes
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css               # Global styles
├── public/
│   └── images/
│       └── about-team.jpg      # Team image
└── Configuration files
```

## 🎨 Homepage Sections

### Header
- Fixed navigation with logo
- Menu: Home, Services, About us
- Contact us button
- Mobile responsive menu

### Hero Section
- Dark background with stripes
- Main heading: "Tailored Solutions for Global Growth"
- Subheading with business description
- Two CTA buttons
- Feature tags

### About Section
- Light background (#FFF5F5)
- Two-column layout
- "We don't just move goods. We move markets."
- Team collaboration image
- Learn more link

## 🔗 Backend Connection

The website connects to the same backend as the admin panel:
- Backend URL: `http://localhost:5000/api`
- Configured in `.env` file

## 🎨 Design System

**Colors:**
- Primary (Gold): `#D4A574`
- Dark: `#1A1A2E`
- Light: `#FFF5F5`

**Typography:**
- Font: Inter (Google Fonts)
- Headings: Bold, responsive sizes
- Body: Regular weight

## 📝 CSS Linter Notes

You may see warnings about `@tailwind`, `@apply`, etc. These are **safe to ignore** - they're valid Tailwind CSS directives that work correctly at runtime.

## ✨ Next Steps

1. Open `http://localhost:5173` in your browser
2. Add more sections (Services, Contact, Footer)
3. Connect to backend CMS APIs
4. Add more pages as needed

Enjoy building! 🎉
