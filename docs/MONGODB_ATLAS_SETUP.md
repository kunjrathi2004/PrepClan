# 🎯 MongoDB Atlas Setup - Step by Step (2 Minutes)

## Why You Need This
Your `.env` file has a placeholder MongoDB connection. You need YOUR OWN MongoDB database.

---

## 🚀 Quick Setup (Follow Exactly)

### Step 1: Create Account (30 seconds)
1. Open: https://www.mongodb.com/cloud/atlas/register
2. Click **"Sign up with Google"** (fastest)
3. Or use email/password

### Step 2: Create FREE Cluster (1 minute)
1. After login, you'll see "Deploy a cloud database"
2. Click **"Create"** under FREE tier (M0)
3. Choose:
   - Provider: **AWS** (or any)
   - Region: **Closest to you**
4. Cluster Name: Leave as "Cluster0"
5. Click **"Create Cluster"** (wait 1-2 minutes)

### Step 3: Create Database User (20 seconds)
1. You'll see "Security Quickstart"
2. Or go to: **Security → Database Access**
3. Click **"Add New Database User"**
4. Choose **"Password"** authentication
5. Username: `prepclan`
6. Password: `PrepClan2026` (or click "Autogenerate Secure Password" and SAVE IT)
7. Database User Privileges: **"Atlas admin"**
8. Click **"Add User"**

### Step 4: Allow Network Access (20 seconds)
1. Go to: **Security → Network Access**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"**
4. IP: `0.0.0.0/0` (should auto-fill)
5. Click **"Confirm"**

### Step 5: Get Connection String (30 seconds)
1. Go to: **Database** (left sidebar)
2. Click **"Connect"** button on your Cluster0
3. Choose **"Drivers"**
4. Select: **Node.js** and version **5.5 or later**
5. Copy the connection string (looks like):
   ```
   mongodb+srv://prepclan:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 6: Update Your .env File
1. Open `d:\PrepClan\.env` file
2. Find the line: `MONGODB_URI=...`
3. Replace with YOUR connection string
4. **IMPORTANT**: 
   - Replace `<password>` with your actual password (`PrepClan2026`)
   - Add `/prepclan` before the `?`

**Example:**
```env
MONGODB_URI=mongodb+srv://prepclan:PrepClan2026@cluster0.abc123.mongodb.net/prepclan?retryWrites=true&w=majority
```

**Your actual string will have different characters after `cluster0.`**

---

## ✅ Verify It Works

Run this command:
```bash
node test-mongodb.js
```

You should see:
```
✅ MongoDB Connected Successfully!
📊 Database: prepclan
```

---

## 🔍 What Your Connection String Should Look Like

```
mongodb+srv://USERNAME:PASSWORD@CLUSTER_URL/DATABASE_NAME?retryWrites=true&w=majority
```

**Example with YOUR values:**
```
mongodb+srv://prepclan:PrepClan2026@cluster0.abc123.mongodb.net/prepclan?retryWrites=true&w=majority
                ↑         ↑              ↑                              ↑
            username   password    your cluster URL              database name
```

---

## 🐛 Troubleshooting

### Error: "ENOTFOUND"
- Your cluster URL is wrong
- Copy the EXACT string from MongoDB Atlas
- Make sure you're copying from "Drivers" section

### Error: "Authentication failed"
- Wrong password
- Check if you replaced `<password>` with actual password
- Password is case-sensitive

### Error: "IP not whitelisted"
- Go to Network Access
- Make sure 0.0.0.0/0 is added

### Can't find "Connect" button
- Wait 2-3 minutes for cluster to finish creating
- Refresh the page

---

## 📱 MongoDB Compass Setup (Optional)

Once your `.env` is working:

1. Open MongoDB Compass
2. Click **"New Connection"**
3. Paste your connection string (same as in .env)
4. Click **"Connect"**
5. You'll see `prepclan` database after first user registers

---

## 🎯 After Setup

1. Update `.env` with your connection string
2. Run: `node test-mongodb.js` (should show success)
3. Run: `npm start` (server should start)
4. Open: http://localhost:5000/login.html
5. Register a user
6. Check MongoDB Compass - you'll see the user!

---

## ⏱️ Time Required
- Total: **2-3 minutes**
- Most time is waiting for cluster creation

---

## 💡 Pro Tip

Save your connection string somewhere safe! You'll need it if you:
- Deploy to production
- Work on different computer
- Share project with team

---

**Once you complete this, everything will work! 🎉**
