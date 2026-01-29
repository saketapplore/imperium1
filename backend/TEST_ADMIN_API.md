# Testing Admin Login API

## 🎯 Admin Login Endpoint

**URL:** `POST http://localhost:5000/api/admin/login`

**Credentials:**
- **Email:** `saket.kakkar@applore.in`
- **Password:** `saket123`

---

## 📝 Test Methods

### Method 1: Using cURL (Command Line)

```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"saket.kakkar@applore.in\",\"password\":\"saket123\"}"
```

**Windows PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/admin/login" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"email":"saket.kakkar@applore.in","password":"saket123"}'
```

---

### Method 2: Using Postman / Thunder Client / Insomnia

1. **Create a new request**
   - Method: `POST`
   - URL: `http://localhost:5000/api/admin/login`

2. **Set Headers**
   - Key: `Content-Type`
   - Value: `application/json`

3. **Set Body (raw JSON)**
   ```json
   {
     "email": "saket.kakkar@applore.in",
     "password": "saket123"
   }
   ```

4. **Click Send**

---

### Method 3: Using Browser (Fetch API)

Open browser console (F12) and run:

```javascript
fetch('http://localhost:5000/api/admin/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'saket.kakkar@applore.in',
    password: 'saket123'
  })
})
.then(response => response.json())
.then(data => console.log('Success:', data))
.catch(error => console.error('Error:', error));
```

---

## ✅ Expected Success Response

**Status Code:** `200 OK`

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
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluLTAwMSIsImVtYWlsIjoic2FrZXQua2Fra2FyQGFwcGxvcmUuaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Mzc5NjcyMzQsImV4cCI6MTczODU3MjAzNH0.XXXXXXXXXXXXX"
  }
}
```

**Copy the `token` value** - you'll need it for protected routes!

---

## ❌ Error Responses

### Wrong Email or Password
**Status Code:** `401 Unauthorized`

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

### Missing Fields
**Status Code:** `400 Bad Request`

```json
{
  "success": false,
  "message": "Please provide email and password"
}
```

---

## 🔐 Testing Protected Admin Profile Endpoint

After successful login, use the token to access protected routes:

**URL:** `GET http://localhost:5000/api/admin/profile`

### Using cURL:
```bash
curl -X GET http://localhost:5000/api/admin/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman:
1. Method: `GET`
2. URL: `http://localhost:5000/api/admin/profile`
3. Headers:
   - Key: `Authorization`
   - Value: `Bearer YOUR_TOKEN_HERE` (replace with actual token)

---

## 🧪 Quick Test Script

Save this as `test-admin.js` in the backend folder:

```javascript
const testAdminLogin = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'saket.kakkar@applore.in',
        password: 'saket123'
      })
    });

    const data = await response.json();
    
    if (data.success) {
      console.log('✅ Login successful!');
      console.log('Admin:', data.data.admin);
      console.log('Token:', data.data.token);
      return data.data.token;
    } else {
      console.log('❌ Login failed:', data.message);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

testAdminLogin();
```

Run with: `node test-admin.js`

---

## 📋 All Available Admin Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/admin/login` | Admin login | No |
| GET | `/api/admin/profile` | Get admin profile | Yes (Admin) |

---

## 💡 Important Notes

1. **No Database Required:** Admin login works with hardcoded credentials, so it doesn't need MongoDB
2. **Token Expiry:** JWT tokens expire after 7 days (default)
3. **Token Format:** Always use `Bearer TOKEN` in Authorization header
4. **CORS:** Make sure your client URL is whitelisted in `.env` (`CLIENT_URL`)

---

## 🐛 Troubleshooting

**Server not starting?**
- Check if port 5000 is available
- Make sure you're in the `backend` folder
- Run `npm run dev`

**Cannot connect?**
- Check if server is running: `http://localhost:5000/health`
- Verify the port number in `.env`

**CORS error?**
- Add your frontend URL to `CLIENT_URL` in `.env`
- Or temporarily allow all origins in `app.js`
