
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
