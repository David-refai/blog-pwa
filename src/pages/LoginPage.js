import { authState } from '../services/auth.js';

export const LoginPage = () => {
  setTimeout(() => {
    const form = document.getElementById('loginForm');
    if(form) {
      form.onsubmit = async (e) => {
        e.preventDefault();
        const email = form.email.value;
        const pass = form.password.value;
        const success = await authState.login(email, pass);
        if(success) window.location.href = '/';
      };
    }
  }, 0);

  return `
    <div class="auth-container">
      <div class="glass-panel auth-box">
        <div style="text-align:center; margin-bottom:2rem;">
          <h2 style="font-size:2rem; margin-bottom:0.5rem;">Welcome Back</h2>
          <p style="color:#6b7280;">Enter your credentials to access your account.</p>
        </div>

        <form id="loginForm">
          <label style="font-weight:600; font-size:0.9rem; margin-bottom:0.5rem; display:block;">Email Address</label>
          <input type="email" name="email" value="admin@refai.code" required placeholder="name@example.com">

          <label style="font-weight:600; font-size:0.9rem; margin-bottom:0.5rem; display:block;">Password</label>
          <input type="password" name="password" value="admin123" required placeholder="••••••••">

          <button type="submit" class="btn btn-primary" style="width:100%; padding:0.9rem;">Sign In</button>
        </form>

        <div style="display:flex; align-items:center; margin: 2rem 0; color:#9ca3af; font-size:0.9rem;">
          <div style="flex:1; height:1px; background:#e5e7eb;"></div>
          <span style="padding:0 1rem;">OR CONTINUE WITH</span>
          <div style="flex:1; height:1px; background:#e5e7eb;"></div>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem;">
          <button class="btn btn-social">
            <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12.61C5,9.5 7.81,5.7 12.19,5.7C13.63,5.7 15.71,6.5 16.55,7.34L19.07,4.8C16.8,2.77 14.28,2.15 12.18,2.15C5.83,2.15 1.15,7.39 1.15,12.61C1.15,17.97 4.96,22.85 12.18,22.85C18.27,22.85 22.85,17.7 22.85,12.61C22.85,11.75 22.75,11.53 22.65,11.1H21.35Z"/></svg> Google
          </button>
          <button class="btn btn-social">
            <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"/></svg> GitHub
          </button>
        </div>

        <p style="text-align:center; margin-top:2rem; font-size:0.9rem;">
          Don't have an account? <a href="/signup" data-link style="color:var(--primary); font-weight:600; text-decoration:none;">Sign Up</a>
        </p>
      </div>
    </div>
  `;
};
