# Debug Registration & Login Issues

## Current Status
- ✅ MongoDB Connected
- ✅ API Health Check Working
- ❌ Manual Registration: "Server error during registration"
- ❌ Google Login: Timeout

## Debugging Steps

### Step 1: Check Railway Logs (CRITICAL)

1. Go to Railway Dashboard
2. Click your service
3. Click **"View Logs"** or **"Deployments"** → Latest deployment → Logs
4. Try to register again on the website
5. Watch the logs in real-time for error messages

**Look for:**
- MongoDB connection errors
- JWT_SECRET errors
- Password hashing errors
- Any stack traces

### Step 2: Verify All Environment Variables

In Railway Variables tab, ensure ALL these are set:

```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-jwt-secret-key
SESSION_SECRET=your-session-secret-key
NODE_ENV=production
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=https://chainoftrust.in/api/auth/google/callback
PORT=5000
```

**Critical:** If `JWT_SECRET` or `SESSION_SECRET` are missing, registration will fail!

### Step 3: Check Browser Console

1. Open https://chainoftrust.in/login.html
2. Press F12 (open Developer Tools)
3. Go to "Console" tab
4. Try to register
5. Look for error messages

**Common errors:**
- CORS errors
- Network errors
- API endpoint errors

### Step 4: Check Network Tab

1. F12 → "Network" tab
2. Try to register
3. Look for the POST request to `/api/auth/register`
4. Click on it
5. Check:
   - Status code (should be 201 for success)
   - Response body (shows the actual error)
   - Request payload (verify data is being sent)

## Common Issues & Fixes

### Issue 1: JWT_SECRET Not Set

**Error in logs:**
```
secretOrPrivateKey must have a value
```

**Fix:**
1. Railway → Variables
2. Add: `JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long`
3. Add: `SESSION_SECRET=your-super-secret-session-key-at-least-32-characters-long`

### Issue 2: MongoDB Connection Lost

**Error:**
```
Operation `users.findOne()` buffering timed out
```

**Fix:**
1. Check if MONGODB_URI is still correct
2. Check MongoDB Atlas is not paused (free tier pauses after inactivity)
3. Restart Railway service

### Issue 3: CORS Error

**Error in browser console:**
```
Access to fetch at 'https://chainoftrust.in/api/auth/register' has been blocked by CORS policy
```

**Fix:**
Already handled in code, but verify Railway deployment is using latest code.

### Issue 4: Google OAuth Timeout

**Cause:**
- GOOGLE_CALLBACK_URL not set correctly
- Google OAuth credentials not set
- Passport not configured properly

**Fix:**
1. Verify `GOOGLE_CALLBACK_URL` in Railway
2. Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in Railway
3. Check Google Cloud Console redirect URIs

## Manual Testing Commands

### Test Registration API Directly

```bash
curl -X POST https://chainoftrust.in/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123456",
    "dateOfBirth": "2000-01-01",
    "contactNumber": "1234567890"
  }'
```

**Expected response (success):**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "_id": "...",
    "name": "Test User",
    "email": "test@example.com",
    "token": "..."
  }
}
```

**Expected response (error):**
```json
{
  "success": false,
  "message": "Server error during registration",
  "error": "actual error message here"
}
```

### Test Login API Directly

```bash
curl -X POST https://chainoftrust.in/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123456"
  }'
```

## Specific Debugging Actions

### Action 1: Check Railway Deployment Status

1. Railway Dashboard → Deployments
2. Ensure latest deployment shows "Success"
3. Check deployment time (should be recent)
4. If failed, check build logs

### Action 2: Verify Database User Permissions

1. MongoDB Atlas → Database Access
2. Find your database user
3. Ensure role is: "Read and write to any database"
4. If not, edit and update permissions

### Action 3: Test MongoDB Connection from Railway

Check Railway logs for:
```
✅ MongoDB Connected
🚀 Server running on port 5000
```

If not present, MongoDB connection failed.

### Action 4: Check if bcrypt is Working

Registration requires bcrypt to hash passwords. Check Railway logs for:
```
Error: bcrypt not installed
```

This should not happen as it's in package.json, but worth checking.

## Get Detailed Error Information

### Method 1: Railway Logs (Best)

Real-time logs show exact error:
1. Railway → Your Service → View Logs
2. Keep logs open
3. Try to register on website
4. Error will appear in logs immediately

### Method 2: Browser Network Tab

1. F12 → Network tab
2. Try to register
3. Find POST request to `/api/auth/register`
4. Click it → Response tab
5. Shows exact error message

### Method 3: Browser Console

1. F12 → Console tab
2. Try to register
3. Look for red error messages

## Quick Fixes to Try

### Fix 1: Restart Railway Service

1. Railway Dashboard → Your Service
2. Click "..." menu → Restart
3. Wait 1-2 minutes
4. Try again

### Fix 2: Redeploy Latest Code

```bash
# In your local machine
cd D:\PrepClan
git add .
git commit -m "Force redeploy"
git push origin main
```

Railway will auto-deploy.

### Fix 3: Check Environment Variables

Ensure these are set in Railway (not empty):
- MONGODB_URI ✓
- JWT_SECRET ✓
- SESSION_SECRET ✓

### Fix 4: Clear Browser Cache

1. Ctrl + Shift + Delete
2. Clear cached files
3. Or use Incognito window

## What to Share for Further Debugging

Please provide:

1. **Railway Logs** (when you try to register)
2. **Browser Console Errors** (F12 → Console)
3. **Network Response** (F12 → Network → POST /api/auth/register → Response)
4. **Railway Environment Variables** (screenshot, hide sensitive values)

## Expected Working Flow

### Registration:
1. User fills form → Click "Create Account"
2. Frontend sends POST to `/api/auth/register`
3. Backend validates data
4. Backend checks if user exists
5. Backend hashes password with bcrypt
6. Backend creates user in MongoDB
7. Backend generates JWT token
8. Backend returns success + token
9. Frontend stores token
10. Frontend redirects to dashboard

### Google OAuth:
1. User clicks "Continue with Google"
2. Redirects to Google login
3. User selects account
4. Google redirects to `/api/auth/google/callback`
5. Backend verifies with Google
6. Backend creates/finds user in MongoDB
7. Backend generates JWT token
8. Backend redirects to `/dashboard.html?token=...`
9. Frontend processes token
10. Frontend redirects to clean dashboard URL

## Priority Actions

1. **CHECK RAILWAY LOGS** (most important!)
2. Check JWT_SECRET is set in Railway
3. Check SESSION_SECRET is set in Railway
4. Verify MongoDB connection in logs
5. Test registration with curl command
6. Share error details for further help

---

**Next Step: Check Railway logs and share the error message you see when trying to register**
