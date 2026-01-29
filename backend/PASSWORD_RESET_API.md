# Admin Password Reset API Documentation

## 📧 Password Reset Flow

The admin password reset feature allows admins to reset their password via email when they forget it.

### Flow Overview:
1. **Request Reset** → Admin enters email → System sends reset link via email
2. **Click Link** → Admin clicks link in email → Opens reset password page
3. **Reset Password** → Admin enters new password → Password is updated

---

## 🔗 API Endpoints

### 1. Request Password Reset

**Endpoint:** `POST /api/admin/forgot-password`  
**Access:** Public  
**Description:** Send password reset email to admin

#### Request Body
```json
{
  "email": "saket.kakkar@applore.in"
}
```

#### Success Response (200 OK)
```json
{
  "success": true,
  "message": "Password reset email sent successfully. Please check your inbox."
}
```

#### Error Response (400 Bad Request)
```json
{
  "success": false,
  "message": "Please provide an email address"
}
```

---

### 2. Reset Password

**Endpoint:** `POST /api/admin/reset-password/:resetToken`  
**Access:** Public  
**Description:** Reset password using the token from email

#### URL Parameters
- `resetToken` - The token received in the email

#### Request Body
```json
{
  "password": "newSecurePassword123"
}
```

#### Success Response (200 OK)
```json
{
  "success": true,
  "message": "Password reset successful. You can now login.",
  "data": {
    "admin": {
      "id": "65f1a2b3c4d5e6f7g8h9i0j1",
      "name": "Admin",
      "email": "saket.kakkar@applore.in",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Error Responses

**Invalid/Expired Token (400 Bad Request)**
```json
{
  "success": false,
  "message": "Invalid or expired reset token. Please request a new password reset."
}
```

**Missing Password (400 Bad Request)**
```json
{
  "success": false,
  "message": "Please provide a new password"
}
```

**Password Too Short (400 Bad Request)**
```json
{
  "success": false,
  "message": "Password must be at least 6 characters long"
}
```

---

## 📧 Email Template

When an admin requests a password reset, they receive an email with:

- **Subject:** Password Reset Request - Imperium Admin
- **Content:**
  - Reset button/link
  - Direct reset URL
  - Expiration notice (10 minutes)
  - Security warnings
  - Password guidelines

**Reset Link Format:**
```
http://localhost:3000/admin/reset-password/{RESET_TOKEN}
```

---

## 🧪 Testing the API

### Test 1: Request Password Reset

**Using PowerShell:**
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/admin/forgot-password" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"email":"saket.kakkar@applore.in"}'
```

**Using cURL:**
```bash
curl -X POST http://localhost:5000/api/admin/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"saket.kakkar@applore.in"}'
```

**Using Postman:**
1. Method: POST
2. URL: `http://localhost:5000/api/admin/forgot-password`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
   ```json
   {
     "email": "saket.kakkar@applore.in"
   }
   ```

---

### Test 2: Reset Password (After receiving email)

**Using PowerShell:**
```powershell
$token = "YOUR_RESET_TOKEN_FROM_EMAIL"
Invoke-RestMethod -Uri "http://localhost:5000/api/admin/reset-password/$token" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"password":"newPassword123"}'
```

**Using cURL:**
```bash
curl -X POST http://localhost:5000/api/admin/reset-password/YOUR_RESET_TOKEN \
  -H "Content-Type: application/json" \
  -d '{"password":"newPassword123"}'
```

**Using Postman:**
1. Method: POST
2. URL: `http://localhost:5000/api/admin/reset-password/YOUR_RESET_TOKEN`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
   ```json
   {
     "password": "newPassword123"
   }
   ```

---

## ⚙️ Configuration

### Email Settings (.env)

```env
# AWS SES SMTP Configuration
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=AKIA3FLDYDZSQPBH3MMN
SMTP_PASS=BJUp3GI2NVwFrwWBemsVQGKn3sEI8LhxZ8Y07D1a5Mes
SMTP_FROM=no-reply@imperium.com
```

**Important:**
- The email `no-reply@imperium.com` must be verified in AWS SES
- If using SES Sandbox, both sender and recipient emails must be verified
- For production, move out of SES Sandbox to send to any email

### Frontend URL (.env)

```env
CLIENT_URL=http://localhost:3000
```

This is used to generate the password reset link in the email.

---

## 🔐 Security Features

1. **Token Expiration:** Reset tokens expire after 10 minutes
2. **One-Time Use:** Tokens are deleted after successful password reset
3. **Hashed Tokens:** Tokens are hashed before storing in database
4. **Email Verification:** Only sends reset email if admin exists
5. **No Information Leakage:** Doesn't reveal if email exists or not
6. **Secure Passwords:** Passwords are hashed with bcrypt before saving

---

## 📋 Complete Admin API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/admin/login` | Admin login | No |
| POST | `/api/admin/forgot-password` | Request password reset | No |
| POST | `/api/admin/reset-password/:token` | Reset password with token | No |
| GET | `/api/admin/profile` | Get admin profile | Yes (Admin) |

---

## 🚀 Full Workflow Example

### Step 1: Admin Forgets Password
Admin goes to login page and clicks "Forgot Password"

### Step 2: Request Reset Email
Frontend sends request:
```javascript
fetch('http://localhost:5000/api/admin/forgot-password', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'saket.kakkar@applore.in' })
})
```

### Step 3: Check Email
Admin receives email with reset link like:
```
http://localhost:3000/admin/reset-password/a1b2c3d4e5f6...
```

### Step 4: Click Link
Admin clicks the link and is redirected to reset password page

### Step 5: Submit New Password
Frontend extracts token from URL and sends:
```javascript
const token = 'a1b2c3d4e5f6...'; // from URL
fetch(`http://localhost:5000/api/admin/reset-password/${token}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ password: 'newSecurePassword123' })
})
```

### Step 6: Success
Admin is logged in automatically with the new token returned in response

---

## 🐛 Troubleshooting

### Email Not Sending?

1. **Check AWS SES verification:**
   - Sender email must be verified in AWS SES
   - If in sandbox, recipient must also be verified

2. **Check SMTP credentials:**
   - Verify `SMTP_USER` and `SMTP_PASS` are correct
   - Check region in `SMTP_HOST` matches your SES region

3. **Check console logs:**
   - Look for email sending errors in server console
   - Check AWS SES console for bounce/complaint notifications

### Token Invalid/Expired?

1. **Token expired:** Tokens expire after 10 minutes
2. **Token already used:** Tokens are deleted after use
3. **Token format wrong:** Make sure the full token is copied from email

### Password Not Updating?

1. **Password too short:** Must be at least 6 characters
2. **Invalid token:** Request a new password reset

---

## 📝 Notes

1. **First-Time Setup:** If admin doesn't exist in database, system will create the admin account when requesting password reset
2. **Hybrid System:** Works with both database-stored admins and hardcoded credentials
3. **Email Service:** Uses AWS SES SMTP for reliable email delivery
4. **Token Security:** Tokens are cryptographically hashed and time-limited

---

## ✅ Testing Checklist

- [ ] Request password reset with valid email
- [ ] Check email received
- [ ] Click reset link in email
- [ ] Submit new password
- [ ] Login with new password
- [ ] Test with expired token (wait 10+ minutes)
- [ ] Test with invalid token
- [ ] Test with password too short
- [ ] Test with non-existent email
