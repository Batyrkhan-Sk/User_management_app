function renderSignInForm() {
    const container = document.getElementById('form-container');
    container.innerHTML = `
        <div id="signin-form">
            <div class="header-text mb-4">
                <h3>Start Your Journey</h3>
                <p>Sign in to the app</p>
            </div>
            
            <div class="mb-3">
                <input type="email" 
                       id="signin-email" 
                       class="form-control form-control-lg bg-light" 
                       placeholder="Email address" 
                       required>
            </div>
            
            <div class="mb-3">
                <input type="password" 
                       id="signin-password" 
                       class="form-control form-control-lg bg-light" 
                       placeholder="Password" 
                       required>
            </div>
            
            <div class="mb-4 d-flex justify-content-between align-items-center">
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="remember-me">
                    <label for="remember-me" class="form-check-label text-secondary">
                        <small>Remember Me</small>
                    </label>
                </div>
                <div>
                    <small><a href="#" id="forgot-password-link">Forgot Password?</a></small>
                </div>
            </div>
            
            <div class="mb-3">
                <button id="signin-btn" class="btn btn-lg btn-primary w-100">Sign In</button>
            </div>
            
            <div class="text-center">
                <small>Don't have an account? <a href="#" id="switch-to-signup">Sign Up</a></small>
            </div>
        </div>
    `;
}

function renderSignUpForm() {
    const container = document.getElementById('form-container');
    container.innerHTML = `
        <div id="signup-form">
            <div class="header-text mb-4">
                <h3>Create an Account</h3>
                <p>Sign up for the app</p>
            </div>
            
            <div class="mb-3">
                <input type="text" 
                       id="signup-name" 
                       class="form-control form-control-lg bg-light" 
                       placeholder="Full Name" 
                       required>
            </div>
            
            <div class="mb-3">
                <input type="email" 
                       id="signup-email" 
                       class="form-control form-control-lg bg-light" 
                       placeholder="Email address" 
                       required>
            </div>
            
            <div class="mb-3">
                <input type="password" 
                       id="signup-password" 
                       class="form-control form-control-lg bg-light" 
                       placeholder="Password" 
                       required>
            </div>
            
            <div class="mb-3">
                <button id="signup-btn" class="btn btn-lg btn-primary w-100">Sign Up</button>
            </div>
            
            <div class="text-center">
                <small>Already have an account? <a href="#" id="switch-to-signin">Sign In</a></small>
            </div>
        </div>
    `;
}