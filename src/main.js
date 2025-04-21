const textInput = document.getElementById('text');
const animationInput = document.getElementById('animation-time');
const sizeInput = document.getElementById('text-size');
const colorInput = document.getElementById('text-color');

const scrollTimeDisplay = document.getElementById('scroll-time-display');
const banner = document.getElementById('banner');

// Update text content in all paragraphs
function updateText(value) {
    const paragraphs = document.querySelectorAll('.scroll > div > p');
    paragraphs.forEach(p => p.textContent = value);
}

// Update scroll speed display and CSS variable
function updateAnimationTime(value) {
    scrollTimeDisplay.textContent = value;
    banner.style.setProperty('--scroll-speed', `${value}s`);
}

// Update scroll size CSS variable
function updateTextSize(value) {
    banner.style.setProperty('--scroll-size', `${value}vw`);
}

// Update text color variable
function updateTextColor(value) {
    banner.style.setProperty('--scroll-color', `${value}`);
}

// Event listeners
textInput.addEventListener('input', function () {
    updateText(this.value);
});

animationInput.addEventListener('input', function () {
    updateAnimationTime(this.value);
});

sizeInput.addEventListener('input', function () {
    updateTextSize(this.value);
});

colorInput.addEventListener('input', function () {
    updateTextColor(this.value);
});

// Orientation handler
function handleOrientationChange() {
    const isLandscape = window.innerWidth > window.innerHeight;
    document.body.classList.toggle('fullscreen', isLandscape);
    if(isLandscape)
    {
        window.scrollTo(0, 1);
    }
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', function () {
    updateText(textInput.value);
    updateAnimationTime(animationInput.value);
    updateTextSize(sizeInput.value);
    updateTextColor(colorInput.value);
    handleOrientationChange();
});

// Handle orientation changes
window.addEventListener('resize', handleOrientationChange);
window.addEventListener('orientationchange', handleOrientationChange);