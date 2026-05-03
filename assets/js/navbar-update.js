// Update navbar based on login status
(function() {
    const token = localStorage.getItem('token');
    const isLoggedIn = !!token;
    const navLinks = document.querySelector('.nav-links');
    
    if (!navLinks) return;
    
    // Clear all existing nav items
    navLinks.innerHTML = '';
    
    // Determine base path (for programs.html which is in root)
    const isInSubfolder = window.location.pathname.includes('/pages/');
    const basePath = isInSubfolder ? '../' : '';
    
    // Common links for all users
    const homeLink = `<li><a href="${basePath}index.html">Home</a></li>`;
    const programsLink = `<li><a href="${basePath}programs.html">Programs</a></li>`;
    const aboutLink = `<li><a href="${basePath}about.html">About Us</a></li>`;
    const contactLink = `<li><a href="${basePath}contact.html">Contact</a></li>`;
    
    if (isLoggedIn) {
        // Logged-in navbar: Home, Programs, Dashboard, Profile, Logout
        navLinks.innerHTML = `
            ${homeLink}
            ${programsLink}
            <li><a href="${basePath}dashboard.html">Dashboard</a></li>
            <li><a href="${basePath}profile.html">Profile</a></li>
            <li><a href="#" id="logout-btn-dynamic">Logout</a></li>
        `;
        
        // Add logout handler
        const logoutBtn = document.getElementById('logout-btn-dynamic');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = basePath + 'login.html';
            });
        }
    } else {
        // Logged-out navbar: Home, Programs, About Us, Contact, Login
        navLinks.innerHTML = `
            ${homeLink}
            ${programsLink}
            ${aboutLink}
            ${contactLink}
            <li><a href="${basePath}login.html" class="login-btn">Login</a></li>
        `;
    }
})();
