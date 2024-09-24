
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

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor click behavior

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const offsetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 160; // Adjust 80 to your desired offset

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth' // Smooth scrolling
        });
    });
});