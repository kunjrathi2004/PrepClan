# MongoDB Connection Still Failing - Complete Troubleshooting

## Current Situation
MongoDB connection is timing out after 10 seconds, which means Railway cannot reach MongoDB Atlas.

## CRITICAL: Check Railway Logs NOW

**This is the most important step!**

1. Railway Dashboard → Your Service
2. Click **"View Logs"** or Deployments → Latest deployment → Logs
3. Look for these lines:

**If you see:**
```
❌ MongoDB Connection Error: ...
```
**Share the complete error message!**

**If you see:**
```
✅ MongoDB Connected: cluster0.62700bc.mongodb.net
```
**Then connection works, but something else is wrong**

## Most Likely Issues

### Issue 1: MongoDB Atlas Cluster is Paused

Free tier clusters pause after 60 days of inactivity.

**Fix:**
1. Go to https://cloud.mongodb.com
2. Login
3. Look at your cluster
4. If it says "Paused", click **"Resume"**
5. Wait 2-3 minutes for cluster to start
6. Restart Railway service

### Issue 2: Wrong MONGODB_URI in Railway

**Check Railway Variables:**

Your MONGODB_URI should look EXACTLY like this:
```
mongodb+srv://USERNAME:PASSWORD@cluster0.62700bc.mongodb.net/prepclan?retryWrites=true&w=majority
```

**Common mistakes:**
- ❌ `mongodb://` instead of `mongodb+srv://`
- ❌ Missing `/prepclan` database name
- ❌ Wrong cluster URL
- ❌ Special characters in password not encoded

**Get fresh connection string:**
1. MongoDB Atlas → Database → Connect
2. "Connect your application"
3. Copy connection string
4. Replace `<password>` with your actual password
5. Add `/prepclan` before the `?`
6. Update in Railway

### Issue 3: Database User Doesn't Exist or Wrong Password

**Fix:**
1. MongoDB Atlas → Database Access
2. Check if your user exists
3. If not, create new user:
   - Username: `railway_prod`
   - Password: Click "Autogenerate Secure Password" (copy it!)
   - Role: "Read and write to any database"
4. Update MONGODB_URI in Railway with new credentials

### Issue 4: IP Whitelist Issue (Even Though You Added 0.0.0.0/0)

Sometimes the whitelist doesn't apply correctly.

**Fix:**
1. MongoDB Atlas → Network Access
2. **Delete** the existing 0.0.0.0/0 entry
3. Click "Add IP Address"
4. Click "Allow Access from Anywhere"
5. Confirm (adds 0.0.0.0/0 again)
6. Wait 2 minutes
7. Restart Railway service

### Issue 5: Wrong Cluster Region or Cluster Deleted

**Check:**
1. MongoDB Atlas → Database
2. Verify your cluster exists
3. Check cluster name matches your URI
4. Verify cluster is in "Running" state

## Step-by-Step Debugging

### Step 1: Verify MongoDB Atlas Cluster Status

1. Go to https://cloud.mongodb.com
2. Login
3. Check cluster status:
   - ✅ Running (green)
   - ❌ Paused (yellow) - Click Resume
   - ❌ Deleted - Need to create new cluster

### Step 2: Get Correct Connection String

1. Click your cluster → "Connect"
2. "Connect your application"
3. Driver: Node.js, Version: 5.5+
4. Copy the string shown

**Example:**
```
mongodb+srv://username:<password>@cluster0.62700bc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

**Modify it:**
```
mongodb+srv://username:ACTUAL_PASSWORD@cluster0.62700bc.mongodb.net/prepclan?retryWrites=true&w=majority&appName=Cluster0
```

### Step 3: URL-Encode Password

If password has special characters:

| Character | Encoded |
|-----------|---------|
| @ | %40 |
| ! | %21 |
| # | %23 |
| $ | %24 |
| % | %25 |
| ^ | %5E |
| & | %26 |
| * | %2A |

**Example:**
- Password: `Pass@123!`
- Encoded: `Pass%40123%21`

### Step 4: Update Railway MONGODB_URI

1. Railway → Your Service → Variables
2. Find MONGODB_URI
3. Click to edit
4. Paste the corrected connection string
5. Press Enter or click Update
6. Railway will redeploy automatically

### Step 5: Check Railway Logs After Redeploy

Wait 2 minutes, then check logs for:
```
✅ MongoDB Connected: cluster0.62700bc.mongodb.net
📊 Database: prepclan
```

## Test Locally First

Before deploying to Railway, test locally:

1. Update your local `.env` file with the same MONGODB_URI
2. Run the test script:
```bash
cd D:\PrepClan
node test-mongodb-connection.js
```

**If it works locally but not on Railway:**
- Railway environment variable is different
- Copy the exact working URI to Railway

**If it fails locally too:**
- MongoDB Atlas configuration issue
- Fix MongoDB Atlas first

## Alternative: Create New MongoDB Cluster

If nothing works, create a fresh cluster:

### Step 1: Create New Cluster
1. MongoDB Atlas → Database → Create
2. Choose FREE M0 tier
3. Provider: AWS
4. Region: Choose closest to you
5. Cluster Name: `Cluster0` or any name
6. Click "Create"

### Step 2: Create Database User
1. Security → Database Access → Add New User
2. Username: `prepclan_user`
3. Password: Autogenerate (copy it!)
4. Role: "Read and write to any database"
5. Add User

### Step 3: Whitelist IPs
1. Security → Network Access → Add IP Address
2. "Allow Access from Anywhere" (0.0.0.0/0)
3. Confirm

### Step 4: Get Connection String
1. Database → Connect → Connect your application
2. Copy connection string
3. Replace `<password>` with actual password
4. Add `/prepclan` database name

### Step 5: Update Railway
1. Update MONGODB_URI in Railway with new connection string
2. Wait for redeploy

## What Railway Logs Should Show

**Success:**
```
✅ MongoDB Connected: cluster0-shard-00-00.62700bc.mongodb.net
📊 Database: prepclan
🚀 Server running on port 5000
```

**Failure (timeout):**
```
❌ MongoDB Connection Error: connect ETIMEDOUT
💡 Common Issues:
   1. Check MONGODB_URI is correct
   2. Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0
```

**Failure (auth):**
```
❌ MongoDB Connection Error: Authentication failed
💡 Common Issues:
   1. Wrong username or password
   2. Password not URL-encoded
```

## Emergency Solution: Use Different MongoDB Provider

If MongoDB Atlas keeps failing, try:

### Option 1: MongoDB Atlas Different Region
Create cluster in different region (e.g., US East instead of US West)

### Option 2: Railway MongoDB Plugin
1. Railway → Your Service → New → Database → MongoDB
2. Railway will provide MONGODB_URL
3. Use that instead of Atlas

## Checklist Before Asking for More Help

Please verify and share:

- [ ] Railway logs (copy/paste the MongoDB connection part)
- [ ] MongoDB Atlas cluster status (Running/Paused/Deleted?)
- [ ] Network Access shows 0.0.0.0/0 as Active
- [ ] Database user exists in Database Access
- [ ] MONGODB_URI format (hide password): `mongodb+srv://user:****@cluster0.62700bc.mongodb.net/prepclan?...`
- [ ] Test script result: `node test-mongodb-connection.js`

## Most Common Solution

**90% of the time, the issue is:**

1. **Cluster is paused** - Resume it
2. **Wrong password** - Reset and update
3. **IP whitelist not applied** - Delete and re-add 0.0.0.0/0

---

**NEXT STEP: Share your Railway logs - that will tell us exactly what's wrong!**
