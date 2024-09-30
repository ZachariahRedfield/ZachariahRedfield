require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();

// CORS configuration
app.use(cors({
    origin: 'https://zachariahredfield.github.io' // Adjust to your front-end URL
}));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet()); // Security middleware

// MongoDB connection 
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err));

// Define a schema and model for the contact form
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// Handle POST request from the contact form
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
        console.error('Error saving contact:', error); // Log the error
        res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
});

// Add this route to check the IP address
app.get('/ip', (req, res) => {
    console.log('Incoming request IP:', req.ip);
    res.send(`Your IP is ${req.ip}`);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Back to Top Button Functionality
const backToTopButton = document.getElementById('backToTop');

// Show button when scrolled down 200px from the top of the document
window.onscroll = function () {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
};

// Scroll to the top of the document when the button is clicked
backToTopButton.onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};
