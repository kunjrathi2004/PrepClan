## ⚡ IMMEDIATE SETUP - Get Running in 3 Minutes

### Step 1: Create FREE MongoDB Atlas Account (2 minutes)

1. **Go to**: https://account.mongodb.com/account/register
2. **Sign up** with your email or Google account
3. **Choose**: FREE M0 tier (512MB)
4. **Click**: "Create" (wait 1-2 minutes for cluster creation)

### Step 2: Setup Database Access (30 seconds)

1. Click **"Database Access"** in left menu
2. Click **"Add New Database User"**
3. Username: `prepclan`
4. Password: `PrepClan2026` (or generate one)
5. Click **"Add User"**

### Step 3: Setup Network Access (30 seconds)

1. Click **"Network Access"** in left menu
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

### Step 4: Get Connection String (30 seconds)

1. Go to **"Database"** (Clusters)
2. Click **"Connect"** button
3. Choose **"Connect your application"**
4. **Copy** the connection string
5. It looks like: `mongodb+srv://prepclan:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

### Step 5: Update .env File

Open `.env` file and replace the MONGODB_URI line with your connection string:

```env
MONGODB_URI=mongodb+srv://prepclan:PrepClan2026@cluster0.xxxxx.mongodb.net/prepclan?retryWrites=true&w=majority
```

**Important**: 
- Replace `<password>` with your actual password
- Add `/prepclan` before the `?` (database name)

### Step 6: Start Server

```bash
npm start
```

You should see:
```
✅ MongoDB Connected: cluster0-xxxxx.mongodb.net
🚀 Server running on port 5000
```

### Step 7: Test Registration

1. Open browser: http://localhost:5000/login.html
2. Click "Sign up"
3. Fill in the form
4. Click "Create Account"

---

## 🔧 Troubleshooting

**Error: "querySrv ENOTFOUND"**
- Your MongoDB connection string is incorrect
- Make sure you replaced `<password>` with actual password
- Check if you added `/prepclan` database name

**Error: "Authentication failed"**
- Wrong username or password in connection string
- Go back to MongoDB Atlas → Database Access → Check credentials

**Error: "IP not whitelisted"**
- Go to Network Access → Add 0.0.0.0/0

---

## 📝 Your Connection String Format

```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE?retryWrites=true&w=majority
```

Example:
```
mongodb+srv://prepclan:PrepClan2026@cluster0.abc123.mongodb.net/prepclan?retryWrites=true&w=majority
```

---

## ✅ Once Connected

- Registration will work ✓
- Login will work ✓
- Dashboard will work ✓
- User data will be saved ✓

**Google OAuth**: Can be set up later (optional for now)
