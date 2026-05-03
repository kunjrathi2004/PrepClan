// API Base URL - automatically detect environment
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? `http://localhost:5000/api`
    : `${window.location.origin}/api`;

// Get form elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const switchLink = document.getElementById('switch-link');
const switchText = document.getElementById('switch-text');
const authTitle = document.getElementById('auth-title');
const authSubtitle = document.getElementById('auth-subtitle');
const alertMessage = document.getElementById('alert-message');

// Toggle between login and register
let isLoginMode = true;

switchLink.addEventListener('click', (e) => {
    e.preventDefault();
    isLoginMode = !isLoginMode;

    if (isLoginMode) {
        // Show login form
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        authTitle.textContent = 'Welcome Back';
        authSubtitle.textContent = 'Login to continue your preparation journey';
        switchText.innerHTML = 'Don\'t have an account? <a href="#" id="switch-link">Sign up</a>';
    } else {
        // Show register form
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        authTitle.textContent = 'Create Account';
        authSubtitle.textContent = 'Start your preparation journey today';
        switchText.innerHTML = 'Already have an account? <a href="#" id="switch-link">Login</a>';
    }

    // Re-attach event listener to new switch link
    document.getElementById('switch-link').addEventListener('click', arguments.callee);
    hideAlert();
});

// Show alert message
function showAlert(message, type = 'error') {
    alertMessage.textContent = message;
    alertMessage.className = `alert alert-${type}`;
    alertMessage.style.display = 'block';

    // Auto hide after 5 seconds
    setTimeout(() => {
        hideAlert();
    }, 5000);
}

// Hide alert message
function hideAlert() {
    alertMessage.style.display = 'none';
}

// Show loading state
function showLoading(form, show = true) {
    const btn = form.querySelector('button[type="submit"]');
    const btnText = btn.querySelector('.btn-text');
    const btnLoader = btn.querySelector('.btn-loader');

    if (show) {
        btnText.style.display = 'none';
        btnLoader.style.display = 'flex';
        btn.disabled = true;
    } else {
        btnText.style.display = 'block';
        btnLoader.style.display = 'none';
        btn.disabled = false;
    }
}

// Handle Login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideAlert();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        showAlert('Please fill in all fields');
        return;
    }

    showLoading(loginForm);

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (data.success) {
            // Store token in localStorage
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('user', JSON.stringify(data.data));

            showAlert('Login successful! Redirecting...', 'success');

            // Redirect to dashboard after 1 second
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            showAlert(data.message || 'Login failed');
        }
    } catch (error) {
        console.error('Login error:', error);
        showAlert('Network error. Please check if the server is running.');
    } finally {
        showLoading(loginForm, false);
    }
});

// Handle Register
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideAlert();

    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const dateOfBirth = document.getElementById('register-dob').value;
    const contactNumber = document.getElementById('register-contact').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
        showAlert('Please fill in all required fields');
        return;
    }

    if (password !== confirmPassword) {
        showAlert('Passwords do not match');
        return;
    }

    if (password.length < 6) {
        showAlert('Password must be at least 6 characters');
        return;
    }

    showLoading(registerForm);

    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
                dateOfBirth,
                contactNumber,
            }),
        });

        const data = await response.json();

        if (data.success) {
            // Store token in localStorage
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('user', JSON.stringify(data.data));

            showAlert('Registration successful! Redirecting...', 'success');

            // Redirect to dashboard after 1 second
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            showAlert(data.message || 'Registration failed');
        }
    } catch (error) {
        console.error('Registration error:', error);
        showAlert('Network error. Please check if the server is running.');
    } finally {
        showLoading(registerForm, false);
    }
});

// Google OAuth Login
function loginWithGoogle() {
    window.location.href = `${API_URL}/auth/google`;
}

// Check if user is already logged in
function checkAuth() {
    const token = localStorage.getItem('token');
    if (token) {
        // Verify token with backend
        fetch(`${API_URL}/auth/me`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // User is authenticated, redirect to dashboard
                window.location.href = 'dashboard.html';
            } else {
                // Token is invalid, clear storage
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        })
        .catch(error => {
            console.error('Auth check error:', error);
        });
    }
}

// Check auth on page load
if (window.location.pathname.includes('login.html')) {
    checkAuth();
}

// Handle token from Google OAuth redirect
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');
if (token) {
    localStorage.setItem('token', token);
    
    // Fetch user data
    fetch(`${API_URL}/auth/me`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem('user', JSON.stringify(data.data));
            showAlert('Login successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        }
    })
    .catch(error => {
        console.error('Error fetching user data:', error);
    });
}
