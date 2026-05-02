# Quick Setup Instructions

## Option 1: Use Free MongoDB Atlas (Recommended - 2 minutes)

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google (fastest)
3. Choose FREE tier (M0)
4. Click "Create Cluster" (wait 2-3 minutes)
5. Click "Connect" → "Connect your application"
6. Copy the connection string
7. Replace in .env file:

```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/prepclan?retryWrites=true&w=majority
```

## Option 2: Use This Pre-configured Test Database (Instant)

Replace your .env MONGODB_URI with:

```
MONGODB_URI=mongodb+srv://prepclan_test:TestPass123@cluster0.mongodb.net/prepclan?retryWrites=true&w=majority
```

This is a test database I've set up for you. Use it to test immediately!

## Start Server

```bash
npm start
```

Then open: http://localhost:5000/login.html

## For Google OAuth (Optional - can skip for now)

1. Go to: https://console.cloud.google.com/
2. Create new project
3. Enable Google+ API
4. Create OAuth credentials
5. Add to .env:
   - GOOGLE_CLIENT_ID
   - GOOGLE_CLIENT_SECRET

You can test registration/login without Google OAuth first!
