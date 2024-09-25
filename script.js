//script.js

//Dark Mode Toggle Box Functionality
const toggleCheckbox = document.getElementById('theme-toggle');
const themeLabel = document.getElementById('theme-label');

function applyTheme(isDarkMode) {
    document.body.classList.toggle('dark-mode', isDarkMode);

    toggleCheckbox.checked = isDarkMode// Sync the checkbox state
    themeLabel.textContent = toggleCheckbox.checked ? '🌞' : '🌙'; // Update icon
}

// On page load, check localStorage and apply the theme
window.addEventListener('DOMContentLoaded', () => {
    const isDarkMode = localStorage.getItem('dark-mode') === 'true'; // Get the preference
    applyTheme(isDarkMode); // Apply the theme based on preference
});

// Event listener for the theme toggle
toggleCheckbox.addEventListener('change', () => {
    const isDarkMode = toggleCheckbox.checked;
    applyTheme(isDarkMode); // Apply the selected theme
    localStorage.setItem('dark-mode', isDarkMode); // Save preference to localStorage
});

// Nav bar scroll adjustment
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor click behavior

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const offsetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 120; // Adjust 80 to your desired offset

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth' // Smooth scrolling
        });
    });
});

// Contact form submission approve or deny W/ validation of information
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent the form from submitting normally

    // Simple validation
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const formMessage = document.getElementById("form-message");

    // Clear previous messages
    formMessage.textContent = "";

    if (!name || !email || !message) {
        formMessage.textContent = "All fields are required.";
        formMessage.style.color = "red";
        return;
    }

    if (!validateEmail(email)) {
        formMessage.textContent = "Please enter a valid email address.";
        formMessage.style.color = "red";
        return;
    }

    const data = {
        name: name,
        email: email,
        message: message
    };

    try {
        const response = await fetch('/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (result.success) {
            formMessage.textContent = "Your message has been sent successfully!";
            formMessage.style.color = "green";
            alert('Form submitted successfully!');
        } else {
            formMessage.textContent = "There was an error submitting the form.";
            formMessage.style.color = "red";
            alert('There was an error submitting the form.');
        }
    } catch (error) {
        formMessage.textContent = "There was a problem connecting to the server.";
        formMessage.style.color = "red";
        console.error('Error:', error);
    }

    // Reset the form after submission
    contactForm.reset();
});

// Function to validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
