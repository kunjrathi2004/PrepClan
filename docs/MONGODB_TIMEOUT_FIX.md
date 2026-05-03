# URGENT: MongoDB Connection Timeout Fix

## Problem
```
Operation `users.findOne()` buffering timed out after 10000ms
```

This means Railway cannot connect to MongoDB Atlas.

## Root Causes
1. MongoDB Atlas IP whitelist doesn't include Railway IPs
2. Wrong MongoDB URI in Railway environment variables
3. MongoDB Atlas network access not configured

## IMMEDIATE FIX - Do This Now!

### Step 1: Whitelist All IPs in MongoDB Atlas

Railway uses dynamic IPs, so you must allow all IPs:

1. Go to: https://cloud.mongodb.com
2. Login to your account
3. Select your cluster (Cluster0)
4. Click **"Network Access"** in left sidebar
5. Click **"Add IP Address"** button
6. Click **"Allow Access from Anywhere"**
7. It will add: `0.0.0.0/0`
8. Click **"Confirm"**
9. Wait 1-2 minutes for changes to apply

### Step 2: Verify MongoDB URI in Railway

1. Go to Railway dashboard
2. Click your service
3. Go to "Variables" tab
4. Check `MONGODB_URI` value

**It should look like:**
```
mongodb+srv://USERNAME:PASSWORD@cluster0.62700bc.mongodb.net/prepclan?retryWrites=true&w=majority
```

**Common Issues:**
- ❌ Missing `mongodb+srv://` prefix
- ❌ Wrong username or password
- ❌ Special characters in password not URL-encoded
- ❌ Wrong cluster URL
- ❌ Missing database name

### Step 3: URL-Encode Password

If your MongoDB password has special characters, they must be URL-encoded:

**Special Character Encoding:**
```
@ → %40
! → %21
# → %23
$ → %24
% → %25
^ → %5E
& → %26
* → %2A
( → %28
) → %29
+ → %2B
= → %3D
```

**Example:**
- Password: `PrepClan@2026!`
- Encoded: `PrepClan%402026%21`
- Full URI: `mongodb+srv://prepclan:PrepClan%402026%21@cluster0.62700bc.mongodb.net/prepclan`

### Step 4: Test MongoDB Connection

After whitelisting IPs, Railway will automatically try to reconnect.

Check Railway logs:
1. Railway Dashboard → Your Service → View Logs
2. Look for: `"MongoDB connected successfully"` or `"✅ MongoDB Connected"`
3. If you see connection errors, check the URI format

## Detailed Steps for MongoDB Atlas

### A. Check Current Network Access

1. MongoDB Atlas → Network Access
2. You should see entry: `0.0.0.0/0` (Allow access from anywhere)
3. Status should be: **Active** (green)

### B. If 0.0.0.0/0 Already Exists But Not Working

1. Delete the existing entry
2. Add it again:
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere"
   - Confirm
3. Wait 2 minutes

### C. Check Database User

1. MongoDB Atlas → Database Access
2. Find your user (e.g., `prepclan` or `kunj1234`)
3. Make sure:
   - User has "Read and write to any database" role
   - Password is correct
   - User is not disabled

### D. Get Correct Connection String

1. MongoDB Atlas → Database → Connect
2. Click "Connect your application"
3. Driver: Node.js
4. Version: 5.5 or later
5. Copy the connection string
6. Replace `<password>` with your actual password (URL-encoded)
7. Replace `<database>` with `prepclan`

## Railway Environment Variable Format

Your `MONGODB_URI` in Railway should be:

```
mongodb+srv://USERNAME:URL_ENCODED_PASSWORD@cluster0.62700bc.mongodb.net/prepclan?retryWrites=true&w=majority&appName=Cluster0
```

**Example with your cluster:**
```
mongodb+srv://prepclan:PrepClan%402026%21@cluster0.62700bc.mongodb.net/prepclan?retryWrites=true&w=majority&appName=Cluster0
```

## Verification Checklist

- [ ] MongoDB Atlas Network Access has 0.0.0.0/0 (Active)
- [ ] Database user exists and has correct permissions
- [ ] Password is URL-encoded in connection string
- [ ] MONGODB_URI in Railway is correct
- [ ] Railway deployment completed
- [ ] Railway logs show "MongoDB connected successfully"

## Test Connection

### Method 1: Check Railway Logs
1. Railway Dashboard → Your Service → Deployments
2. Click latest deployment
3. View logs
4. Look for MongoDB connection messages

### Method 2: Test API Endpoint
```bash
curl https://chainoftrust.in/api/health
```

Should return:
```json
{"success":true,"message":"Server is running"}
```

### Method 3: Try Registration
1. Go to https://chainoftrust.in/login.html
2. Try to register a new user
3. Should work without timeout error

## Common MongoDB Atlas Mistakes

### Mistake 1: Only Whitelisting Specific IPs
❌ **Wrong:** Adding specific Railway IPs (they change)
✅ **Correct:** Adding 0.0.0.0/0 (all IPs)

### Mistake 2: Wrong Password Encoding
❌ **Wrong:** `PrepClan@2026` (special chars not encoded)
✅ **Correct:** `PrepClan%402026` (@ encoded as %40)

### Mistake 3: Wrong Database Name
❌ **Wrong:** `mongodb+srv://...mongodb.net/test`
✅ **Correct:** `mongodb+srv://...mongodb.net/prepclan`

### Mistake 4: Missing Connection String Options
❌ **Wrong:** `mongodb+srv://...mongodb.net/prepclan`
✅ **Correct:** `mongodb+srv://...mongodb.net/prepclan?retryWrites=true&w=majority`

## If Still Not Working

### Option 1: Create New Database User

1. MongoDB Atlas → Database Access
2. Click "Add New Database User"
3. Username: `prepclan_railway`
4. Password: Generate strong password (no special chars)
5. Database User Privileges: "Read and write to any database"
6. Click "Add User"
7. Update MONGODB_URI in Railway with new credentials

### Option 2: Check MongoDB Atlas Status

1. Visit: https://status.mongodb.com
2. Check if there are any outages
3. Check your cluster region status

### Option 3: Restart Railway Service

1. Railway Dashboard → Your Service
2. Click "..." menu
3. Click "Restart"
4. Wait for deployment to complete

## Quick Fix Summary

**Priority Order:**

1. **CRITICAL:** MongoDB Atlas → Network Access → Add 0.0.0.0/0
2. **CRITICAL:** Verify MONGODB_URI in Railway is correct
3. **IMPORTANT:** URL-encode password special characters
4. **IMPORTANT:** Wait 2 minutes for MongoDB changes to apply
5. **CHECK:** Railway logs for MongoDB connection success

## Expected Railway Logs (Success)

```
🚀 Server running on port 5000
📱 Frontend: https://chainoftrust.in
🔧 API: https://chainoftrust.in/api
✅ MongoDB Connected
```

## Expected Railway Logs (Failure)

```
❌ MongoDB connection error
Error: connect ETIMEDOUT
```

If you see failure, double-check Network Access in MongoDB Atlas.

---

**DO THIS FIRST: MongoDB Atlas → Network Access → Allow 0.0.0.0/0**

This is the most common issue with Railway deployments!
