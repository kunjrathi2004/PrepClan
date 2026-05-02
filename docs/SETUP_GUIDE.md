# PrepClan Backend Setup Guide

## 🚀 Complete Setup Instructions

### 1. MongoDB Atlas Setup (Free Tier)

#### Step 1: Create MongoDB Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Choose the **FREE** M0 tier (512MB storage)

#### Step 2: Create a Cluster
1. After login, click **"Build a Database"**
2. Choose **FREE** shared cluster
3. Select your preferred cloud provider and region (closest to you)
4. Click **"Create Cluster"** (takes 3-5 minutes)

#### Step 3: Create Database User
1. Click **"Database Access"** in left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Username: `prepclan_admin` (or your choice)
5. Password: Generate a strong password (save it!)
6. Database User Privileges: **"Read and write to any database"**
7. Click **"Add User"**

#### Step 4: Whitelist IP Address
1. Click **"Network Access"** in left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development)
   - IP: `0.0.0.0/0`
4. Click **"Confirm"**

#### Step 5: Get Connection String
1. Go back to **"Database"** (Clusters)
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://prepclan_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password
6. Add database name: `prepclan` before the `?`
   ```
   mongodb+srv://prepclan_admin:yourpassword@cluster0.xxxxx.mongodb.net/prepclan?retryWrites=true&w=majority
   ```

---

### 2. Google OAuth Setup

#### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"Select a project"** → **"New Project"**
3. Project name: `PrepClan`
4. Click **"Create"**

#### Step 2: Enable Google+ API
1. In the left sidebar, go to **"APIs & Services"** → **"Library"**
2. Search for **"Google+ API"**
3. Click on it and click **"Enable"**

#### Step 3: Configure OAuth Consent Screen
1. Go to **"APIs & Services"** → **"OAuth consent screen"**
2. Choose **"External"** user type
3. Click **"Create"**
4. Fill in:
   - App name: `PrepClan`
   - User support email: Your email
   - Developer contact: Your email
5. Click **"Save and Continue"**
6. Skip "Scopes" (click **"Save and Continue"**)
7. Add test users (your email for testing)
8. Click **"Save and Continue"**

#### Step 4: Create OAuth Credentials
1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"Create Credentials"** → **"OAuth client ID"**
3. Application type: **"Web application"**
4. Name: `PrepClan Web Client`
5. Authorized JavaScript origins:
   - `http://localhost:5000`
6. Authorized redirect URIs:
   - `http://localhost:5000/api/auth/google/callback`
7. Click **"Create"**
8. Copy your **Client ID** and **Client Secret**

---

### 3. Configure Environment Variables

Open `.env` file and update:

```env
# MongoDB Configuration (from Step 1.5)
MONGODB_URI=mongodb+srv://prepclan_admin:yourpassword@cluster0.xxxxx.mongodb.net/prepclan?retryWrites=true&w=majority

# JWT Secret (generate a random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345

# Server Configuration
PORT=5000
NODE_ENV=development

# Google OAuth Configuration (from Step 2.4)
GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Frontend URL
CLIENT_URL=http://localhost:5000

# Session Secret (generate a random string)
SESSION_SECRET=your_session_secret_key_change_this_in_production_67890
```

---

### 4. Start the Server

#### Install Dependencies (if not done)
```bash
npm install
```

#### Start the Server
```bash
npm start
```

You should see:
```
✅ MongoDB Connected: cluster0-xxxxx.mongodb.net
🚀 Server running on port 5000
📱 Frontend: http://localhost:5000
🔧 API: http://localhost:5000/api
```

---

### 5. Test the Application

1. Open browser: `http://localhost:5000`
2. Click on any navigation link to test
3. Go to: `http://localhost:5000/login.html`
4. Try registering a new account
5. Try logging in
6. Try Google OAuth login

---

## 📝 API Endpoints

### Authentication Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/google` | Google OAuth login |
| GET | `/api/auth/google/callback` | Google OAuth callback |
| GET | `/api/auth/me` | Get current user (protected) |
| POST | `/api/auth/logout` | Logout user (protected) |

### Request Examples

#### Register
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "dateOfBirth": "2000-01-15",
  "contactNumber": "+91-9876543210"
}
```

#### Login
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

---

## 🔒 Security Notes

### For Production:
1. Change `JWT_SECRET` to a strong random string
2. Change `SESSION_SECRET` to a strong random string
3. Update `GOOGLE_CALLBACK_URL` to your production domain
4. Update MongoDB Network Access to specific IPs
5. Enable HTTPS
6. Set `NODE_ENV=production`

### Generate Strong Secrets:
```bash
# In Node.js console
require('crypto').randomBytes(64).toString('hex')
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
- Check if MongoDB URI is correct
- Verify password doesn't contain special characters (URL encode if needed)
- Check if IP is whitelisted in MongoDB Atlas

### Google OAuth Error
- Verify redirect URI matches exactly in Google Console
- Check if Google+ API is enabled
- Ensure OAuth consent screen is configured

### Port Already in Use
```bash
# Change PORT in .env file
PORT=3000
```

---

## 📦 Project Structure

```
PrepClan/
├── server.js                 # Main server file
├── .env                      # Environment variables
├── package.json              # Dependencies
├── server/
│   ├── config/
│   │   ├── database.js      # MongoDB connection
│   │   └── passport.js      # Google OAuth config
│   ├── models/
│   │   └── User.js          # User schema
│   ├── routes/
│   │   └── auth.js          # Auth routes
│   └── middleware/
│       └── auth.js          # JWT middleware
├── assets/
│   ├── css/
│   │   ├── style.css        # Main styles
│   │   └── auth.css         # Auth page styles
│   └── js/
│       ├── main.js          # Main JavaScript
│       ├── auth.js          # Auth functionality
│       └── dashboard.js     # Dashboard functionality
├── login.html               # Login/Register page
├── dashboard.html           # User dashboard
└── index.html              # Homepage
```

---

## 🚀 Deployment to Railway

### Step 1: Prepare for Production
1. Update `.env` with production values
2. Add `.env` to `.gitignore`
3. Commit all changes to Git

### Step 2: Deploy to Railway
1. Go to [Railway.app](https://railway.app/)
2. Sign up/Login with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select your PrepClan repository
5. Add environment variables in Railway dashboard
6. Railway will auto-deploy

### Step 3: Update Google OAuth
1. Add Railway domain to Google Console:
   - Authorized JavaScript origins: `https://your-app.railway.app`
   - Authorized redirect URIs: `https://your-app.railway.app/api/auth/google/callback`
2. Update `.env` on Railway with new callback URL

---

## ✅ Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] IP whitelisted
- [ ] Connection string copied
- [ ] Google Cloud project created
- [ ] OAuth consent screen configured
- [ ] OAuth credentials created
- [ ] `.env` file updated
- [ ] Server starts successfully
- [ ] Can register new user
- [ ] Can login with email/password
- [ ] Google OAuth works
- [ ] Dashboard displays user data

---

## 📞 Support

If you encounter any issues:
1. Check server console for error messages
2. Check browser console for frontend errors
3. Verify all environment variables are set correctly
4. Ensure MongoDB and Google OAuth are configured properly

---

**Your PrepClan backend is now ready! 🎉**
