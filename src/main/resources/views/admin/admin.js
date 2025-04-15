// admin.js
document.addEventListener('DOMContentLoaded', function() {
    // Sidebar toggle for mobile
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });

    // Number counting animation
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;

        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    };

    // Run animation when dashboard section is active
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.id === 'dashboard') {
                animateCounters();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(document.getElementById('dashboard'));

    // Tab switching functionality
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    const contentSections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Get target section ID from href
            const targetId = this.getAttribute('href').substring(1);

            // Update active state in sidebar
            document.querySelectorAll('.sidebar-nav li').forEach(li => {
                li.classList.remove('active');
            });
            this.parentElement.classList.add('active');

            // Show target section
            contentSections.forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(targetId).classList.add('active');

            // Close sidebar on mobile after selection
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }

            // Animate counters if dashboard is shown
            if (targetId === 'dashboard') {
                animateCounters();
            }
        });
    });

    // Form submissions
    document.getElementById('add-driver-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Driver added successfully!');
        this.reset();
    });

    document.getElementById('delete-driver-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Driver deleted successfully!');
        this.reset();
    });

    document.getElementById('add-bus-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Bus added successfully!');
        this.reset();
    });

    document.getElementById('add-route-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Route added successfully!');
        this.reset();
    });

    document.getElementById('add-admin-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Admin added successfully!');
        this.reset();
    });

    // Account approval functionality
    document.querySelectorAll('#pending-accounts .btn-success').forEach(btn => {
        btn.addEventListener('click', function() {
            const accountItem = this.closest('.account-item');
            alert('Account approved successfully!');
            accountItem.remove();
        });
    });

    document.querySelectorAll('#pending-accounts .btn-danger').forEach(btn => {
        btn.addEventListener('click', function() {
            const accountItem = this.closest('.account-item');
            alert('Account rejected successfully!');
            accountItem.remove();
        });
    });

    // Initialize with dashboard active
    document.getElementById('dashboard').classList.add('active');
});