// API Base URL
const API_URL = 'http://localhost:5000/api';

let currentUser = null;

// Get elements
const viewMode = document.getElementById('view-mode');
const editMode = document.getElementById('edit-mode');
const editBtn = document.getElementById('edit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const profileForm = document.getElementById('profile-form');
const profileAlert = document.getElementById('profile-alert');

// Load user profile
async function loadProfile() {
    const token = localStorage.getItem('token');
    
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch(`${API_URL}/auth/me`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (data.success) {
            currentUser = data.data;
            displayProfile(currentUser);
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = 'login.html';
        }
    } catch (error) {
        console.error('Error loading profile:', error);
        showAlert('Error loading profile', 'error');
    }
}

// Display profile in view mode
function displayProfile(user) {
    // Avatar initial
    document.getElementById('avatar-initial').textContent = user.name.charAt(0).toUpperCase();
    
    // Header
    document.getElementById('profile-name').textContent = user.name;
    document.getElementById('profile-email').textContent = user.email;
    
    // Details
    document.getElementById('view-name').textContent = user.name;
    document.getElementById('view-email').textContent = user.email;
    document.getElementById('view-contact').textContent = user.contactNumber || 'Not provided';
    document.getElementById('view-dob').textContent = user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'Not provided';
    document.getElementById('view-exam').textContent = user.targetExam || 'CAT';
    document.getElementById('view-plan').textContent = user.enrolledPlan || 'None';
    document.getElementById('view-created').textContent = new Date(user.createdAt).toLocaleDateString();
}

// Show edit mode
editBtn.addEventListener('click', () => {
    viewMode.style.display = 'none';
    editMode.style.display = 'block';
    
    // Populate form
    document.getElementById('edit-name').value = currentUser.name;
    document.getElementById('edit-email').value = currentUser.email;
    document.getElementById('edit-contact').value = currentUser.contactNumber || '';
    document.getElementById('edit-dob').value = currentUser.dateOfBirth ? new Date(currentUser.dateOfBirth).toISOString().split('T')[0] : '';
    document.getElementById('edit-exam').value = currentUser.targetExam || 'CAT';
});

// Cancel edit
cancelBtn.addEventListener('click', () => {
    editMode.style.display = 'none';
    viewMode.style.display = 'block';
    hideAlert();
});

// Save profile
profileForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideAlert();

    const token = localStorage.getItem('token');
    const formData = {
        name: document.getElementById('edit-name').value,
        contactNumber: document.getElementById('edit-contact').value,
        dateOfBirth: document.getElementById('edit-dob').value,
        targetExam: document.getElementById('edit-exam').value,
    };

    try {
        const response = await fetch(`${API_URL}/auth/update-profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (data.success) {
            currentUser = data.data;
            displayProfile(currentUser);
            editMode.style.display = 'none';
            viewMode.style.display = 'block';
            showAlert('Profile updated successfully!', 'success');
        } else {
            showAlert(data.message || 'Failed to update profile', 'error');
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        showAlert('Error updating profile', 'error');
    }
});

// Show alert
function showAlert(message, type = 'error') {
    profileAlert.textContent = message;
    profileAlert.className = `alert alert-${type}`;
    profileAlert.style.display = 'block';

    setTimeout(() => {
        hideAlert();
    }, 5000);
}

// Hide alert
function hideAlert() {
    profileAlert.style.display = 'none';
}

// Logout
document.getElementById('logout-btn').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
});

// Load profile on page load
loadProfile();
