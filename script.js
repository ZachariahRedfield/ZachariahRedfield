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

//Nav bar sticky toggle
const stickyNav = document.querySelector('.sticky-nav');

function updateStickyNav() {
    if (window.innerWidth <= 600) {
        stickyNav.style.position = 'static'; // Remove sticky behavior
    } else {
        stickyNav.style.position = 'sticky'; // Reapply sticky behavior
    }
}

// Call on load and on resize
window.addEventListener('load', updateStickyNav);
window.addEventListener('resize', updateStickyNav);

// Contact form submission with validation of information
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
        const response = await fetch('https://contact-app-ynnx.onrender.com/submit-form', { // Remove proxy for production
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
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
        } else {
            formMessage.textContent = "Server responded with an error: " + response.statusText;
            formMessage.style.color = "red";
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

