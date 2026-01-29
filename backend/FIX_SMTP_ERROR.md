# 🔧 Fix SMTP Authentication Error

## ❌ Current Error:
```
Error sending email: Invalid login: 535 Authentication Credentials Invalid
```

## 🔍 Root Cause:
The credentials in your `.env` file appear to be **AWS IAM Access Keys**, not **AWS SES SMTP credentials**. These are different!

- ❌ IAM Access Key: `AKIA3FLDYDZSQPBH3MMN` (starts with AKIA)
- ✅ SMTP Username: Should start with different prefix

---

## ✅ Solution: Generate Proper SMTP Credentials

### Option 1: Generate AWS SES SMTP Credentials (Recommended)

1. **Go to AWS SES Console:**
   - https://console.aws.amazon.com/ses/

2. **Navigate to SMTP Settings:**
   - Left sidebar → Click **"SMTP settings"**

3. **Create SMTP Credentials:**
   - Click **"Create SMTP credentials"** button
   - Enter IAM User Name (e.g., `imperium-smtp-user`)
   - Click **"Create"**

4. **Download Credentials:**
   - You'll see:
     - **SMTP Username** (different from IAM access key)
     - **SMTP Password** (different from IAM secret key)
   - **⚠️ IMPORTANT:** Download and save these immediately!

5. **Update `.env` file:**
   ```env
   SMTP_HOST=email-smtp.us-east-1.amazonaws.com
   SMTP_PORT=587
   SMTP_USER=YOUR_NEW_SMTP_USERNAME_HERE
   SMTP_PASS=YOUR_NEW_SMTP_PASSWORD_HERE
   SMTP_FROM=no-reply@imperium.com
   ```

6. **Restart server:**
   ```bash
   npm run dev
   ```

---

### Option 2: Use Gmail for Quick Testing (Temporary)

If you want to test quickly without AWS SES setup:

1. **Create Gmail App Password:**
   - Go to Google Account → Security
   - Enable 2-Step Verification
   - Generate App Password for "Mail"

2. **Update `.env`:**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your.email@gmail.com
   SMTP_PASS=your-16-char-app-password
   SMTP_FROM=your.email@gmail.com
   ```

3. **Restart server**

---

### Option 3: Temporarily Disable Email (Test Other Features)

If you want to test other API features without email:

I can create a mock email service that logs to console instead of sending real emails.

---

## 🎯 Quick Fix Recommendation

**For production use AWS SES:**
1. Generate proper SMTP credentials (Option 1)
2. Verify sender email in SES
3. Update `.env` with new credentials

**For quick testing use Gmail:**
1. Much faster to set up
2. Good for development
3. Switch to AWS SES later

---

## 📝 What credentials do you want to use?

1. **AWS SES** - I'll guide you through getting SMTP credentials
2. **Gmail** - Quick setup for testing
3. **Mock/Disable** - Skip email for now, test other features

Let me know and I'll help you configure it! 🚀
