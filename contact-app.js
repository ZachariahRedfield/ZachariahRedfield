//contact-app.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet()); //Security 

//MongoDB connection 
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err));

//Define a schema and model for the contact form
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
});

const Contact = mongoose.model('Contact', contactSchema);

//Handle POST request from the contact form
app.post('/submit-form', async (req, res) => {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    try {
        const newContact = new Contact({ name, email, message });
        await newContact.save();

        res.json({ success: true, message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ sucess: false, message: 'Something went wrong.' });
    }
});

//Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

