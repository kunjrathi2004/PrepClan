# 🚀 URGENT: Setup MongoDB in 2 Minutes

## Your server is running BUT MongoDB is not connected!

### ⚠️ Current Status:
- ✅ Server running on port 5000
- ❌ MongoDB NOT connected
- ❌ Registration will NOT work
- ❌ Login will NOT work

---

## 🎯 Fix It Now (2 Minutes)

### Option 1: Quick Setup (Recommended)

**Step 1:** Open this link in browser
```
https://www.mongodb.com/cloud/atlas/register
```

**Step 2:** Sign up with Google (fastest) or email

**Step 3:** After login, click "Build a Database"
- Choose: **FREE** (M0 Sandbox)
- Provider: AWS
- Region: Choose closest to you
- Click: **Create**
- Wait: 1-2 minutes

**Step 4:** Create Database User
- You'll see "Security Quickstart"
- Username: `prepclan`
- Password: `PrepClan2026` (or generate and SAVE it)
- Click: **Create User**

**Step 5:** Setup Network Access
- Click: **Add My Current IP Address**
- Then click: **Add Entry** for 0.0.0.0/0
- Click: **Finish and Close**

**Step 6:** Get Connection String
- Click: **Connect**
- Choose: **Drivers**
- Copy the connection string (looks like):
```
mongodb+srv://prepclan:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**Step 7:** Update .env File
1. Open: `d:\PrepClan\.env`
2. Find line: `MONGODB_URI=...`
3. Replace with YOUR string
4. Replace `<password>` with `PrepClan2026`
5. Add `/prepclan` before the `?`

**Example:**
```env
MONGODB_URI=mongodb+srv://prepclan:PrepClan2026@cluster0.abc123.mongodb.net/prepclan?retryWrites=true&w=majority
```

**Step 8:** Restart Server
- Press `Ctrl+C` in terminal
- Run: `npm start`
- Should show: ✅ MongoDB Connected!

---

## 🎥 Visual Guide

```
1. MongoDB Atlas Homepage
   ↓
2. Sign Up (Google/Email)
   ↓
3. Create FREE Cluster (M0)
   ↓ (wait 1-2 min)
4. Create User (prepclan/PrepClan2026)
   ↓
5. Whitelist IP (0.0.0.0/0)
   ↓
6. Get Connection String
   ↓
7. Update .env file
   ↓
8. Restart server
   ↓
9. ✅ WORKING!
```

---

## 📝 Your Connection String Format

```
mongodb+srv://USERNAME:PASSWORD@CLUSTER_URL/DATABASE_NAME?retryWrites=true&w=majority
```

**Fill in:**
- USERNAME: `prepclan`
- PASSWORD: `PrepClan2026`
- CLUSTER_URL: (from MongoDB Atlas - will be like `cluster0.abc123.mongodb.net`)
- DATABASE_NAME: `prepclan`

---

## ✅ How to Know It Worked

After restarting server, you should see:
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
🚀 Server running on port 5000
```

Then:
1. Go to: http://localhost:5000/login.html
2. Register a user
3. Should work! ✅

---

## 🆘 Still Stuck?

### Can't create account?
- Use Google sign-up (fastest)
- Or use any email

### Cluster taking too long?
- Wait 2-3 minutes
- Refresh the page

### Connection string not working?
- Make sure you replaced `<password>`
- Make sure you added `/prepclan` before `?`
- Check for typos

### Need more help?
- Read: `MONGODB_ATLAS_SETUP.md` (detailed guide)
- Read: `TROUBLESHOOTING.md` (common issues)

---

## 💡 Why This is Needed

Your `.env` file has:
```
MONGODB_URI=mongodb+srv://prepclan_user:PrepClan2026@cluster0.mongodb.net/prepclan?...
```

This is a **placeholder** - it doesn't exist!

You need YOUR OWN MongoDB database from MongoDB Atlas (it's FREE forever).

---

**Do this now, it only takes 2 minutes! 🚀**

After setup:
- ✅ Registration works
- ✅ Login works
- ✅ Data saves to database
- ✅ MongoDB Compass shows data
