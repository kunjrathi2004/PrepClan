# URGENT FIX: Google OAuth redirect_uri_mismatch

## Problem
Google OAuth is using `http://localhost:5000/api/auth/google/callback` instead of `https://chainoftrust.in/api/auth/google/callback`

## Root Cause
The `GOOGLE_CALLBACK_URL` environment variable in Railway is either:
1. Not set at all (defaulting to localhost from .env)
2. Set to localhost value
3. Not being read correctly

## IMMEDIATE FIX - Do This Now!

### Step 1: Update Railway Environment Variable

1. Go to Railway dashboard: https://railway.app
2. Select your PrepClan project
3. Click on your service
4. Go to "Variables" tab
5. Find or add `GOOGLE_CALLBACK_URL`
6. Set it to: `https://chainoftrust.in/api/auth/google/callback`
7. Click "Add" or "Update"
8. Railway will automatically redeploy (wait 2-3 minutes)

### Step 2: Update Google Cloud Console

1. Go to: https://console.cloud.google.com
2. Select your project
3. Go to "APIs & Services" → "Credentials"
4. Click on your OAuth 2.0 Client ID
5. Under "Authorized redirect URIs", add:
   ```
   https://chainoftrust.in/api/auth/google/callback
   ```
6. Click "Save"

### Step 3: Remove/Update .env GOOGLE_CALLBACK_URL

Your local .env file should have:
```
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

This is fine for local development, but Railway needs its own value.

## Verification

### Check Railway Environment Variables
In Railway Variables tab, you should see:
```
GOOGLE_CALLBACK_URL = https://chainoftrust.in/api/auth/google/callback
```

### Check Google Cloud Console
In Authorized redirect URIs, you should see:
```
http://localhost:5000/api/auth/google/callback (for local dev)
https://chainoftrust.in/api/auth/google/callback (for production)
```

## Test After Fix

1. Wait 2-3 minutes for Railway to redeploy
2. Clear browser cache (Ctrl + Shift + Delete)
3. Go to: https://chainoftrust.in/login.html
4. Click "Continue with Google"
5. Should now work without redirect_uri_mismatch error

## Alternative: Use Relative URL (Better Solution)

Instead of full URL, you can use relative path:

### In Railway Variables:
```
GOOGLE_CALLBACK_URL=/api/auth/google/callback
```

But this requires updating the passport config to build the full URL.

## If Still Not Working

### Option 1: Check Railway Logs
1. Railway Dashboard → Your Service → View Logs
2. Look for the callback URL being used
3. Should show: `https://chainoftrust.in/api/auth/google/callback`

### Option 2: Temporarily Disable OAuth
Test manual registration first:
1. Go to https://chainoftrust.in/login.html
2. Click "Sign up"
3. Register manually
4. This should work (we fixed this earlier)

### Option 3: Check All Environment Variables
Make sure these are set in Railway:
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-jwt-secret
SESSION_SECRET=your-session-secret
NODE_ENV=production
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=https://chainoftrust.in/api/auth/google/callback
```

## Common Mistakes

❌ **Wrong:** Setting GOOGLE_CALLBACK_URL to localhost in Railway
✅ **Correct:** Setting GOOGLE_CALLBACK_URL to https://chainoftrust.in/api/auth/google/callback

❌ **Wrong:** Not adding chainoftrust.in to Google Cloud Console
✅ **Correct:** Adding both localhost and chainoftrust.in URLs

❌ **Wrong:** Using http:// for production URL
✅ **Correct:** Using https:// for production URL

## Quick Checklist

- [ ] Railway GOOGLE_CALLBACK_URL = https://chainoftrust.in/api/auth/google/callback
- [ ] Google Cloud Console has https://chainoftrust.in/api/auth/google/callback in redirect URIs
- [ ] Railway deployment completed (check status)
- [ ] Browser cache cleared
- [ ] Tested Google OAuth login

## Screenshot Guide

### Railway Variables Should Look Like:
```
MONGODB_URI: mongodb+srv://...
JWT_SECRET: xxxxxxxxxx
SESSION_SECRET: xxxxxxxxxx
NODE_ENV: production
GOOGLE_CLIENT_ID: xxxxxxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET: GOCSPX-xxxxxxxxxx
GOOGLE_CALLBACK_URL: https://chainoftrust.in/api/auth/google/callback
```

### Google Cloud Console Should Show:
**Authorized JavaScript origins:**
- http://localhost:5000
- https://chainoftrust.in

**Authorized redirect URIs:**
- http://localhost:5000/api/auth/google/callback
- https://chainoftrust.in/api/auth/google/callback

## Priority Actions (In Order)

1. **FIRST:** Set GOOGLE_CALLBACK_URL in Railway to https://chainoftrust.in/api/auth/google/callback
2. **SECOND:** Add https://chainoftrust.in/api/auth/google/callback to Google Cloud Console
3. **THIRD:** Wait for Railway to redeploy (2-3 minutes)
4. **FOURTH:** Clear browser cache and test

---

**This is the most critical fix. Do Step 1 and Step 2 immediately!**
