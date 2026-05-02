require('dotenv').config();
const mongoose = require('mongoose');

// Test MongoDB Connection
async function testConnection() {
    try {
        console.log('🔍 Testing MongoDB Connection...');
        console.log('📍 Connection String:', process.env.MONGODB_URI ? 'Found' : 'NOT FOUND');
        
        if (!process.env.MONGODB_URI) {
            console.error('❌ MONGODB_URI not found in .env file');
            console.log('\n📝 Please update your .env file with MongoDB connection string');
            process.exit(1);
        }

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected Successfully!');
        console.log('📊 Database:', mongoose.connection.name);
        console.log('🌐 Host:', mongoose.connection.host);

        // List all collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('\n📁 Collections in database:');
        if (collections.length === 0) {
            console.log('   (No collections yet - will be created when you register first user)');
        } else {
            collections.forEach(col => {
                console.log(`   - ${col.name}`);
            });
        }

        // Check if users collection exists
        const User = require('./server/models/User');
        const userCount = await User.countDocuments();
        console.log(`\n👥 Total Users: ${userCount}`);

        if (userCount > 0) {
            const users = await User.find().select('name email createdAt');
            console.log('\n📋 Registered Users:');
            users.forEach(user => {
                console.log(`   - ${user.name} (${user.email}) - Registered: ${user.createdAt.toLocaleDateString()}`);
            });
        } else {
            console.log('   (No users registered yet)');
        }

        console.log('\n✅ MongoDB is working correctly!');
        console.log('📝 Next step: Start server with "npm start" and register a user');
        
        await mongoose.connection.close();
        console.log('\n🔌 Connection closed');
        process.exit(0);

    } catch (error) {
        console.error('\n❌ MongoDB Connection Error:');
        console.error('Error:', error.message);
        
        if (error.message.includes('ENOTFOUND')) {
            console.log('\n💡 Solution:');
            console.log('1. Check your MongoDB connection string in .env file');
            console.log('2. Make sure you replaced <password> with your actual password');
            console.log('3. Verify your cluster URL is correct');
        } else if (error.message.includes('Authentication failed')) {
            console.log('\n💡 Solution:');
            console.log('1. Check username and password in connection string');
            console.log('2. Verify database user exists in MongoDB Atlas');
        } else if (error.message.includes('IP')) {
            console.log('\n💡 Solution:');
            console.log('1. Go to MongoDB Atlas → Network Access');
            console.log('2. Add IP Address: 0.0.0.0/0 (Allow from anywhere)');
        }
        
        process.exit(1);
    }
}

testConnection();
