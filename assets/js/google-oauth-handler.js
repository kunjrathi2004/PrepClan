// Handle Google OAuth token from URL
(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (token) {
        console.log('Google OAuth token received, processing...');
        
        // Store token immediately
        localStorage.setItem('token', token);
        
        // Determine API URL based on environment
        const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
            ? 'http://localhost:5000/api'
            : `${window.location.origin}/api`;
        
        // Fetch user data
        fetch(`${API_URL}/auth/me`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                console.log('User data fetched successfully');
                localStorage.setItem('user', JSON.stringify(data.data));
                
                // Remove token from URL and reload
                const cleanUrl = window.location.origin + window.location.pathname;
                window.location.replace(cleanUrl);
            } else {
                console.error('Failed to get user data:', data.message);
                localStorage.removeItem('token');
                window.location.href = '/login.html';
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            localStorage.removeItem('token');
            window.location.href = '/login.html';
        });
        
        // Prevent other scripts from running while processing OAuth
        return true;
    }
    
    return false;
})();
