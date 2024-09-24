
//Dark Mode Toggle Box Functionality
const toggleCheckbox = document.getElementById('theme-toggle');
const themeLabel = document.getElementById('theme-label');

toggleCheckbox.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode', toggleCheckbox.checked);

    // Change the label to indicate the current theme
    themeLabel.textContent = toggleCheckbox.checked ? '🌞' : '🌙'; // Change to sun emoji when in dark mode
});
