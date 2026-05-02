const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Check if MongoDB URI is configured
        if (!process.env.MONGODB_URI || process.env.MONGODB_URI.includes('cluster0.mongodb.net')) {
            console.log('⚠️  WARNING: MongoDB not configured!');
            console.log('📝 Please follow these steps:');
            console.log('   1. Go to: https://www.mongodb.com/cloud/atlas/register');
            console.log('   2. Create FREE account (M0 tier)');
            console.log('   3. Create database user');
            console.log('   4. Get connection string');
            console.log('   5. Update .env file with YOUR connection string');
            console.log('');
            console.log('📖 Read: MONGODB_ATLAS_SETUP.md for detailed instructions');
            console.log('');
            console.log('⏭️  Server will continue without database (registration won\'t work)');
            return;
        }

        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Error: ${error.message}`);
        console.log('');
        console.log('💡 Quick Fix:');
        console.log('   1. Open: MONGODB_ATLAS_SETUP.md');
        console.log('   2. Follow the 2-minute setup');
        console.log('   3. Update .env with your connection string');
        console.log('   4. Restart server');
        console.log('');
        console.log('⏭️  Server will continue without database');
    }
};

module.exports = connectDB;
