# IMMEDIATE FIX: 500 Internal Server Error

## Problem
Google OAuth callback is returning 500 Internal Server Error, which means the backend is crashing.

## Most Likely Causes

### 1. Missing Environment Variables in Railway

The error happens because one or more of these are NOT set in Railway:
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `JWT_SECRET`
- `SESSION_SECRET`

## URGENT ACTIONS

### Step 1: Check Railway Environment Variables

1. Go to Railway Dashboard
2. Click your service
3. Go to **"Variables"** tab
4. Verify ALL these exist:

```
MONGODB_URI = mongodb+srv://...
JWT_SECRET = (must be set!)
SESSION_SECRET = (must be set!)
GOOGLE_CLIENT_ID = (must be set for OAuth!)
GOOGLE_CLIENT_SECRET = (must be set for OAuth!)
GOOGLE_CALLBACK_URL = https://chainoftrust.in/api/auth/google/callback
NODE_ENV = production
```

### Step 2: Add Missing Variables

If any are missing, add them now:

**JWT_SECRET:**
```
JWT_SECRET=prepclan-jwt-secret-key-2026-production-secure-token-change-this-12345
```

**SESSION_SECRET:**
```
SESSION_SECRET=prepclan-session-secret-key-2026-production-secure-session-change-this-67890
```

**GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET:**
Get these from your Google Cloud Console:
1. Go to https://console.cloud.google.com
2. Select your project
3. APIs & Services → Credentials
4. Copy Client ID and Client Secret

### Step 3: Wait for Railway Deployment

After adding variables:
1. Railway will automatically redeploy (2-3 minutes)
2. Check deployment status

### Step 4: Check Railway Logs

1. Railway → Your Service → View Logs
2. After deployment, look for:
   ```
   ✅ MongoDB Connected
   🚀 Server running on port 5000
   ```
3. If you see warnings about missing variables, they're not set correctly

### Step 5: Test Again

After deployment completes:
1. Clear browser cache (Ctrl + Shift + R)
2. Go to https://chainoftrust.in/login.html
3. Try Google OAuth again

## Check Railway Logs for Specific Error

The new code I pushed will show detailed error messages. After Railway deploys:

1. Keep Railway logs open
2. Try Google OAuth login
3. Look for error messages like:
   - "Missing required environment variables: JWT_SECRET, SESSION_SECRET"
   - "Google OAuth not configured"
   - Any MongoDB errors
   - Any other error messages

**Share the exact error message from logs!**

## Manual Registration Issue

For manual registration showing "Server error", the issue is likely:

### Missing JWT_SECRET or SESSION_SECRET

Registration needs these to generate tokens. Add them in Railway:

```
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long-change-this
SESSION_SECRET=your-super-secret-session-key-at-least-32-characters-long-change-this
```

## Test Manual Registration with Curl

After adding environment variables, test:

```bash
curl -X POST https://chainoftrust.in/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "testuser@example.com",
    "password": "test123456",
    "dateOfBirth": "2000-01-01",
    "contactNumber": "1234567890"
  }'
```

**Expected success:**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "_id": "...",
    "name": "Test User",
    "email": "testuser@example.com",
    "token": "..."
  }
}
```

**If error:**
```json
{
  "success": false,
  "message": "Server error during registration",
  "error": "actual error message"
}
```

Share the error message!

## Complete Environment Variables List

Your Railway should have ALL of these:

```
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.62700bc.mongodb.net/prepclan?retryWrites=true&w=majority&appName=Cluster0

JWT_SECRET=prepclan-jwt-secret-key-2026-production-secure-token-change-this-12345

SESSION_SECRET=prepclan-session-secret-key-2026-production-secure-session-change-this-67890

NODE_ENV=production

GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com

GOOGLE_CLIENT_SECRET=GOCSPX-your-google-client-secret

GOOGLE_CALLBACK_URL=https://chainoftrust.in/api/auth/google/callback

PORT=5000
```

## Priority Checklist

- [ ] Check Railway Variables tab
- [ ] Verify JWT_SECRET exists
- [ ] Verify SESSION_SECRET exists
- [ ] Verify GOOGLE_CLIENT_ID exists
- [ ] Verify GOOGLE_CLIENT_SECRET exists
- [ ] Wait for Railway deployment (2-3 minutes)
- [ ] Check Railway logs for errors
- [ ] Test manual registration
- [ ] Test Google OAuth
- [ ] Share Railway logs if still failing

## After Adding Variables

Railway will:
1. Detect environment variable changes
2. Automatically trigger new deployment
3. Rebuild and restart your app (2-3 minutes)
4. New logs will show if variables are loaded correctly

## What the New Code Does

I added:
1. **Environment variable validation** - Shows which variables are missing
2. **Better error logging** - Shows actual error messages in Railway logs
3. **Google OAuth debugging** - Logs each step of OAuth process

This will help us see exactly what's failing.

---

**IMMEDIATE ACTION: Go to Railway → Variables → Add JWT_SECRET and SESSION_SECRET if missing!**

Then check Railway logs and share what you see.
