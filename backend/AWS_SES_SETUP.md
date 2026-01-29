# AWS SES Email Setup Guide

## ⚠️ Important: Email Verification Required

Before the password reset feature can send emails, you need to verify your email address in AWS SES.

---

## 🚀 Quick Setup Steps

### Step 1: Login to AWS Console

1. Go to [AWS Console](https://console.aws.amazon.com/)
2. Search for **"SES"** (Simple Email Service)
3. Make sure you're in the correct region (us-east-1)

---

### Step 2: Verify Email Address

#### Option A: Verify Sender Email (Required)

1. In SES Console, click **"Verified identities"** in the left sidebar
2. Click **"Create identity"**
3. Select **"Email address"**
4. Enter: `no-reply@imperium.com` (or your domain email)
5. Click **"Create identity"**
6. **Check your email** for verification link
7. Click the verification link

#### Option B: Verify Test Recipient (If in Sandbox)

If your SES is in **Sandbox mode**, you also need to verify recipient emails:

1. Click **"Verified identities"**
2. Click **"Create identity"**
3. Select **"Email address"**
4. Enter: `saket.kakkar@applore.in`
5. Click **"Create identity"**
6. **Check email** and verify

---

### Step 3: Check SES Sandbox Status

1. In SES Console, click **"Account dashboard"**
2. Look for **"Sending statistics"**
3. Check if you're in **"Sandbox"** mode

**Sandbox Limitations:**
- Can only send to verified email addresses
- Limited to 200 emails per day
- 1 email per second

**To Move Out of Sandbox:**
1. Click **"Request production access"**
2. Fill out the form explaining your use case
3. Wait for AWS approval (usually 24 hours)

---

### Step 4: Verify SMTP Credentials

Your current credentials from `.env`:
```
SMTP_USER=AKIA3FLDYDZSQPBH3MMN
SMTP_PASS=BJUp3GI2NVwFrwWBemsVQGKn3sEI8LhxZ8Y07D1a5Mes
```

To verify these are correct:

1. In SES Console, click **"SMTP settings"** in left sidebar
2. Check the **SMTP endpoint** (should match your region)
3. If you need new credentials:
   - Click **"Create SMTP credentials"**
   - Follow the wizard
   - **Download and save** the credentials
   - Update `.env` file with new credentials

---

## 🔧 Update .env File

Make sure your `.env` has the correct configuration:

```env
# Email Configuration (AWS SES SMTP)
SMTP_HOST=email-smtp.us-east-1.amazonaws.com  # Change region if needed
SMTP_PORT=587
SMTP_USER=AKIA3FLDYDZSQPBH3MMN
SMTP_PASS=BJUp3GI2NVwFrwWBemsVQGKn3sEI8LhxZ8Y07D1a5Mes
SMTP_FROM=no-reply@imperium.com  # Must be verified in SES

# Frontend URL for password reset link
CLIENT_URL=http://localhost:3000
```

### If Using Different Region:

**us-east-1:** `email-smtp.us-east-1.amazonaws.com`  
**us-west-2:** `email-smtp.us-west-2.amazonaws.com`  
**eu-west-1:** `email-smtp.eu-west-1.amazonaws.com`  
[Full list of regions](https://docs.aws.amazon.com/ses/latest/dg/smtp-connect.html)

---

## 🧪 Test Email Sending

After verification, test the password reset:

```powershell
# Test forgot password endpoint
Invoke-RestMethod -Uri "http://localhost:5000/api/admin/forgot-password" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"email":"saket.kakkar@applore.in"}'
```

**Success Response:**
```json
{
  "success": true,
  "message": "Password reset email sent successfully. Please check your inbox."
}
```

**Check your email:**
- Look in inbox for email from `no-reply@imperium.com`
- Check spam/junk folder if not in inbox
- Email subject: "Password Reset Request - Imperium Admin"

---

## 🐛 Common Issues

### Issue 1: "Email address is not verified"

**Solution:**
1. Go to SES Console → Verified identities
2. Verify `no-reply@imperium.com`
3. Check email and click verification link
4. Wait a few minutes and try again

---

### Issue 2: "MessageRejected: Email address is not verified"

**Solution:** (If in Sandbox)
1. Verify the recipient email: `saket.kakkar@applore.in`
2. Or request production access to send to any email

---

### Issue 3: "Invalid SMTP credentials"

**Solution:**
1. Create new SMTP credentials in SES Console
2. Update `.env` with new credentials
3. Restart the server

---

### Issue 4: "Connection timeout"

**Solution:**
1. Check if SMTP_HOST region matches your SES region
2. Verify firewall isn't blocking port 587
3. Try using port 465 with `secure: true`

---

### Issue 5: Email in Spam Folder

**Solution:**
1. Add SPF and DKIM records to your domain
2. Use a verified domain instead of email address
3. Request production access

---

## 📧 Alternative: Use Gmail for Testing

If AWS SES setup is complex, you can temporarily use Gmail:

### 1. Enable 2-Step Verification on Gmail
1. Go to Google Account settings
2. Security → 2-Step Verification
3. Turn it on

### 2. Create App Password
1. Go to Google Account → Security
2. Click "App passwords"
3. Select "Mail" and "Other"
4. Name it "Imperium Backend"
5. Copy the 16-character password

### 3. Update .env
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your.email@gmail.com
SMTP_PASS=your-16-char-app-password
SMTP_FROM=your.email@gmail.com
```

---

## ✅ Verification Checklist

- [ ] AWS SES account created
- [ ] Sender email `no-reply@imperium.com` verified
- [ ] Recipient email verified (if in sandbox)
- [ ] SMTP credentials confirmed correct
- [ ] SMTP_HOST region matches SES region
- [ ] `.env` file updated
- [ ] Server restarted
- [ ] Test email sent successfully
- [ ] Email received in inbox
- [ ] Password reset link works

---

## 📞 Need Help?

1. **AWS SES Documentation:** https://docs.aws.amazon.com/ses/
2. **SMTP Settings:** https://docs.aws.amazon.com/ses/latest/dg/smtp-credentials.html
3. **Sandbox Limits:** https://docs.aws.amazon.com/ses/latest/dg/request-production-access.html

---

## 🎯 Production Recommendations

1. **Verify Domain** instead of individual email addresses
2. **Request Production Access** to remove sandbox limitations
3. **Set up SPF, DKIM, DMARC** records
4. **Monitor bounce and complaint rates**
5. **Use SNS** for bounce/complaint notifications
6. **Implement rate limiting** on password reset requests
7. **Add CAPTCHA** to prevent abuse

---

## 📝 Quick Reference

**Test Password Reset Flow:**
```bash
# 1. Request reset
POST /api/admin/forgot-password
Body: { "email": "saket.kakkar@applore.in" }

# 2. Check email and copy token from link

# 3. Reset password
POST /api/admin/reset-password/{TOKEN}
Body: { "password": "newPassword123" }

# 4. Login with new password
POST /api/admin/login
Body: { "email": "saket.kakkar@applore.in", "password": "newPassword123" }
```

---

**Current Configuration:**
- ✅ Admin Login API - Working
- ✅ Password Reset API - Created
- ⚠️ Email Sending - **Needs AWS SES verification**
- ✅ MongoDB - Connected
- ✅ JWT Authentication - Working
