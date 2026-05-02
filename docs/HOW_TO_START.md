# 🚀 How to Start PrepClan Properly

## ⚠️ IMPORTANT: You Need to Run the Node.js Server

Currently, you're using **Live Server (port 5500)** which is just serving static files.
For authentication to work, you need the **Node.js backend server (port 5000)**.

---

## 📋 Step-by-Step Instructions

### Step 1: Setup MongoDB (REQUIRED - First Time Only)

Follow **MONGODB_SETUP.md** to:
1. Create free MongoDB Atlas account
2. Get connection string
3. Update `.env` file

### Step 2: Start the Node.js Server

**Option A: Using Command Line**
```bash
cd d:\PrepClan
npm start
```

**Option B: Using Batch File (Windows)**
```bash
Double-click: start-server.bat
```

**Option C: Using VS Code Terminal**
1. Open Terminal in VS Code (Ctrl + `)
2. Run: `npm start`

### Step 3: Access the Website

Once server starts, you'll see:
```
✅ MongoDB Connected: cluster0.mongodb.net
🚀 Server running on port 5000
📱 Frontend: http://localhost:5000
🔧 API: http://localhost:5000/api
```

**Now open**: http://localhost:5000

---

## ❌ Common Mistakes

### Mistake 1: Using Live Server
- ❌ http://127.0.0.1:5500 (Live Server - NO BACKEND)
- ✅ http://localhost:5000 (Node.js Server - WITH BACKEND)

**Solution**: Stop Live Server, start Node.js server with `npm start`

### Mistake 2: MongoDB Not Configured
- Error: "MongoDB connection failed"
- **Solution**: Follow MONGODB_SETUP.md

### Mistake 3: Port Already in Use
- Error: "Port 5000 is already in use"
- **Solution**: 
  ```bash
  # Find process using port 5000
  netstat -ano | findstr :5000
  # Kill the process (replace PID)
  taskkill /PID <PID> /F
  ```

---

## ✅ Correct Workflow

1. **Setup MongoDB** (one-time)
2. **Start Node.js server**: `npm start`
3. **Open browser**: http://localhost:5000
4. **Register/Login**: Works! ✓
5. **Access protected pages**: Works! ✓

---

## 🔍 How to Know It's Working

### Server Running Correctly:
```
✅ MongoDB Connected: cluster0.mongodb.net
🚀 Server running on port 5000
```

### Browser:
- URL: http://localhost:5000 (NOT 5500)
- Can register new users
- Can login
- Dashboard shows user data

---

## 🛠️ VS Code Setup (Optional)

If you want to use VS Code's Run button:

1. Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Start PrepClan Server",
      "program": "${workspaceFolder}/server.js",
      "envFile": "${workspaceFolder}/.env"
    }
  ]
}
```

2. Press F5 to start server

---

## 📝 Quick Checklist

- [ ] MongoDB Atlas configured
- [ ] `.env` file updated with MongoDB URI
- [ ] Node.js server started (`npm start`)
- [ ] Browser open at http://localhost:5000 (NOT 5500)
- [ ] Live Server stopped/disabled
- [ ] Can see login page
- [ ] Can register new user
- [ ] Can login
- [ ] Dashboard loads after login

---

## 🎯 Summary

**Wrong**: Using Live Server on port 5500 → No backend, no authentication
**Right**: Using Node.js server on port 5000 → Full backend, authentication works

**To fix**: Stop Live Server, run `npm start`, open http://localhost:5000
