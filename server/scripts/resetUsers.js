// server/scripts/resetUsers.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User'); // Adjust path as needed

// Load environment variables from .env file
dotenv.config({ path: '../.env' }); 

const resetUsers = async () => {
    console.log('Connecting to database...');
    try {
        const mongoURI = process.env.MONGO_URI;

        if (!mongoURI) {
            console.error('MONGO_URI not found in .env file. Please add it.');
            process.exit(1);
        }

        await mongoose.connect(mongoURI);
        console.log('Database connected successfully!');

        console.log('Deleting all users...');
        const result = await User.deleteMany({});
        console.log(`Successfully deleted ${result.deletedCount} users.`);

        console.log('User reset complete.');
    } catch (error) {
        console.error('An error occurred during user reset:', error.message);
    } finally {
        mongoose.disconnect();
        console.log('Disconnected from database.');
        process.exit();
    }
};

resetUsers();