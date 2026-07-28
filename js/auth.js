/* ==========================================================================
   AMAZON CLONE - AUTHENTICATION MODULE (LOGIN, SIGNUP, FORGOT PASSWORD)
   ========================================================================== */

let authMode = "login"; // 'login', 'signup', 'forgot', 'reset'

function renderAuthPage() {
  return `
    <div style="background:#fff; min-height:80vh; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px 20px;">
      <div style="cursor:pointer; margin-bottom:20px;" onclick="window.location.hash='#home'">
        <span style="font-size:32px; font-weight:800; color:#131921;">amazon<span style="color:#ff9900;">.com</span></span>
      </div>

      <div style="border:1px solid #ddd; border-radius:8px; width:100%; max-width:380px; padding:24px; background:white; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
        ${authMode === 'login' ? renderLoginForm() : ''}
        ${authMode === 'signup' ? renderSignupForm() : ''}
        ${authMode === 'forgot' ? renderForgotForm() : ''}
      </div>

      <div style="margin-top:20px; font-size:12px; color:#777; text-align:center;">
        © 1996-2026, Amazon.com, Inc. or its affiliates
      </div>
    </div>
  `;
}

function renderLoginForm() {
  return `
    <h1 style="font-size:24px; font-weight:600; margin-bottom:16px;">Sign in</h1>
    <form onsubmit="handleLoginSubmit(event)">
      <div class="form-group">
        <label>Email or mobile phone number</label>
        <input type="email" id="auth-login-email" class="form-control" value="sujal@example.com" required />
      </div>
      <div class="form-group">
        <div style="display:flex; justify-content:space-between;">
          <label>Password</label>
          <a href="javascript:void(0)" style="font-size:12px;" onclick="setAuthMode('forgot')">Forgot password?</a>
        </div>
        <input type="password" id="auth-login-pass" class="form-control" value="password123" required />
      </div>
      <button type="submit" class="btn-amazon-primary" style="width:100%; padding:10px; margin-top:8px;">Sign in</button>
    </form>

    <div style="margin-top:16px; font-size:12px; color:#565959;">
      By continuing, you agree to Amazon's <a href="#">Conditions of Use</a> and <a href="#">Privacy Notice</a>.
    </div>

    <hr style="margin:20px 0; border:none; border-top:1px solid #e7e7e7;" />

    <div style="font-size:12px; color:#767676; text-align:center; margin-bottom:8px;">New to Amazon?</div>
    <button class="btn-amazon-secondary" style="width:100%; font-size:13px;" onclick="setAuthMode('signup')">Create your Amazon account</button>
    <button class="btn-amazon-dark" style="width:100%; font-size:12px; margin-top:8px; background:#232f3e;" onclick="window.store.loginUser('admin@amazon.com', 'admin123'); window.location.hash='#admin';">Sign in as Admin Demo</button>
  `;
}

function renderSignupForm() {
  return `
    <h1 style="font-size:24px; font-weight:600; margin-bottom:16px;">Create account</h1>
    <form onsubmit="handleSignupSubmit(event)">
      <div class="form-group">
        <label>Your name</label>
        <input type="text" id="auth-signup-name" class="form-control" placeholder="First and last name" required />
      </div>
      <div class="form-group">
        <label>Mobile number or email</label>
        <input type="email" id="auth-signup-email" class="form-control" required />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" id="auth-signup-pass" class="form-control" placeholder="At least 6 characters" minlength="6" required />
        <div style="font-size:11px; color:#565959; margin-top:2px;">Passwords must be at least 6 characters.</div>
      </div>
      <button type="submit" class="btn-amazon-primary" style="width:100%; padding:10px; margin-top:8px;">Create your Amazon account</button>
    </form>

    <div style="margin-top:20px; font-size:13px; border-top:1px solid #eee; padding-top:16px;">
      Already have an account? <a href="javascript:void(0)" onclick="setAuthMode('login')">Sign in →</a>
    </div>
  `;
}

function renderForgotForm() {
  return `
    <h1 style="font-size:24px; font-weight:600; margin-bottom:8px;">Password assistance</h1>
    <p style="font-size:13px; color:#565959; margin-bottom:16px;">Enter the email address associated with your Amazon account.</p>
    <form onsubmit="event.preventDefault(); alert('A password reset link has been sent to your email.'); setAuthMode('login');">
      <div class="form-group">
        <label>Email address</label>
        <input type="email" class="form-control" required />
      </div>
      <button type="submit" class="btn-amazon-primary" style="width:100%; padding:10px; margin-top:8px;">Continue</button>
    </form>
    <div style="margin-top:16px; font-size:13px;">
      <a href="javascript:void(0)" onclick="setAuthMode('login')">← Back to Sign in</a>
    </div>
  `;
}

function setAuthMode(mode) {
  authMode = mode;
  window.store.notify();
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('auth-login-email').value;
  const pass = document.getElementById('auth-login-pass').value;

  const res = window.store.loginUser(email, pass);
  if (res.success) {
    alert(`Welcome back, ${res.user.name}!`);
    window.location.hash = res.user.role === 'admin' ? '#admin' : '#home';
  } else {
    alert(res.message);
  }
}

function handleSignupSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('auth-signup-name').value;
  const email = document.getElementById('auth-signup-email').value;
  const pass = document.getElementById('auth-signup-pass').value;

  const res = window.store.registerUser(name, email, pass);
  if (res.success) {
    alert(`Account created successfully! Welcome ${res.user.name}`);
    window.location.hash = '#home';
  } else {
    alert(res.message);
  }
}

window.setAuthMode = setAuthMode;
window.handleLoginSubmit = handleLoginSubmit;
window.handleSignupSubmit = handleSignupSubmit;
