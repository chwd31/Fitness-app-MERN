const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

mongoose.connect('mongodb://localhost/fitness-tracker', {
    useNewUrlParser: true, useUnifiedTopology: true,
})
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error(err));

const User = require('./models/user');

app.get('/api/profile', async (req, res) => {
    const UserId = req.user.userId;

    try {
        const userProfile = await User.findById(UserId);

        if (!userProfile) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(userProfile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching the user profile.' });
    }
});

app.put('/api/profile', async (req, res) => {
    const UserId = req.user.userId;
    const { name, age, weight, height } = req.body;

    try {
        const userProfile = await User.findById(UserId);

        if (!userProfile) {
            return res.status(404).json({ message: 'User not found' });
        }

        userProfile.name = name;
        userProfile.age = age;
        userProfile.weight = weight;
        userProfile.height = height;

        await userProfile.save();

        res.json(userProfile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating the user profile.' });
    }
});

