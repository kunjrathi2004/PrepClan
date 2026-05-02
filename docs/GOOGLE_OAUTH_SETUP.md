# 🔐 Google OAuth Setup Guide

## Step 1: Go to Google Cloud Console

Open: https://console.cloud.google.com/

Login with your Google account.

---

## Step 2: Create a New Project

1. Click on the **project dropdown** at the top (next to "Google Cloud")
2. Click **"New Project"**
3. Project name: `PrepClan`
4. Click **"Create"**
5. Wait for project creation (10-20 seconds)
6. Select the new project from dropdown

---

## Step 3: Enable Google+ API

1. In the left sidebar, go to **"APIs & Services"** → **"Library"**
2. Search for: `Google+ API`
3. Click on **"Google+ API"**
4. Click **"Enable"**
5. Wait for it to enable

---

## Step 4: Configure OAuth Consent Screen

1. Go to **"APIs & Services"** → **"OAuth consent screen"**
2. Choose **"External"** user type
3. Click **"Create"**

**Fill in the form:**
- App name: `PrepClan`
- User support email: Your email
- App logo: (Skip for now)
- App domain: (Skip for now)
- Authorized domains: (Skip for now)
- Developer contact information: Your email

4. Click **"Save and Continue"**

**Scopes:**
5. Click **"Add or Remove Scopes"**
6. Select:
   - `.../auth/userinfo.email`
   - `.../auth/userinfo.profile`
7. Click **"Update"**
8. Click **"Save and Continue"**

**Test Users:**
9. Click **"Add Users"**
10. Add your email address (for testing)
11. Click **"Add"**
12. Click **"Save and Continue"**

13. Review and click **"Back to Dashboard"**

---

## Step 5: Create OAuth Credentials

1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"Create Credentials"** → **"OAuth client ID"**
3. Application type: **"Web application"**
4. Name: `PrepClan Web Client`

**Authorized JavaScript origins:**
5. Click **"Add URI"**
6. Add: `http://localhost:5000`

**Authorized redirect URIs:**
7. Click **"Add URI"**
8. Add: `http://localhost:5000/api/auth/google/callback`

9. Click **"Create"**

---

## Step 6: Copy Your Credentials

You'll see a popup with:
- **Client ID**: Something like `123456789-abcdefg.apps.googleusercontent.com`
- **Client Secret**: Something like `GOCSPX-abcdefghijklmnop`

**IMPORTANT: Copy both of these!**

---

## Step 7: Update .env File

Open `d:\PrepClan\.env` and update these lines:

```env
GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE
GOOGLE_CLIENT_SECRET=YOUR_CLIENT_SECRET_HERE
```

**Example:**
```env
GOOGLE_CLIENT_ID=123456789-abcdefg.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abcdefghijklmnop
```

---

## Step 8: Restart Server

```bash
# Press Ctrl+C to stop server
npm start
```

---

## Step 9: Test Google OAuth

1. Go to: http://localhost:5000/login.html
2. Click **"Continue with Google"** button
3. Choose your Google account
4. Allow permissions
5. You should be redirected to dashboard! ✅

---

## 🎯 Quick Reference

### Your OAuth URLs:
- **Authorized JavaScript origins**: `http://localhost:5000`
- **Authorized redirect URIs**: `http://localhost:5000/api/auth/google/callback`

### Where to find credentials:
Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client IDs

---

## 🐛 Troubleshooting

### Error: "redirect_uri_mismatch"
**Solution:**
1. Go to Google Cloud Console → Credentials
2. Click on your OAuth client
3. Make sure redirect URI is EXACTLY: `http://localhost:5000/api/auth/google/callback`
4. No trailing slash, no extra spaces

### Error: "Access blocked: This app's request is invalid"
**Solution:**
1. Go to OAuth consent screen
2. Make sure you added your email as a test user
3. App must be in "Testing" mode

### Error: "invalid_client"
**Solution:**
1. Check Client ID and Secret in .env file
2. Make sure there are no extra spaces
3. Restart server after updating .env

### Google login button does nothing
**Solution:**
1. Check browser console (F12) for errors
2. Make sure server is running
3. Check if API endpoint is correct

---

## 📝 After Testing

Once everything works:

1. **For Production:**
   - Update redirect URI to your production domain
   - Example: `https://prepclan.railway.app/api/auth/google/callback`
   - Add production domain to authorized origins

2. **Publish OAuth App:**
   - Go to OAuth consent screen
   - Click "Publish App"
   - Submit for verification (if needed)

---

## ✅ Verification Checklist

- [ ] Google Cloud project created
- [ ] Google+ API enabled
- [ ] OAuth consent screen configured
- [ ] Test user added (your email)
- [ ] OAuth credentials created
- [ ] Client ID copied
- [ ] Client Secret copied
- [ ] .env file updated
- [ ] Server restarted
- [ ] Google login button works
- [ ] Can login with Google account
- [ ] Redirected to dashboard after login

---

**Once you complete these steps, Google OAuth will be fully working! 🎉**

Let me know when you have the Client ID and Secret, and I'll help you update the .env file!
