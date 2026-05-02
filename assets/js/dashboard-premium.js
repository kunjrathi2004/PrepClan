// API Base URL
const API_URL = 'http://localhost:5000/api';

// Check if we're processing OAuth token
const urlParams = new URLSearchParams(window.location.search);
const hasOAuthToken = urlParams.get('token');

// Don't run auth check if we're processing OAuth token
if (!hasOAuthToken) {
    checkAuth();
}

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
    .then(response => {
        if (!response.ok) {
            throw new Error('Auth failed');
        }
        return response.json();
    })
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
        // Only show alert if not processing OAuth
        if (!hasOAuthToken) {
            alert('Error connecting to server. Please try again.');
        }
    });
}

// Display user data with animations
function displayUserData(user) {
    // Update name
    document.getElementById('user-name').textContent = user.name;
    document.getElementById('user-exam').textContent = user.targetExam || 'CAT 2026';
    document.getElementById('user-plan').textContent = user.enrolledPlan || 'None';

    // Calculate progress
    const progress = user.progress || {
        rcCompleted: 0,
        dilrCompleted: 0,
        qaCompleted: 0,
        vaCompleted: 0
    };

    // Total completed
    const totalCompleted = progress.rcCompleted + progress.dilrCompleted + 
                          progress.qaCompleted + progress.vaCompleted;
    document.getElementById('total-completed').textContent = totalCompleted;

    // Mock streak (you can implement real streak tracking later)
    document.getElementById('streak-days').textContent = totalCompleted > 0 ? Math.min(totalCompleted, 30) : 0;

    // Update progress bars with animation
    updateProgressBar('rc', progress.rcCompleted, 100); // Assuming 100 sets as target
    updateProgressBar('dilr', progress.dilrCompleted, 100);
    updateProgressBar('qa', progress.qaCompleted, 500); // Assuming 500 questions as target
    updateProgressBar('va', progress.vaCompleted, 500);
}

// Update progress bar with animation
function updateProgressBar(type, completed, target) {
    const percentage = Math.min((completed / target) * 100, 100);
    
    // Update progress value
    document.getElementById(`${type}-progress`).textContent = completed;
    
    // Update percentage
    document.getElementById(`${type}-percent`).textContent = Math.round(percentage) + '%';
    
    // Animate progress bar
    setTimeout(() => {
        document.getElementById(`${type}-bar`).style.width = percentage + '%';
    }, 100);
}

// Logout functionality
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
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
}
