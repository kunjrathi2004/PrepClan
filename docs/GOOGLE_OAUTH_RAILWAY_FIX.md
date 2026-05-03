# Google OAuth Railway Fix - Complete Guide

## Problem Fixed ✅
Google OAuth was redirecting to `http://localhost:5000/dashboard.html` instead of staying on `https://chainoftrust.in/dashboard.html`

## Changes Made

### 1. Backend Changes
- ✅ Added `proxy: true` to Passport Google Strategy (trusts Railway proxy)
- ✅ Made callback URL dynamic

### 2. Frontend Changes
- ✅ Updated `google-oauth-handler.js` to use dynamic API URL

## CRITICAL: Update Google Cloud Console

You MUST update your Google OAuth settings for this to work:

### Step 1: Go to Google Cloud Console
1. Visit: https://console.cloud.google.com
2. Select your project
3. Go to "APIs & Services" → "Credentials"

### Step 2: Edit OAuth 2.0 Client ID
1. Find your OAuth 2.0 Client ID
2. Click the edit icon (pencil)

### Step 3: Update Authorized JavaScript Origins
Add these URLs:
```
http://localhost:5000
https://chainoftrust.in
```

### Step 4: Update Authorized Redirect URIs
Add these URLs:
```
http://localhost:5000/api/auth/google/callback
https://chainoftrust.in/api/auth/google/callback
```

### Step 5: Save Changes
Click "Save" at the bottom

## Update Railway Environment Variables

### Option 1: Use Relative Callback URL (Recommended)
In Railway, set:
```
GOOGLE_CALLBACK_URL=/api/auth/google/callback
```

This will automatically use the correct domain (chainoftrust.in)

### Option 2: Use Full URL
In Railway, set:
```
GOOGLE_CALLBACK_URL=https://chainoftrust.in/api/auth/google/callback
```

## Testing After Deployment

### 1. Wait for Railway Deployment
- Check Railway dashboard
- Wait for "Success" status (2-3 minutes)

### 2. Clear Browser Cache
- Press `Ctrl + Shift + Delete`
- Clear "Cached images and files"
- Or use Incognito/Private window

### 3. Test Google OAuth
1. Go to: https://chainoftrust.in/login.html
2. Click "Continue with Google"
3. Select your Google account
4. Should redirect to: `https://chainoftrust.in/dashboard.html?token=...`
5. Should then clean URL to: `https://chainoftrust.in/dashboard.html`
6. Dashboard should load with your name

## Verification Checklist

- [ ] Google Cloud Console updated with chainoftrust.in URLs
- [ ] Railway environment variable `GOOGLE_CALLBACK_URL` set
- [ ] Railway deployment completed successfully
- [ ] Browser cache cleared
- [ ] Google OAuth redirects to chainoftrust.in (not localhost)
- [ ] Dashboard loads after Google login
- [ ] User name appears in dashboard

## Common Issues & Solutions

### Issue 1: Still redirects to localhost
**Cause:** Browser cached old JavaScript files
**Solution:** 
- Hard refresh: `Ctrl + Shift + R`
- Or clear browser cache completely
- Or use Incognito window

### Issue 2: "redirect_uri_mismatch" error
**Cause:** Google Cloud Console not updated
**Solution:**
1. Check error message for the redirect URI being used
2. Add that exact URI to Google Cloud Console
3. Make sure it matches exactly (http vs https, trailing slash, etc.)

### Issue 3: "Error 400: invalid_request"
**Cause:** GOOGLE_CALLBACK_URL not set in Railway
**Solution:**
1. Go to Railway → Your service → Variables
2. Add: `GOOGLE_CALLBACK_URL=/api/auth/google/callback`
3. Redeploy

### Issue 4: Dashboard shows "error connecting to server"
**Cause:** Token not being processed correctly
**Solution:**
1. Check browser console (F12) for errors
2. Verify `google-oauth-handler.js` is loaded
3. Check Railway logs for backend errors

## Environment Variables Summary

Required in Railway:
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-jwt-secret
SESSION_SECRET=your-session-secret
NODE_ENV=production
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=/api/auth/google/callback
```

## Google Cloud Console Summary

**Authorized JavaScript origins:**
- http://localhost:5000
- https://chainoftrust.in

**Authorized redirect URIs:**
- http://localhost:5000/api/auth/google/callback
- https://chainoftrust.in/api/auth/google/callback

## Testing Flow

1. User clicks "Continue with Google" on chainoftrust.in
2. Redirects to Google login
3. User selects account
4. Google redirects to: `https://chainoftrust.in/api/auth/google/callback`
5. Backend processes OAuth, generates JWT token
6. Backend redirects to: `https://chainoftrust.in/dashboard.html?token=JWT_TOKEN`
7. Frontend JavaScript processes token
8. Stores token in localStorage
9. Fetches user data from API
10. Cleans URL to: `https://chainoftrust.in/dashboard.html`
11. Dashboard displays user info

## Debug Commands

### Check Railway logs:
```
Railway Dashboard → Your Service → View Logs
```

Look for:
- "Google OAuth callback received"
- "Token generated for user"
- Any error messages

### Check browser console:
```
F12 → Console tab
```

Look for:
- "Google OAuth token received, processing..."
- "User data fetched successfully"
- Any error messages

### Test API endpoint:
```bash
curl https://chainoftrust.in/api/health
```

Should return:
```json
{"success":true,"message":"Server is running"}
```

## Success Indicators

When everything works:
- ✅ Click "Continue with Google" on chainoftrust.in
- ✅ Google login page appears
- ✅ After login, stays on chainoftrust.in domain
- ✅ Dashboard loads with user name
- ✅ No localhost URLs appear anywhere

## Next Steps

1. ✅ Update Google Cloud Console (CRITICAL - do this first!)
2. ✅ Set GOOGLE_CALLBACK_URL in Railway
3. ✅ Wait for Railway deployment (2-3 minutes)
4. ✅ Clear browser cache
5. ✅ Test Google OAuth login

## Support

- Google OAuth Docs: https://developers.google.com/identity/protocols/oauth2
- Railway Docs: https://docs.railway.app
- Passport.js Docs: http://www.passportjs.org/

---

**Deployment Status:** Code pushed, waiting for Railway auto-deploy
**Action Required:** Update Google Cloud Console with chainoftrust.in URLs
