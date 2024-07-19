document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar");
    const toggleMenu = document.querySelector(".toggle-menu");
    const navList = document.querySelector(".nav-list");

    // Toggle menu on small screens
    if (toggleMenu) {
        toggleMenu.addEventListener("click", function () {
            navList.classList.toggle("active");
        });
    }

    // Change navbar background on scroll
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
});
// Smooth scroll behavior for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
            });
        }
    });
});
// JavaScript to change background color on scroll
document.addEventListener("scroll", function () {
    // Calculate the scroll percentage
    const scrollPercent = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);

    // Adjust the hue value based on scroll percentage (0 to 360 for HSL)
    const hue = scrollPercent * 360;

    // Set the background color using HSL with changing hue and fixed saturation and lightness
    document.body.style.backgroundColor = `hsl(${hue}, 50%, 50%)`;
});


