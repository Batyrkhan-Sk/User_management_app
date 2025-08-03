document.addEventListener('click', function(e) {
    const target = e.target;
    
    if (target.id === 'signin-btn') {
        e.preventDefault();
        handleSignIn();
    }
    
    if (target.id === 'signup-btn') {
        e.preventDefault();
        handleSignUp();
    }
    
    if (target.id === 'logout-btn') {
        e.preventDefault();
        handleLogout();
    }
    
    if (target.id === 'switch-to-signup') {
        e.preventDefault();
        renderSignUpForm();
    }
    
    if (target.id === 'switch-to-signin') {
        e.preventDefault();
        renderSignInForm();
    }
    
    if (target.id === 'forgot-password-link') {
        e.preventDefault();
        const modal = new bootstrap.Modal(document.getElementById('forgotPasswordModal'));
        modal.show();
    }
});

document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        if (document.getElementById('signin-form')) {
            handleSignIn();
        } else {
            handleSignUp();
        } 
    }
});

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('form-container')) {
        renderSignInForm();
    }
});