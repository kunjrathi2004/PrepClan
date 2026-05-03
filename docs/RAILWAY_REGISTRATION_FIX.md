# Railway Deployment - Registration Fix

## Problem Fixed ✅
Manual registration was not working on Railway deployment (chainoftrust.in) because the frontend JavaScript files were hardcoded to use `localhost:5000`.

## Solution Applied
Updated all JavaScript files to automatically detect the environment:

### Files Updated:
1. `assets/js/auth.js` - Login & Registration
2. `assets/js/dashboard-premium.js` - Dashboard
3. `assets/js/profile.js` - Profile page

### Code Change:
```javascript
// Before (hardcoded)
const API_URL = 'http://localhost:5000/api';

// After (dynamic)
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000/api'
    : `${window.location.origin}/api`;
```

## Deployment Status
✅ Code pushed to GitHub: https://github.com/kunjrathi2004/PrepClan
✅ Railway will auto-deploy in 2-3 minutes
✅ Changes will be live at: https://chainoftrust.in

## Testing After Deployment

### 1. Wait for Railway Deployment
1. Go to Railway dashboard
2. Check "Deployments" tab
3. Wait for status to show "Success" (usually 2-3 minutes)

### 2. Test Registration
1. Visit: https://chainoftrust.in/login.html
2. Click "Sign up"
3. Fill in the registration form:
   - Name
   - Email
   - Date of Birth
   - Contact Number
   - Password
   - Confirm Password
4. Click "Create Account"
5. Should redirect to dashboard

### 3. Test Login
1. Visit: https://chainoftrust.in/login.html
2. Enter registered email and password
3. Click "Login"
4. Should redirect to dashboard

### 4. Test Dashboard
1. Should see your name and progress
2. All stats should load correctly

### 5. Test Profile
1. Click "Profile" in navbar
2. Should see your profile details
3. Click "Edit Profile"
4. Update any field
5. Click "Save Changes"
6. Should show success message

## Common Issues & Solutions

### Issue 1: Still showing localhost error
**Solution:** Hard refresh the page
- Windows: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`
- Or clear browser cache

### Issue 2: "Cannot connect to server"
**Solution:** Check Railway deployment status
1. Go to Railway dashboard
2. Check if deployment is complete
3. Check deployment logs for errors

### Issue 3: MongoDB connection error
**Solution:** Verify environment variables in Railway
1. Go to Railway → Your service → Variables
2. Ensure `MONGODB_URI` is set correctly
3. Check MongoDB Atlas IP whitelist (should be 0.0.0.0/0)

### Issue 4: Google OAuth not working
**Solution:** Update Google OAuth redirect URLs
1. Go to Google Cloud Console
2. Update authorized redirect URIs to include:
   - `https://chainoftrust.in/api/auth/google/callback`
3. Update `GOOGLE_CALLBACK_URL` in Railway variables

## Environment Variables Checklist

Ensure these are set in Railway:

```
✅ MONGODB_URI=mongodb+srv://...
✅ JWT_SECRET=your-secret-key
✅ SESSION_SECRET=your-session-secret
✅ NODE_ENV=production
✅ GOOGLE_CLIENT_ID=your-client-id (if using OAuth)
✅ GOOGLE_CLIENT_SECRET=your-client-secret (if using OAuth)
✅ GOOGLE_CALLBACK_URL=https://chainoftrust.in/api/auth/google/callback
```

## Verification Commands

### Check if API is responding:
```bash
curl https://chainoftrust.in/api/health
```

Should return:
```json
{"success":true,"message":"Server is running"}
```

### Check Railway logs:
1. Railway dashboard → Your service
2. Click "View Logs"
3. Look for:
   - "Server running on port..."
   - "MongoDB connected successfully"

## Next Steps

1. ✅ Wait 2-3 minutes for Railway to deploy
2. ✅ Hard refresh your browser (Ctrl+Shift+R)
3. ✅ Test registration at https://chainoftrust.in/login.html
4. ✅ Test login with created account
5. ✅ Verify dashboard loads correctly

## Success Indicators

When everything is working:
- ✅ Registration creates new user
- ✅ Login redirects to dashboard
- ✅ Dashboard shows user name and stats
- ✅ Profile page loads and can be edited
- ✅ Logout works correctly

## Still Having Issues?

1. Check Railway deployment logs
2. Check browser console (F12) for errors
3. Verify MongoDB Atlas connection
4. Ensure all environment variables are set
5. Try in incognito/private window

## Support

- Railway Status: https://status.railway.app
- Railway Docs: https://docs.railway.app
- GitHub Repo: https://github.com/kunjrathi2004/PrepClan

---

**Deployment Time:** ~2-3 minutes after push
**Status:** Code pushed successfully, waiting for Railway auto-deploy
