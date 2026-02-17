import { authState } from '../services/auth.js';

export const SignupPage = () => {
  setTimeout(() => {
    const form = document.getElementById('signupForm');
    if(form) {
      form.onsubmit = async (e) => {
        e.preventDefault();
        const data = {
          firstName: form.firstName.value,
          lastName: form.lastName.value,
          email: form.email.value,
          password: form.password.value
        };
        const success = await authState.signup(data);
        if(success) window.location.href = '/login';
      };
    }
  }, 0);

  return `
    <div class="auth-container">
      <div class="glass-panel auth-box">
        <div style="text-align:center; margin-bottom:2rem;">
          <h2 style="font-size:2rem; margin-bottom:0.5rem;">Join Us</h2>
          <p style="color:#6b7280;">Create your account to get started.</p>
        </div>

        <form id="signupForm">
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem;">
             <div>
               <label style="font-weight:600; font-size:0.9rem; margin-bottom:0.5rem; display:block;">First Name</label>
               <input type="text" name="firstName" required placeholder="John">
             </div>
             <div>
               <label style="font-weight:600; font-size:0.9rem; margin-bottom:0.5rem; display:block;">Last Name</label>
               <input type="text" name="lastName" required placeholder="Doe">
             </div>
          </div>

          <label style="font-weight:600; font-size:0.9rem; margin-bottom:0.5rem; display:block;">Email Address</label>
          <input type="email" name="email" required placeholder="name@example.com">

          <label style="font-weight:600; font-size:0.9rem; margin-bottom:0.5rem; display:block;">Password</label>
          <input type="password" name="password" required placeholder="Create a password">

          <button type="submit" class="btn btn-primary" style="width:100%; padding:0.9rem;">Create Account</button>
        </form>

        <p style="text-align:center; margin-top:2rem; font-size:0.9rem;">
          Already have an account? <a href="/login" data-link style="color:var(--primary); font-weight:600; text-decoration:none;">Log In</a>
        </p>
      </div>
    </div>
  `;
};
