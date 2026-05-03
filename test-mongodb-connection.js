// Test MongoDB Connection for Railway Deployment
// This helps diagnose connection issues

require('dotenv').config();
const mongoose = require('mongoose');

console.log('=== MongoDB Connection Test ===\n');

// Check if MONGODB_URI exists
if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI is not set!');
    console.log('Set it in Railway Variables or .env file');
    process.exit(1);
}

// Show URI format (hide password)
const uri = process.env.MONGODB_URI;
const hiddenUri = uri.replace(/:[^:@]+@/, ':****@');
console.log('📝 MongoDB URI format:', hiddenUri);
console.log('');

// Validate URI format
if (!uri.startsWith('mongodb+srv://') && !uri.startsWith('mongodb://')) {
    console.error('❌ Invalid URI format!');
    console.log('Should start with: mongodb+srv:// or mongodb://');
    process.exit(1);
}

if (!uri.includes('@')) {
    console.error('❌ URI missing credentials!');
    console.log('Format: mongodb+srv://username:password@cluster...');
    process.exit(1);
}

console.log('✅ URI format looks correct');
console.log('');

// Test connection
console.log('🔄 Attempting to connect...');
console.log('');

mongoose.set('strictQuery', false);

mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
})
.then((conn) => {
    console.log('✅ SUCCESS! MongoDB Connected');
    console.log('📊 Host:', conn.connection.host);
    console.log('📊 Database:', conn.connection.name);
    console.log('📊 Port:', conn.connection.port);
    console.log('');
    console.log('🎉 Your MongoDB connection is working!');
    process.exit(0);
})
.catch((error) => {
    console.error('❌ CONNECTION FAILED!');
    console.error('');
    console.error('Error:', error.message);
    console.error('');
    
    if (error.message.includes('ETIMEDOUT') || error.message.includes('timed out')) {
        console.log('💡 Timeout Error - Possible causes:');
        console.log('   1. MongoDB Atlas IP whitelist missing 0.0.0.0/0');
        console.log('   2. Cluster is paused (free tier pauses after inactivity)');
        console.log('   3. Wrong cluster URL');
        console.log('');
        console.log('🔧 Fix:');
        console.log('   1. Go to https://cloud.mongodb.com');
        console.log('   2. Network Access → Add 0.0.0.0/0');
        console.log('   3. Check cluster is not paused');
    } else if (error.message.includes('Authentication failed') || error.message.includes('bad auth')) {
        console.log('💡 Authentication Error - Possible causes:');
        console.log('   1. Wrong username or password');
        console.log('   2. Password has special characters not URL-encoded');
        console.log('   3. Database user doesn\'t exist');
        console.log('');
        console.log('🔧 Fix:');
        console.log('   1. Go to MongoDB Atlas → Database Access');
        console.log('   2. Verify user exists');
        console.log('   3. Reset password (use simple password without special chars)');
        console.log('   4. Update MONGODB_URI with new password');
    } else {
        console.log('💡 Check:');
        console.log('   1. MONGODB_URI format is correct');
        console.log('   2. Cluster URL is correct');
        console.log('   3. Database name is included in URI');
    }
    
    process.exit(1);
});

// Timeout after 15 seconds
setTimeout(() => {
    console.error('❌ Connection attempt timed out after 15 seconds');
    console.log('');
    console.log('💡 This usually means:');
    console.log('   - MongoDB Atlas IP whitelist doesn\'t include Railway IPs');
    console.log('   - Add 0.0.0.0/0 to Network Access in MongoDB Atlas');
    process.exit(1);
}, 15000);
