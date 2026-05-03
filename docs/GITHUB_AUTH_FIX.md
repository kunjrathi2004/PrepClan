# Fix GitHub Push Permission Error

## Problem
```
remote: Permission to kunjrathi1208/PrepClan.git denied to kunjrathi2004.
fatal: unable to access 'https://github.com/kunjrathi1208/PrepClan.git/': The requested URL returned error: 403
```

## Solution Options

### Option 1: Use Personal Access Token (Recommended)

#### Step 1: Create Personal Access Token
1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: "PrepClan Deployment"
4. Select scopes: Check **repo** (full control of private repositories)
5. Click "Generate token"
6. **COPY THE TOKEN** (you won't see it again!)

#### Step 2: Update Remote URL with Token
```bash
git remote remove origin
git remote add origin https://YOUR_TOKEN@github.com/kunjrathi1208/PrepClan.git
git push -u origin main
```

Replace `YOUR_TOKEN` with the token you copied.

### Option 2: Use GitHub CLI (Easiest)

#### Step 1: Install GitHub CLI
Download from: https://cli.github.com/

#### Step 2: Authenticate
```bash
gh auth login
```
Follow the prompts to authenticate.

#### Step 3: Push Code
```bash
git push -u origin main
```

### Option 3: Use Correct GitHub Account

If the repository should be under `kunjrathi2004`:

#### Step 1: Create Repository Under Correct Account
1. Login to GitHub as `kunjrathi2004`
2. Create new repository: https://github.com/new
3. Name it: `PrepClan`

#### Step 2: Update Remote URL
```bash
git remote remove origin
git remote add origin https://github.com/kunjrathi2004/PrepClan.git
git push -u origin main
```

### Option 4: Clear Cached Credentials

#### For Windows:
```bash
# Open Credential Manager
# Control Panel → User Accounts → Credential Manager → Windows Credentials
# Remove any GitHub credentials
# Then try pushing again - it will ask for credentials
git push -u origin main
```

Or use command:
```bash
git credential-cache exit
git push -u origin main
```

## Quick Fix Command

Run this to use token authentication:
```bash
git remote set-url origin https://YOUR_GITHUB_TOKEN@github.com/kunjrathi1208/PrepClan.git
git push -u origin main
```

## Verify Remote URL
```bash
git remote -v
```

Should show:
```
origin  https://github.com/kunjrathi1208/PrepClan.git (fetch)
origin  https://github.com/kunjrathi1208/PrepClan.git (push)
```

## After Successful Push

Once pushed, you can proceed with Railway deployment!
