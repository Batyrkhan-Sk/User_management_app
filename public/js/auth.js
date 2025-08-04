async function handleSignIn() {
    const email = document.getElementById('signin-email').value.trim();
    const password = document.getElementById('signin-password').value;
    
    if (!email || !password) {
        showMessage('Login', 'Please fill in all fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showMessage('Error', 'Please enter a valid email address.', 'error');
        return;
    }
    
    try {
        const response = await fetch('https://user-management-backend-3n4t.onrender.com/api/auth/login', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

    if (response.ok) {
        localStorage.setItem('token', result.token);

        window.location.href = 'dashboard.html';
    } else {
        showMessage('Login Failed', result.message || 'Login failed.', 'error');
    }
    } catch (error) {
        console.error('Login error:', error);
        showMessage('Error', 'An error occurred during login.', 'error');
    }

}

async function handleSignUp() {
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    
    if (!name || !email || !password) {
        showMessage('Signup', 'Please fill in all fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showMessage('Error', 'Please enter a valid email address.', 'error');
        return;
    }
    
    if (!isValidPassword(password)) {
        showMessage('Error', 'Password must be at least 1 character long.', 'error');
        return;
    }
    
    try {
        const response = await fetch('https://user-management-backend-3n4t.onrender.com/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });
        
        const result = await response.json();
        
        if (response.ok) {
            showMessage('Success', 'Sign-up successful!', 'success');
            renderSignInForm();
        } else {
            showMessage('Signup Failed', result.message || 'Sign-up failed.', 'error');
        }
    } catch (error) {
        console.error('Sign-up error:', error);
        showMessage('Error', 'An error occurred during sign-up.', 'error');
    }
}

async function handleLogout() {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch('https://user-management-backend-3n4t.onrender.com/api/auth/logout', { 
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, 
            },
        });

        if (response.ok) {
            localStorage.removeItem('token');

            window.location.href = 'index.html';
        } else {
            const result = await response.json();
            showMessage('Logout Failed', result.message || 'Unable to logout.', 'error');
        }
    } catch (error) {
        console.error('Logout error:', error);
        showMessage('Error', 'An error occurred during logout.', 'error');
    }
}
