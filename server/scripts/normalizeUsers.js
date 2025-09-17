// server/scripts/normalizeUsers.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function run() {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/employee-management';
    await mongoose.connect(mongoURI);

    const defaultPassword = process.env.NORMALIZE_DEFAULT_PASSWORD || 'ChangeMe123!';
    const shouldResetPasswords = (process.env.NORMALIZE_RESET_PASSWORDS || 'true').toLowerCase() === 'true';

    const users = await User.find({});
    let updated = 0;

    for (const user of users) {
        let changed = false;

        // Normalize fields
        const normalizedEmail = (user.email || '').trim().toLowerCase();
        if (user.email !== normalizedEmail) {
            user.email = normalizedEmail;
            changed = true;
        }

        const normalizedName = (user.name || '').trim();
        if (user.name !== normalizedName) {
            user.name = normalizedName;
            changed = true;
        }

        if (shouldResetPasswords) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(defaultPassword, salt);
            changed = true;
        }

        if (changed) {
            await user.save();
            updated += 1;
        }
    }

    console.log(`Normalized users: ${updated}/${users.length}`);
    console.log(`Passwords reset: ${shouldResetPasswords ? 'yes' : 'no'} (default=${defaultPassword})`);
    await mongoose.disconnect();
}

run().catch(err => {
    console.error(err);
    process.exit(1);
});


