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
        
        // Connection options
        const options = {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        };
        
        console.log('🔄 Connecting to MongoDB...');
        const conn = await mongoose.connect(process.env.MONGODB_URI, options);
        
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`📊 Database: ${conn.connection.name}`);
        
        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err.message);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('⚠️  MongoDB disconnected');
        });
        
        mongoose.connection.on('reconnected', () => {
            console.log('✅ MongoDB reconnected');
        });
        
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
