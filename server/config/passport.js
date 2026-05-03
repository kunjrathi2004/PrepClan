const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback',
            proxy: true, // Trust Railway proxy
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log('Google OAuth callback received for:', profile.emails[0].value);
                
                // Check if user already exists
                let user = await User.findOne({ email: profile.emails[0].value });

                if (user) {
                    console.log('Existing user found:', user.email);
                    // User exists, update Google ID if not set
                    if (!user.googleId) {
                        user.googleId = profile.id;
                        await user.save();
                    }
                    return done(null, user);
                }

                console.log('Creating new user from Google OAuth');
                // Create new user
                user = await User.create({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    authProvider: 'google',
                    isVerified: true,
                });

                console.log('New user created:', user.email);
                done(null, user);
            } catch (error) {
                console.error('Google OAuth error:', error);
                done(error, null);
            }
        }
    )
);

module.exports = passport;
