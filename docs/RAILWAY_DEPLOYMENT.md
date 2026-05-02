# Railway Deployment Guide for PrepClan

## Prerequisites
- GitHub account
- Railway account (sign up at https://railway.app)
- Your code pushed to a GitHub repository

## Step 1: Prepare Your Repository

### 1.1 Create .gitignore (if not exists)
```
node_modules/
.env
*.log
.DS_Store
```

### 1.2 Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit for Railway deployment"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

## Step 2: Deploy on Railway

### 2.1 Sign Up/Login
1. Go to https://railway.app
2. Click "Login" and sign in with GitHub
3. Authorize Railway to access your repositories

### 2.2 Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your PrepClan repository
4. Railway will automatically detect it's a Node.js project

### 2.3 Configure Environment Variables
Click on your deployed service → "Variables" tab → Add all these variables:

**Required Variables:**
```
MONGODB_URI=mongodb+srv://kunj1234:Kunj%401234@cluster0.62700bc.mongodb.net/prepclan
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
SESSION_SECRET=your-super-secret-session-key-change-this-too
PORT=5000
NODE_ENV=production
```

**Google OAuth (if using):**
```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=https://your-railway-domain.railway.app/api/auth/google/callback
```

### 2.4 Generate Domain
1. Go to "Settings" tab
2. Scroll to "Networking" section
3. Click "Generate Domain"
4. Copy your Railway domain (e.g., `your-app.up.railway.app`)

## Step 3: Update Google OAuth Settings

### 3.1 Google Cloud Console
1. Go to https://console.cloud.google.com
2. Select your project
3. Go to "APIs & Services" → "Credentials"
4. Edit your OAuth 2.0 Client ID
5. Add to "Authorized JavaScript origins":
   ```
   https://your-railway-domain.railway.app
   ```
6. Add to "Authorized redirect URIs":
   ```
   https://your-railway-domain.railway.app/api/auth/google/callback
   ```
7. Save changes

### 3.2 Update Railway Environment Variable
Update `GOOGLE_CALLBACK_URL` in Railway with your actual domain:
```
GOOGLE_CALLBACK_URL=https://your-railway-domain.railway.app/api/auth/google/callback
```

## Step 4: MongoDB Atlas Configuration

### 4.1 Whitelist Railway IP
1. Go to MongoDB Atlas (https://cloud.mongodb.com)
2. Select your cluster
3. Click "Network Access" in left sidebar
4. Click "Add IP Address"
5. Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Railway uses dynamic IPs, so this is necessary
6. Click "Confirm"

## Step 5: Verify Deployment

### 5.1 Check Deployment Logs
1. In Railway dashboard, click on your service
2. Go to "Deployments" tab
3. Click on the latest deployment
4. Check logs for any errors

### 5.2 Test Your Website
1. Visit your Railway domain: `https://your-railway-domain.railway.app`
2. Test registration and login
3. Test Google OAuth
4. Test dashboard and profile pages

## Step 6: Custom Domain (Optional)

### 6.1 Add Custom Domain
1. In Railway, go to "Settings" → "Networking"
2. Click "Custom Domain"
3. Enter your domain (e.g., `prepclan.com`)
4. Add the CNAME record to your domain's DNS settings:
   ```
   CNAME: your-subdomain → your-app.up.railway.app
   ```

## Troubleshooting

### Issue: "Cannot connect to MongoDB"
**Solution:** 
- Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Check MONGODB_URI environment variable is correct
- Ensure password is URL-encoded in connection string

### Issue: "Google OAuth not working"
**Solution:**
- Verify authorized redirect URIs in Google Cloud Console
- Check GOOGLE_CALLBACK_URL matches your Railway domain
- Ensure HTTPS is used (not HTTP)

### Issue: "Server not starting"
**Solution:**
- Check deployment logs in Railway
- Verify all environment variables are set
- Ensure package.json has correct start script

### Issue: "CORS errors"
**Solution:**
- Railway domain is automatically added to CORS origins
- Check browser console for specific CORS errors
- Verify credentials: true in CORS config

## Railway Free Tier Limits

- **Execution Time:** $5 worth of usage per month (~500 hours)
- **Memory:** 512MB RAM per service
- **Storage:** Ephemeral (files don't persist between deployments)
- **Bandwidth:** Unlimited
- **Projects:** Unlimited

**Note:** Free tier requires credit card for verification but won't charge unless you exceed limits.

## Updating Your Deployment

### Push Updates
```bash
git add .
git commit -m "Your update message"
git push origin main
```

Railway will automatically detect the push and redeploy your application.

## Important Notes

1. **Environment Variables:** Never commit .env file to GitHub
2. **MongoDB:** Use MongoDB Atlas (cloud) not local MongoDB
3. **Static Files:** All your HTML, CSS, JS files are served from root
4. **HTTPS:** Railway provides free SSL certificates automatically
5. **Logs:** Monitor logs regularly for errors and issues

## Support

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- PrepClan Issues: Create issue in your GitHub repository

---

**Your PrepClan website is now live on Railway! 🚀**

Visit: `https://your-railway-domain.railway.app`
