# Imperium Website Frontend

This is the public-facing website for Imperium, built with React and Vite.

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Styling
- **React Router** - Routing
- **Lucide React** - Icons
- **Axios** - HTTP client

## Project Structure

```
website-frontend/
├── public/
│   └── images/          # Static images
├── src/
│   ├── components/      # Reusable components
│   ├── pages/          # Page components
│   ├── routes/         # Route configuration
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── .env                # Environment variables
└── package.json        # Dependencies
```

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

The website will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Environment Variables

Create a `.env` file in the root directory:

```
VITE_API_URL=http://localhost:5000/api
```

## Backend Connection

This frontend connects to the same backend as the admin frontend. Make sure the backend server is running on `http://localhost:5000`.

## Features

- Responsive design
- Modern UI with Tailwind CSS
- Smooth animations
- SEO optimized
- Fast performance with Vite
