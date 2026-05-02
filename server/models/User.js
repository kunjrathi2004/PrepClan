const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    password: {
        type: String,
        minlength: [6, 'Password must be at least 6 characters'],
        select: false,
    },
    dateOfBirth: {
        type: Date,
    },
    contactNumber: {
        type: String,
        trim: true,
    },
    googleId: {
        type: String,
        sparse: true,
    },
    authProvider: {
        type: String,
        enum: ['local', 'google'],
        default: 'local',
    },
    targetExam: {
        type: String,
        enum: ['CAT', 'XAT', 'SNAP', 'NMAT', 'IIFT', 'CMAT', 'Other'],
        default: 'CAT',
    },
    enrolledPlan: {
        type: String,
        enum: ['None', 'Basic', 'Standard', 'Premium'],
        default: 'None',
    },
    progress: {
        rcCompleted: { type: Number, default: 0 },
        dilrCompleted: { type: Number, default: 0 },
        qaCompleted: { type: Number, default: 0 },
        vaCompleted: { type: Number, default: 0 },
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    lastLogin: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Hash password before saving
userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    
    if (this.password) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
