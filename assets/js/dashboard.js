// API Base URL
const API_URL = 'http://localhost:5000/api';

// Check authentication
function checkAuth() {
    const token = localStorage.getItem('token');
    
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    // Verify token and get user data
    fetch(`${API_URL}/auth/me`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            displayUserData(data.data);
        } else {
            // Token is invalid
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = 'login.html';
        }
    })
    .catch(error => {
        console.error('Auth check error:', error);
        alert('Error connecting to server. Please try again.');
    });
}

// Display user data
function displayUserData(user) {
    document.getElementById('user-name').textContent = user.name;
    document.getElementById('user-exam').textContent = user.targetExam || 'CAT 2026';
    document.getElementById('user-plan').textContent = user.enrolledPlan || 'None';

    // Display progress
    if (user.progress) {
        document.getElementById('rc-progress').textContent = user.progress.rcCompleted || 0;
        document.getElementById('dilr-progress').textContent = user.progress.dilrCompleted || 0;
        document.getElementById('qa-progress').textContent = user.progress.qaCompleted || 0;
        document.getElementById('va-progress').textContent = user.progress.vaCompleted || 0;
    }
}

// Logout functionality
document.getElementById('logout-btn').addEventListener('click', (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');
    
    // Call logout API
    fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    .then(() => {
        // Clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Redirect to login
        window.location.href = 'login.html';
    })
    .catch(error => {
        console.error('Logout error:', error);
        // Still clear local storage and redirect
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    });
});

// Check auth on page load
checkAuth();
