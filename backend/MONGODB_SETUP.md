# MongoDB Atlas Setup Guide

## ❌ Current Error
```
Error connecting to MongoDB: bad auth : Authentication failed.
```

This error occurs when:
1. The password is incorrect
2. Your IP address is not whitelisted
3. The database user doesn't have proper permissions

---

## ✅ How to Fix MongoDB Atlas Connection

### Step 1: Update Database User Password

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Select your project (if you have multiple)
3. Click **"Database Access"** in the left sidebar
4. Find the user: `saketkakkar_db_user`
5. Click **"Edit"** button
6. Click **"Edit Password"**
7. Choose either:
   - **Autogenerate Secure Password** (recommended) - Copy and save this!
   - **Or enter your own password** (at least 8 characters)
8. Click **"Update User"**
9. **IMPORTANT: Copy and save this password!**

### Step 2: Whitelist Your IP Address

1. In MongoDB Atlas, click **"Network Access"** in the left sidebar
2. Click **"Add IP Address"** button
3. You have two options:

   **Option A: Add Current IP (More Secure)**
   - Click **"Add Current IP Address"**
   - It will auto-detect your IP
   - Click **"Confirm"**

   **Option B: Allow From Anywhere (For Testing)**
   - Click **"Allow Access From Anywhere"**
   - This adds `0.0.0.0/0`
   - Click **"Confirm"**
   - ⚠️ **Note:** This is less secure, only use for development

4. Wait a few minutes for the changes to take effect

### Step 3: Update Your .env File

1. Open `backend/.env` file
2. Find the line that starts with `MONGODB_URI=`
3. Replace `YOUR_ACTUAL_PASSWORD` with your actual password from Step 1

**Example:**
```
# If your password is: MySecurePass123
MONGODB_URI=mongodb+srv://saketkakkar_db_user:MySecurePass123@cluster0.a3dsdw4.mongodb.net/imperium?retryWrites=true&w=majority&appName=Cluster0
```

**IMPORTANT NOTES:**
- ⚠️ No spaces around the password
- ⚠️ If your password contains special characters (@, :, /, etc.), you need to URL encode them:
  - `@` becomes `%40`
  - `:` becomes `%3A`
  - `/` becomes `%2F`
  - `#` becomes `%23`
  - For example: `Pass@123` becomes `Pass%40123`

### Step 4: Restart Your Server

After updating the `.env` file, nodemon should automatically restart. If not:

1. Press `Ctrl + C` in the terminal to stop the server
2. Run `npm run dev` again

---

## 🔍 Troubleshooting

### Still Getting Authentication Error?

1. **Double-check the password**
   - Make sure you copied it correctly
   - No extra spaces
   - Check for special characters that need URL encoding

2. **Verify the username**
   - Should be: `saketkakkar_db_user`
   - Check in MongoDB Atlas → Database Access

3. **Wait for IP whitelist propagation**
   - Changes can take 1-2 minutes
   - Try again after waiting

4. **Check user permissions**
   - In Database Access, make sure the user has:
     - Database User Privileges: "Read and write to any database"
     - Or at least read/write access to the `imperium` database

### Connection String Format
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER_URL/DATABASE_NAME?options
```

Your connection string breakdown:
- **Username:** `saketkakkar_db_user`
- **Password:** `YOUR_ACTUAL_PASSWORD` ← Replace this!
- **Cluster:** `cluster0.a3dsdw4.mongodb.net`
- **Database:** `imperium`
- **Options:** `retryWrites=true&w=majority&appName=Cluster0`

---

## 📝 Quick Checklist

- [ ] Updated database user password in MongoDB Atlas
- [ ] Copied the new password
- [ ] Added IP address to Network Access (0.0.0.0/0 or current IP)
- [ ] Updated `.env` file with the correct password
- [ ] URL encoded special characters in password (if any)
- [ ] Saved the `.env` file
- [ ] Restarted the server (nodemon should auto-restart)

---

## ✅ Success!

When the connection is successful, you'll see:
```
✅ MongoDB Connected: cluster0-shard-00-00.a3dsdw4.mongodb.net
```

And the server will start without crashing!

---

## 🆘 Need More Help?

If you're still having issues:
1. Share the exact error message
2. Confirm you completed all steps in the checklist
3. Check if you can connect using MongoDB Compass with the same credentials
