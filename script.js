document.addEventListener('DOMContentLoaded', () => {

    // --- Element Selections ---
    const header = document.getElementById('main-header');
    const logo = document.getElementById('logo');
    const menuIndicator = document.getElementById('menu-indicator');
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('main section');



    // --- 2. Active Menu Indicator Logic ---

    // Function to update the indicator's position and size
    const updateMenuIndicator = (activeLink) => {
    if (!activeLink) return;

    // We still need to calculate the horizontal position (left) and width.
    const linkRect = activeLink.getBoundingClientRect();
    const navRect = activeLink.closest('nav').getBoundingClientRect();
    
    const left = linkRect.left - navRect.left;

    // Only set the width and left position. Height and vertical position are now handled by CSS.
    menuIndicator.style.width = `${linkRect.width}px`;
    menuIndicator.style.left = `${left}px`;
};

    // Use Intersection Observer to detect which section is in view
    const observerOptions = {
        root: null, // observes intersections relative to the viewport
        rootMargin: `-${header.offsetHeight}px 0px -50% 0px`, // Adjust trigger point
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
                updateMenuIndicator(activeLink);
            }
        });
    }, observerOptions);

    // Observe each section
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Initial State ---
    // Set the indicator to the first menu item on page load
    // We use a small timeout to ensure all styles are loaded and calculated correctly.
    setTimeout(() => {
        const firstLink = navLinks[0];
        updateMenuIndicator(firstLink);
    }, 100);

    // Re-calculate on window resize to keep it accurate
    window.addEventListener('resize', () => {
        const activeSection = [...sections].find(section => {
           const link = document.querySelector(`nav a[href="#${section.id}"]`);
           // a bit of a hacky way to find the current active link
           return menuIndicator.style.left === `${link.offsetLeft}px`;
        });
        const activeLink = document.querySelector(`nav a[href="#${activeSection ? activeSection.id : 'wandern'}"]`)
        updateMenuIndicator(activeLink);
    });
});