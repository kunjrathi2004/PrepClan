# 🚨 URGENT: Security Credentials Fix

## Current Status
✅ Your .env file was NOT pushed to GitHub (protected by .gitignore)
⚠️ However, credentials were visible in conversation/documentation

## Exposed Credentials Found:
1. MongoDB Atlas credentials
2. Google OAuth Client ID & Secret
3. JWT & Session secrets

## Immediate Actions Required

### 1. Change MongoDB Atlas Password (CRITICAL)

#### Step 1: Login to MongoDB Atlas
1. Go to https://cloud.mongodb.com
2. Login with your account

#### Step 2: Change Database User Password
1. Click "Database Access" (left sidebar)
2. Find user: `prepclan` or `kunj1234`
3. Click "Edit"
4. Click "Edit Password"
5. Generate new strong password or use: `PrepClan2026Secure!@#`
6. Click "Update User"

#### Step 3: Update Connection String
Your new MongoDB URI format:
```
mongodb+srv://prepclan:NEW_PASSWORD_HERE@cluster0.62700bc.mongodb.net/prepclan?retryWrites=true&w=majority&appName=Cluster0
```

**Important:** URL-encode special characters:
- `@` becomes `%40`
- `!` becomes `%21`
- `#` becomes `%23`

Example: `PrepClan2026Secure!@#` becomes `PrepClan2026Secure%21%40%23`

### 2. Regenerate Google OAuth Credentials

#### Step 1: Delete Old Credentials
1. Go to https://console.cloud.google.com
2. Select your project
3. Go to "APIs & Services" → "Credentials"
4. Find your OAuth 2.0 Client ID
5. Click delete (trash icon)

#### Step 2: Create New OAuth Client
1. Click "Create Credentials" → "OAuth client ID"
2. Application type: "Web application"
3. Name: "PrepClan Production"
4. Authorized JavaScript origins:
   - `http://localhost:5000`
   - `https://your-railway-domain.railway.app` (add after deployment)
5. Authorized redirect URIs:
   - `http://localhost:5000/api/auth/google/callback`
   - `https://your-railway-domain.railway.app/api/auth/google/callback`
6. Click "Create"
7. Copy new Client ID and Client Secret

### 3. Generate New JWT & Session Secrets

Use strong random strings. Run these in PowerShell:

```powershell
# Generate JWT Secret
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 64 | ForEach-Object {[char]$_})

# Generate Session Secret
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 64 | ForEach-Object {[char]$_})
```

Or use online generator: https://randomkeygen.com/ (use "CodeIgniter Encryption Keys")

### 4. Update Your .env File

Replace with new credentials:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://prepclan:NEW_ENCODED_PASSWORD@cluster0.62700bc.mongodb.net/prepclan?retryWrites=true&w=majority&appName=Cluster0

# JWT Secret (use generated random string)
JWT_SECRET=YOUR_NEW_RANDOM_JWT_SECRET_64_CHARS

# Session Secret (use generated random string)
SESSION_SECRET=YOUR_NEW_RANDOM_SESSION_SECRET_64_CHARS

# Google OAuth Configuration (new credentials)
GOOGLE_CLIENT_ID=YOUR_NEW_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_NEW_CLIENT_SECRET
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Server Configuration
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5000
```

### 5. Test Locally

```bash
cd D:\PrepClan
node server.js
```

Visit http://localhost:5000 and test:
- Registration
- Login
- Google OAuth
- Dashboard access

### 6. Update Railway Environment Variables

When deploying to Railway, add these NEW credentials as environment variables.

## Why This Happened

The credentials were mentioned in our conversation for setup purposes. This is a common learning experience!

## Best Practices Going Forward

1. ✅ Never share .env file contents
2. ✅ Always use .gitignore for sensitive files (already done)
3. ✅ Use different credentials for development and production
4. ✅ Rotate credentials regularly
5. ✅ Use environment variables on hosting platforms

## Verification Checklist

- [ ] MongoDB password changed
- [ ] Google OAuth credentials regenerated
- [ ] JWT secret changed
- [ ] Session secret changed
- [ ] .env file updated with new credentials
- [ ] Local server tested successfully
- [ ] Old credentials documented as "REVOKED"

## Timeline

**Do this NOW before deploying to Railway!**

Estimated time: 10-15 minutes

## After Securing

Once all credentials are changed:
1. Test locally
2. Proceed with Railway deployment
3. Use NEW credentials in Railway environment variables

## Questions?

If you need help with any step, let me know which credential you're changing and I'll guide you through it.

---

**Remember:** The .env file was never pushed to GitHub, so your credentials are not publicly exposed on the internet. But it's still best practice to rotate them now.
