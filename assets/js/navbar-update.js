// Update navbar based on login status and redirect if needed
(function() {
    const token = localStorage.getItem('token');
    const isLoggedIn = !!token;
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // If logged in and on home page, redirect to dashboard
    if (isLoggedIn && (currentPage === 'index.html' || currentPage === '')) {
        window.location.href = '/dashboard.html';
        return;
    }
    
    // Get all nav links
    const navLinks = document.querySelector('.nav-links');
    
    if (navLinks && isLoggedIn) {
        // User is logged in - show dashboard, profile, logout
        const loginBtn = navLinks.querySelector('.login-btn');
        if (loginBtn) {
            loginBtn.remove();
        }
        
        // Check if dashboard link exists
        const hasDashboard = Array.from(navLinks.querySelectorAll('a')).some(a => a.href.includes('dashboard.html'));
        const hasProfile = Array.from(navLinks.querySelectorAll('a')).some(a => a.href.includes('profile.html'));
        const hasLogout = Array.from(navLinks.querySelectorAll('a')).some(a => a.id === 'logout-btn' || a.id === 'logout-btn-dynamic');
        
        if (!hasDashboard) {
            const dashboardLi = document.createElement('li');
            dashboardLi.innerHTML = '<a href="/dashboard.html">Dashboard</a>';
            navLinks.insertBefore(dashboardLi, navLinks.children[1]);
        }
        
        if (!hasProfile) {
            const profileLi = document.createElement('li');
            profileLi.innerHTML = '<a href="/profile.html">Profile</a>';
            navLinks.appendChild(profileLi);
        }
        
        if (!hasLogout) {
            const logoutLi = document.createElement('li');
            logoutLi.innerHTML = '<a href="#" id="logout-btn-dynamic">Logout</a>';
            navLinks.appendChild(logoutLi);
            
            // Add logout handler
            document.getElementById('logout-btn-dynamic').addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login.html';
            });
        }
    }
})();
