# 🔧 Complete Troubleshooting Guide

## Current Issue: MongoDB Compass Shows No Data

### Why This Happens
1. **MongoDB not configured** - You need YOUR OWN MongoDB Atlas database
2. **Server not running** - Backend server must be running on port 5000
3. **No users registered yet** - Database is empty until first registration

---

## ✅ Complete Fix (Step by Step)

### STEP 1: Setup MongoDB Atlas (REQUIRED)
**Follow: MONGODB_ATLAS_SETUP.md**

Quick version:
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create FREE account
3. Create cluster (wait 2 min)
4. Create database user: `prepclan` / `PrepClan2026`
5. Whitelist IP: `0.0.0.0/0`
6. Get connection string
7. Update `.env` file

**Test it works:**
```bash
node test-mongodb.js
```

Should show: `✅ MongoDB Connected Successfully!`

---

### STEP 2: Start Node.js Server (NOT Live Server)

**Stop Live Server if running!**

Then start Node.js server:
```bash
npm start
```

You should see:
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
🚀 Server running on port 5000
📱 Frontend: http://localhost:5000
```

---

### STEP 3: Access Website on Correct Port

**WRONG:** http://127.0.0.1:5500 (Live Server - no backend)
**RIGHT:** http://localhost:5000 (Node.js - with backend)

---

### STEP 4: Register a User

1. Go to: http://localhost:5000/login.html
2. Click "Sign up"
3. Fill in form:
   - Name: Test User
   - Email: test@example.com
   - DOB: 2000-01-01
   - Contact: +91-9876543210
   - Password: test123
   - Confirm: test123
4. Click "Create Account"

**If successful:**
- You'll be redirected to dashboard
- Browser console shows no errors
- Dashboard shows your name

---

### STEP 5: Check MongoDB Compass

1. Open MongoDB Compass
2. Connect using YOUR connection string (from .env)
3. You should see:
   - Database: `prepclan`
   - Collection: `users`
   - 1 document (your registered user)

---

## 🚨 Common Errors & Solutions

### Error 1: "Cannot connect to MongoDB"
**Cause:** MongoDB not configured or wrong connection string

**Solution:**
1. Check `.env` file has correct MONGODB_URI
2. Run `node test-mongodb.js` to verify
3. Follow MONGODB_ATLAS_SETUP.md

---

### Error 2: "Port 5000 already in use"
**Cause:** Another process using port 5000

**Solution:**
```bash
# Find process
netstat -ano | findstr :5000

# Kill it (replace PID)
taskkill /PID <PID> /F

# Or change port in .env
PORT=3000
```

---

### Error 3: "Network error" in browser
**Cause:** Backend server not running

**Solution:**
1. Make sure `npm start` is running
2. Check terminal for errors
3. Verify server shows "Server running on port 5000"

---

### Error 4: Registration doesn't work
**Cause:** Using Live Server instead of Node.js server

**Solution:**
1. Stop Live Server
2. Start Node.js: `npm start`
3. Use http://localhost:5000 (not 5500)

---

### Error 5: "querySrv ENOTFOUND"
**Cause:** Invalid MongoDB connection string

**Solution:**
1. Go to MongoDB Atlas
2. Click "Connect" → "Drivers"
3. Copy EXACT connection string
4. Replace `<password>` with your password
5. Add `/prepclan` before `?`

Example:
```
mongodb+srv://prepclan:PrepClan2026@cluster0.abc123.mongodb.net/prepclan?retryWrites=true&w=majority
```

---

### Error 6: MongoDB Compass won't connect
**Cause:** Wrong connection string or network access

**Solution:**
1. Use SAME connection string as in .env
2. Check MongoDB Atlas → Network Access
3. Verify 0.0.0.0/0 is whitelisted

---

## 📋 Verification Checklist

Run through this checklist:

- [ ] MongoDB Atlas account created
- [ ] Cluster created and running
- [ ] Database user created (prepclan/PrepClan2026)
- [ ] Network access configured (0.0.0.0/0)
- [ ] Connection string copied
- [ ] `.env` file updated with connection string
- [ ] `node test-mongodb.js` shows success
- [ ] Live Server stopped
- [ ] `npm start` running successfully
- [ ] Browser at http://localhost:5000 (not 5500)
- [ ] Can see login page
- [ ] Can register new user
- [ ] Redirected to dashboard after registration
- [ ] MongoDB Compass shows user data

---

## 🎯 Quick Test Commands

### Test MongoDB Connection
```bash
node test-mongodb.js
```

### Start Server
```bash
npm start
```

### Check What's Running
```bash
# Check port 5000
netstat -ano | findstr :5000

# Check port 5500
netstat -ano | findstr :5500
```

---

## 📞 Still Not Working?

### Check Server Logs
Look at terminal where `npm start` is running:
- Any error messages?
- Does it say "MongoDB Connected"?
- Does it say "Server running on port 5000"?

### Check Browser Console
Press F12 in browser:
- Any red errors?
- Check Network tab for failed requests
- Look for 404 or 500 errors

### Check .env File
```bash
# Print .env (hide password)
type .env
```

Make sure:
- MONGODB_URI is set
- No spaces around `=`
- Password doesn't have special characters (or URL encode them)

---

## 🎉 Success Indicators

### Server Terminal:
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
🚀 Server running on port 5000
```

### Browser:
- URL: http://localhost:5000
- Login page loads
- Can register
- Redirected to dashboard

### MongoDB Compass:
- Connected to cluster
- Database: prepclan
- Collection: users
- Documents visible

---

## 💡 Pro Tips

1. **Always use Node.js server** (npm start), not Live Server
2. **Always use port 5000**, not 5500
3. **Test MongoDB first** with `node test-mongodb.js`
4. **Check server logs** for errors
5. **Use browser console** to debug frontend issues

---

**Follow these steps in order and everything will work! 🚀**
