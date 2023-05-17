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

 app.post('/api/signup', async (req, res) => {
    const { email, password, name, age, weight, height } = req.body;

    try {
        if (!email || !password || !name || !age || !weight || !height) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }   

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }   

        const newUser  = new User({ email, password, name, age, weight, height });
        await newUser.save();

        res.json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while registering the user.' });
    }
});

const port = 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));    

