// Additional mobile menu fixes and enhancements

document.addEventListener('DOMContentLoaded', function() {
    // Ensure proper handling of menu on different screen sizes
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Fix for menu visibility on orientation change
    window.addEventListener('resize', function() {
        // Reset menu state on screen size change
        if (window.innerWidth > 768) {
            navLinks.classList.remove('show');
            if (menuToggle.querySelector('i').classList.contains('fa-times')) {
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
        }
    });
    
    // Prevent body scrolling when menu is open
    menuToggle.addEventListener('click', function() {
        if (navLinks.classList.contains('show')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Add active class to current page link
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
    });
    
    // Close menu when clicking a link (additional handler)
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
            document.body.style.overflow = '';
        }
    });
}); 