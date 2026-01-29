# Imperium CMS API Documentation

## 🎯 Overview

This is a headless CMS API for the Imperium website. The system provides:
- **Admin APIs** - Protected endpoints for content management (requires admin login)
- **Public APIs** - Open endpoints for website to fetch content (no authentication)

---

## 🔐 Authentication

### Admin Login Required
All admin content management endpoints require authentication with JWT token.

**Login to get token:**
```bash
POST /api/admin/login
Body: {
  "email": "saket.kakkar@applore.in",
  "password": "saket123"
}
```

**Use token in headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 📋 Content Sections

### 1. Home Hero
- Single record (headline, subtext, CTAs)
- GET and PUT only (no create/delete)

### 2. Core Offerings
- Multiple records (service cards on home page)
- Full CRUD operations
- Show/hide and ordering support

### 3. About Us
- Single record (company overview, philosophy)
- GET and PUT only

### 4. Leadership
- Multiple records (leadership profiles)
- Full CRUD operations
- Show/hide and ordering support

### 5. Services
- Multiple records (detailed service pages)
- Full CRUD operations
- Show/hide and ordering support

---

## 🌐 PUBLIC API ENDPOINTS (No Authentication)

### Get Home Page Content
```
GET /api/content/home
```
**Response:**
```json
{
  "success": true,
  "message": "Home content retrieved successfully",
  "data": {
    "hero": {
      "headline": "Welcome to Imperium",
      "subtext": "Your trusted partner",
      "primaryCTA": { "text": "Get Started", "link": "#contact" },
      "secondaryCTA": { "text": "Learn More", "link": "#about" }
    },
    "offerings": [
      {
        "_id": "...",
        "title": "Service 1",
        "description": "Description here",
        "icon": "icon-url",
        "displayOrder": 1
      }
    ]
  }
}
```

### Get About Page Content
```
GET /api/content/about
```
**Response:**
```json
{
  "success": true,
  "data": {
    "about": {
      "companyOverview": "Company overview text",
      "philosophyStatement": "Philosophy text"
    },
    "leadership": [
      {
        "_id": "...",
        "name": "John Doe",
        "designation": "CEO",
        "bio": "Bio text",
        "photo": "photo-url",
        "displayOrder": 1
      }
    ]
  }
}
```

### Get Services
```
GET /api/content/services
```

### Get Single Service
```
GET /api/content/services/:id
```

### Get All Content (One Request)
```
GET /api/content/all
```
Returns all website content in a single response (useful for initial page load).

---

## 🔐 ADMIN API ENDPOINTS (Authentication Required)

### Home Hero Management

#### Get Home Hero
```
GET /api/admin/content/home-hero
Authorization: Bearer TOKEN
```

#### Update Home Hero
```
PUT /api/admin/content/home-hero
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "headline": "New Headline",
  "subtext": "New subtext",
  "primaryCTA": {
    "text": "Click Here",
    "link": "/contact"
  },
  "secondaryCTA": {
    "text": "Learn More",
    "link": "/about"
  },
  "backgroundImage": "image-url",
  "isActive": true
}
```

---

### Core Offerings Management

#### Get All Core Offerings
```
GET /api/admin/content/core-offerings
Authorization: Bearer TOKEN
```

#### Get Single Core Offering
```
GET /api/admin/content/core-offerings/:id
Authorization: Bearer TOKEN
```

#### Create Core Offering
```
POST /api/admin/content/core-offerings
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "title": "Service Title",
  "description": "Service description",
  "icon": "icon-url",
  "displayOrder": 1,
  "isVisible": true
}
```

#### Update Core Offering
```
PUT /api/admin/content/core-offerings/:id
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description"
}
```

#### Delete Core Offering
```
DELETE /api/admin/content/core-offerings/:id
Authorization: Bearer TOKEN
```

#### Toggle Visibility
```
PATCH /api/admin/content/core-offerings/:id/toggle-visibility
Authorization: Bearer TOKEN
```

---

### About Us Management

#### Get About Us
```
GET /api/admin/content/about-us
Authorization: Bearer TOKEN
```

#### Update About Us
```
PUT /api/admin/content/about-us
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "companyOverview": "Updated overview",
  "philosophyStatement": "Updated philosophy",
  "missionStatement": "Our mission",
  "visionStatement": "Our vision"
}
```

---

### Leadership Management

#### Get All Leadership
```
GET /api/admin/content/leadership
Authorization: Bearer TOKEN
```

#### Create Leadership Profile
```
POST /api/admin/content/leadership
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "name": "John Doe",
  "designation": "CEO",
  "bio": "Short biography",
  "photo": "photo-url",
  "displayOrder": 1,
  "isVisible": true,
  "socialLinks": {
    "linkedin": "linkedin-url",
    "twitter": "twitter-url",
    "email": "email@example.com"
  }
}
```

#### Update Leadership Profile
```
PUT /api/admin/content/leadership/:id
Authorization: Bearer TOKEN
```

#### Delete Leadership Profile
```
DELETE /api/admin/content/leadership/:id
Authorization: Bearer TOKEN
```

#### Toggle Visibility
```
PATCH /api/admin/content/leadership/:id/toggle-visibility
Authorization: Bearer TOKEN
```

---

### Services Management

#### Get All Services
```
GET /api/admin/content/services
Authorization: Bearer TOKEN
```

#### Create Service
```
POST /api/admin/content/services
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "title": "Service Title",
  "shortSummary": "Brief description",
  "detailedDescription": "Full description",
  "icon": "icon-url",
  "image": "image-url",
  "displayOrder": 1,
  "isVisible": true,
  "features": ["Feature 1", "Feature 2", "Feature 3"]
}
```

#### Update Service
```
PUT /api/admin/content/services/:id
Authorization: Bearer TOKEN
```

#### Delete Service
```
DELETE /api/admin/content/services/:id
Authorization: Bearer TOKEN
```

#### Toggle Visibility
```
PATCH /api/admin/content/services/:id/toggle-visibility
Authorization: Bearer TOKEN
```

---

## 📊 Data Models

### HomeHero
```json
{
  "headline": "String (required)",
  "subtext": "String (required)",
  "primaryCTA": {
    "text": "String (default: Get Started)",
    "link": "String (default: #)"
  },
  "secondaryCTA": {
    "text": "String (default: Learn More)",
    "link": "String (default: #)"
  },
  "backgroundImage": "String (optional)",
  "isActive": "Boolean (default: true)"
}
```

### CoreOffering
```json
{
  "title": "String (required)",
  "description": "String (required)",
  "icon": "String (optional)",
  "displayOrder": "Number (default: 0)",
  "isVisible": "Boolean (default: true)"
}
```

### AboutUs
```json
{
  "companyOverview": "String (required)",
  "philosophyStatement": "String (required)",
  "missionStatement": "String (optional)",
  "visionStatement": "String (optional)"
}
```

### Leadership
```json
{
  "name": "String (required)",
  "designation": "String (required)",
  "bio": "String (required)",
  "photo": "String (optional)",
  "displayOrder": "Number (default: 0)",
  "isVisible": "Boolean (default: true)",
  "socialLinks": {
    "linkedin": "String (optional)",
    "twitter": "String (optional)",
    "email": "String (optional)"
  }
}
```

### Service
```json
{
  "title": "String (required)",
  "shortSummary": "String (required)",
  "detailedDescription": "String (required)",
  "icon": "String (optional)",
  "image": "String (optional)",
  "displayOrder": "Number (default: 0)",
  "isVisible": "Boolean (default: true)",
  "features": "Array of Strings (optional)"
}
```

---

## 🧪 Testing Examples

### 1. Admin Login
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"saket.kakkar@applore.in","password":"saket123"}'
```

### 2. Get Public Home Content
```bash
curl http://localhost:5000/api/content/home
```

### 3. Update Home Hero (Admin)
```bash
curl -X PUT http://localhost:5000/api/admin/content/home-hero \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"headline":"New Headline","subtext":"New subtext"}'
```

### 4. Create Core Offering
```bash
curl -X POST http://localhost:5000/api/admin/content/core-offerings \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Web Development","description":"Custom web solutions","displayOrder":1}'
```

---

## 🔄 Typical Workflow

### For Admin:
1. Login → Get JWT token
2. Create/Update content using admin endpoints
3. Content is saved to MongoDB
4. Public API automatically serves updated content

### For Website:
1. Call public endpoints (no auth needed)
2. Get all content with `/api/content/all`
3. Render on website
4. Content updates in real-time from admin changes

---

## ✅ Features

- ✅ No user registration needed (public website)
- ✅ Admin-only content management
- ✅ Public APIs for website content
- ✅ Show/hide functionality for all items
- ✅ Display ordering support
- ✅ Full CRUD operations
- ✅ JWT authentication
- ✅ MongoDB storage
- ✅ RESTful API design

---

## 📝 Notes

- All admin endpoints require JWT token
- Public endpoints are open (no auth)
- Items can be hidden without deletion (isVisible flag)
- Display order controls rendering sequence
- Single-record sections (Hero, About) auto-create with defaults
