const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

app.use(express.json());

mongoose.connect('mongodb://localhost/fitness-tracker', {
    useNewUrlParser: true, useUnifiedTopology: true,
})
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error(err));

const User = require('./models/user');

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        if(!email || !password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }

        const User = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        const isPasswordMatch = await user.comparePassword(password);

        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({userId: user._id}, 'your-secret-key');

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while logging in the user.' });
    }
});

const port = 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));




 
