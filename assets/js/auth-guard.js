// Auth Protection - Add this to pages that require login
(function() {
    const publicPages = ['index.html', 'about.html', 'contact.html', 'login.html', ''];
    const currentPage = window.location.pathname.split('/').pop();
    
    // Check if current page requires authentication
    const requiresAuth = !publicPages.includes(currentPage);
    
    if (requiresAuth) {
        const token = localStorage.getItem('token');
        
        if (!token) {
            // No token, redirect to login
            window.location.href = '/login.html';
        } else {
            // Verify token with backend (optional - can be removed for better performance)
            fetch('http://localhost:5000/api/auth/me', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then(response => response.json())
            .then(data => {
                if (!data.success) {
                    // Token invalid, clear and redirect
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '/login.html';
                }
            })
            .catch(error => {
                console.error('Auth verification error:', error);
                // On error, still allow access (don't redirect)
            });
        }
    }
})();
