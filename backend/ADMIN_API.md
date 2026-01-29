# Admin API Documentation

## Admin Authentication

### Admin Login

**Endpoint:** `POST /api/admin/login`  
**Access:** Public  
**Description:** Login as admin with hardcoded credentials

#### Admin Credentials
- **Email:** `saket.kakkar@applore.in`
- **Password:** `saket123`

#### Request Body
```json
{
  "email": "saket.kakkar@applore.in",
  "password": "saket123"
}
```

#### Success Response (200 OK)
```json
{
  "success": true,
  "message": "Admin login successful",
  "data": {
    "admin": {
      "id": "admin-001",
      "name": "Admin",
      "email": "saket.kakkar@applore.in",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Error Response (401 Unauthorized)
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

#### Error Response (400 Bad Request)
```json
{
  "success": false,
  "message": "Please provide email and password"
}
```

---

### Get Admin Profile

**Endpoint:** `GET /api/admin/profile`  
**Access:** Private (Admin only)  
**Description:** Get the current admin profile

#### Headers
```
Authorization: Bearer <admin_jwt_token>
```

#### Success Response (200 OK)
```json
{
  "success": true,
  "message": "Admin profile retrieved successfully",
  "data": {
    "admin": {
      "id": "admin-001",
      "name": "Admin",
      "email": "saket.kakkar@applore.in",
      "role": "admin"
    }
  }
}
```

#### Error Response (403 Forbidden)
```json
{
  "success": false,
  "message": "Access denied. Admin only."
}
```

---

## Testing the Admin Login

### Using cURL

**Login:**
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "saket.kakkar@applore.in",
    "password": "saket123"
  }'
```

**Get Profile (after login):**
```bash
curl -X GET http://localhost:5000/api/admin/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman/Thunder Client

1. **Login Request:**
   - Method: POST
   - URL: `http://localhost:5000/api/admin/login`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
     ```json
     {
       "email": "saket.kakkar@applore.in",
       "password": "saket123"
     }
     ```

2. **Get Profile Request:**
   - Method: GET
   - URL: `http://localhost:5000/api/admin/profile`
   - Headers: `Authorization: Bearer <token_from_login_response>`

---

## Security Notes

⚠️ **Important:** The admin credentials are currently hardcoded in the controller file for development purposes. In a production environment, consider:

1. Storing admin credentials in environment variables
2. Hashing the password
3. Using a database to store admin users
4. Implementing additional security measures like rate limiting and 2FA

---

## JWT Token Usage

After successful login, the API returns a JWT token. Use this token in the `Authorization` header for all protected routes:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

The token contains:
- Admin ID
- Email
- Role (admin)
- Expiration time (7 days by default)
