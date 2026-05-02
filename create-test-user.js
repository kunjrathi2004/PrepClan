require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./server/models/User');

async function createTestUser() {
    try {
        console.log('🔍 Testing User Registration...\n');

        // Check MongoDB URI
        if (!process.env.MONGODB_URI) {
            console.error('❌ MONGODB_URI not found in .env file');
            process.exit(1);
        }

        console.log('📡 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected!\n');

        // Test user data
        const testUserData = {
            name: 'Test User',
            email: 'test@prepclan.com',
            password: 'test123',
            dateOfBirth: new Date('2000-01-01'),
            contactNumber: '+91-9876543210',
            authProvider: 'local'
        };

        console.log('👤 Creating test user with data:');
        console.log(JSON.stringify(testUserData, null, 2));
        console.log('');

        // Check if user already exists
        const existingUser = await User.findOne({ email: testUserData.email });
        if (existingUser) {
            console.log('⚠️  User already exists! Deleting old user...');
            await User.deleteOne({ email: testUserData.email });
            console.log('✅ Old user deleted\n');
        }

        // Create user
        console.log('📝 Creating new user...');
        const user = await User.create(testUserData);

        console.log('✅ User created successfully!\n');
        console.log('📋 User Details:');
        console.log('   ID:', user._id);
        console.log('   Name:', user.name);
        console.log('   Email:', user.email);
        console.log('   Contact:', user.contactNumber);
        console.log('   Created:', user.createdAt);
        console.log('');

        // Verify user in database
        const verifyUser = await User.findById(user._id);
        if (verifyUser) {
            console.log('✅ User verified in database!');
            console.log('');
            console.log('🎉 SUCCESS! User registration is working!');
            console.log('');
            console.log('📝 You can now login with:');
            console.log('   Email: test@prepclan.com');
            console.log('   Password: test123');
        }

        await mongoose.connection.close();
        console.log('\n🔌 Connection closed');
        process.exit(0);

    } catch (error) {
        console.error('\n❌ Error creating user:');
        console.error('Error Type:', error.name);
        console.error('Error Message:', error.message);
        
        if (error.errors) {
            console.error('\nValidation Errors:');
            Object.keys(error.errors).forEach(key => {
                console.error(`  - ${key}: ${error.errors[key].message}`);
            });
        }

        if (error.code === 11000) {
            console.error('\n💡 Duplicate key error - user already exists');
        }

        console.error('\n📚 Full Error:', error);
        
        await mongoose.connection.close();
        process.exit(1);
    }
}

createTestUser();
