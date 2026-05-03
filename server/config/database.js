const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Check if MongoDB URI is configured
        if (!process.env.MONGODB_URI) {
            console.log('⚠️  WARNING: MongoDB not configured!');
            console.log('📝 Please set MONGODB_URI environment variable');
            console.log('📖 Read: MONGODB_ATLAS_SETUP.md for detailed instructions');
            console.log('⏭️  Server will continue without database (registration won\'t work)');
            return;
        }

        // Set mongoose options for better connection handling
        mongoose.set('strictQuery', false);
        
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
        });
        
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`📊 Database: ${conn.connection.name}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        console.log('');
        console.log('💡 Common Issues:');
        console.log('   1. Check MONGODB_URI is correct');
        console.log('   2. Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0');
        console.log('   3. Check database user credentials');
        console.log('   4. Ensure password is URL-encoded');
        console.log('');
        console.log('⏭️  Server will continue without database');
        // Don't exit process, let server run for debugging
    }
};

module.exports = connectDB;
