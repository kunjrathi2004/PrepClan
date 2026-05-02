# ⚡ QUICK FIX - Do This Right Now

## 🎯 Your Issue
Server says: `❌ Error: querySrv ENOTFOUND _mongodb._tcp.cluster0.mongodb.net`

## 💡 What This Means
The MongoDB connection string in your `.env` file is fake. You need a REAL database.

## ✅ Solution (2 Minutes)

### 1. Create MongoDB Account
🔗 https://www.mongodb.com/cloud/atlas/register
- Click "Sign up with Google" (fastest)

### 2. Create FREE Database
- After login → "Build a Database"
- Choose **FREE** (M0)
- Click "Create"
- Wait 1-2 minutes ⏳

### 3. Create User
- Username: `prepclan`
- Password: `PrepClan2026`
- Click "Create User"

### 4. Allow Access
- Click "Add IP Address"
- Choose "Allow Access from Anywhere"
- IP: `0.0.0.0/0`
- Click "Confirm"

### 5. Get Connection String
- Click "Connect" button
- Choose "Drivers"
- Copy the string (looks like):
```
mongodb+srv://prepclan:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### 6. Update .env File
Open `d:\PrepClan\.env` and replace this line:
```env
MONGODB_URI=mongodb+srv://prepclan:PrepClan2026@cluster0.YOUR_CLUSTER_ID.mongodb.net/prepclan?retryWrites=true&w=majority
```

**IMPORTANT:**
- Replace `YOUR_CLUSTER_ID` with the actual ID from your connection string
- Replace `<password>` with `PrepClan2026`
- Add `/prepclan` before the `?`

### 7. Restart Server
```bash
# Press Ctrl+C to stop current server
# Then run:
npm start
```

### 8. Test It
```bash
# Should show:
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
🚀 Server running on port 5000
```

Then go to: http://localhost:5000/login.html and register!

---

## 📋 Checklist

- [ ] Created MongoDB Atlas account
- [ ] Created FREE cluster (waited for it to finish)
- [ ] Created database user (prepclan/PrepClan2026)
- [ ] Whitelisted IP (0.0.0.0/0)
- [ ] Copied connection string
- [ ] Updated .env file
- [ ] Replaced `<password>` with actual password
- [ ] Added `/prepclan` before `?`
- [ ] Restarted server (Ctrl+C then npm start)
- [ ] Server shows "MongoDB Connected"
- [ ] Tested registration at http://localhost:5000/login.html

---

## 🔍 Example Connection String

**What you copy from MongoDB:**
```
mongodb+srv://prepclan:<password>@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
```

**What you put in .env:**
```
mongodb+srv://prepclan:PrepClan2026@cluster0.abc123.mongodb.net/prepclan?retryWrites=true&w=majority
                                                                        ↑
                                                            Added database name
```

---

## ⏱️ Time Required
- **Total: 2-3 minutes**
- Most time is waiting for cluster creation

---

## 🆘 Quick Help

**Error: "Authentication failed"**
→ Wrong password in connection string

**Error: "IP not whitelisted"**
→ Add 0.0.0.0/0 in Network Access

**Error: Still ENOTFOUND**
→ Check cluster URL is correct

---

**Do this now! Server is waiting for MongoDB! 🚀**
