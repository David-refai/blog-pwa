import { authState } from '../services/auth.js';
import { toast } from './toast.js';

const createOverlay = (content) => {
  const existing = document.querySelector('.modal-overlay');
  if(existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-content">
      <button class="close-modal" onclick="this.closest('.modal-overlay').remove()">×</button>
      ${content}
    </div>
  `;
  overlay.addEventListener('click', (e) => {
    if(e.target === overlay) overlay.remove();
  });
  document.body.appendChild(overlay);
  return overlay;
};

export const openLoginModal = () => {
  createOverlay(`
    <h2 style="text-align:center; margin-bottom:1rem;">Welcome Back</h2>
    <p style="text-align:center; color:#6b7280; margin-bottom:1.5rem; font-size:0.9rem;">Sign in to your account</p>

    <form onsubmit="window.handleLogin(event)">
      <input type="email" name="email" value="admin@refai.code" placeholder="Email Address" required>
      <input type="password" name="password" value="admin123" placeholder="Password" required>
      <button type="submit" class="btn btn-primary" style="width:100%; margin-bottom:1rem;">Sign In</button>
    </form>

    <div style="display:flex; align-items:center; margin:1.5rem 0; color:#9ca3af; font-size:0.85rem;">
      <div style="flex:1; height:1px; background:#e5e7eb;"></div>
      <span style="padding:0 1rem;">OR CONTINUE WITH</span>
      <div style="flex:1; height:1px; background:#e5e7eb;"></div>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.8rem; margin-bottom:1rem;">
      <button class="btn btn-social" onclick="toast.show('Google Auth Coming Soon', 'error')">
        <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12.61C5,9.5 7.81,5.7 12.19,5.7C13.63,5.7 15.71,6.5 16.55,7.34L19.07,4.8C16.8,2.77 14.28,2.15 12.18,2.15C5.83,2.15 1.15,7.39 1.15,12.61C1.15,17.97 4.96,22.85 12.18,22.85C18.27,22.85 22.85,17.7 22.85,12.61C22.85,11.75 22.75,11.53 22.65,11.1H21.35Z"/></svg> Google
      </button>
      <button class="btn btn-social" onclick="toast.show('GitHub Auth Coming Soon', 'error')">
        <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"/></svg> GitHub
      </button>
    </div>

    <p style="text-align:center; font-size:0.85rem; color:#6b7280;">
      Don't have an account? <a href="#" onclick="event.preventDefault(); window.openSignup()" style="color:var(--primary); font-weight:600; text-decoration:none;">Sign Up</a>
    </p>
  `);
};

export const openSignupModal = () => {
  createOverlay(`
    <h2 style="text-align:center; margin-bottom:1rem;">Create Account</h2>
    <p style="text-align:center; color:#6b7280; margin-bottom:1.5rem; font-size:0.9rem;">Join Refai.Code today</p>

    <form onsubmit="window.handleSignup(event)">
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem;">
        <input type="text" name="firstName" placeholder="First Name" required>
        <input type="text" name="lastName" placeholder="Last Name" required>
      </div>
      <input type="email" name="email" placeholder="Email Address" required>
      <input type="password" name="password" placeholder="Create Password" required>
      <button type="submit" class="btn btn-primary" style="width:100%; margin-bottom:1rem;">Create Account</button>
    </form>

    <div style="display:flex; align-items:center; margin:1.5rem 0; color:#9ca3af; font-size:0.85rem;">
      <div style="flex:1; height:1px; background:#e5e7eb;"></div>
      <span style="padding:0 1rem;">OR SIGN UP WITH</span>
      <div style="flex:1; height:1px; background:#e5e7eb;"></div>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.8rem; margin-bottom:1rem;">
      <button class="btn btn-social" onclick="toast.show('Google Auth Coming Soon', 'error')">
        <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12.61C5,9.5 7.81,5.7 12.19,5.7C13.63,5.7 15.71,6.5 16.55,7.34L19.07,4.8C16.8,2.77 14.28,2.15 12.18,2.15C5.83,2.15 1.15,7.39 1.15,12.61C1.15,17.97 4.96,22.85 12.18,22.85C18.27,22.85 22.85,17.7 22.85,12.61C22.85,11.75 22.75,11.53 22.65,11.1H21.35Z"/></svg> Google
      </button>
      <button class="btn btn-social" onclick="toast.show('GitHub Auth Coming Soon', 'error')">
        <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"/></svg> GitHub
      </button>
    </div>

    <p style="text-align:center; font-size:0.85rem; color:#6b7280;">
      Already have an account? <a href="#" onclick="event.preventDefault(); window.openLogin()" style="color:var(--primary); font-weight:600; text-decoration:none;">Log In</a>
    </p>
  `);
};

export const openProfileModal = () => {
  const u = authState.user;
  if(!u) return;

  createOverlay(`
    <div style="text-align:center; margin-bottom:1.5rem;">
      <img src="${u.avatar}" style="width:80px; height:80px; border-radius:50%; margin-bottom:1rem; border:3px solid var(--primary);">
      <h3>Edit Profile</h3>
    </div>
    <form onsubmit="window.handleUpdateProfile(event)">
      <div style="display:flex; gap:0.5rem;">
        <input type="text" name="firstName" value="${u.firstName}" placeholder="First Name">
        <input type="text" name="lastName" value="${u.lastName}" placeholder="Last Name">
      </div>
      <input type="email" name="email" value="${u.email}" readonly style="background:#f3f4f6; color:#999;" title="Email cannot be changed">
      <input type="password" name="password" placeholder="New Password (Optional)">

      <div style="display:flex; gap:1rem; margin-top:1rem;">
        <button type="button" class="btn" style="flex:1; background:#fee; color:red;" onclick="window.auth.logout()">Logout</button>
        <button type="submit" class="btn btn-primary" style="flex:1;">Update Profile</button>
      </div>
    </form>
  `);
};

// Logic Handlers attached to window
window.handleLogin = async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const pass = e.target.password.value;
  const success = await authState.login(email, pass);
  if(success) document.querySelector('.modal-overlay')?.remove();
};

window.handleSignup = async (e) => {
  e.preventDefault();
  const data = {
    firstName: e.target.firstName.value,
    lastName: e.target.lastName.value,
    email: e.target.email.value,
    password: e.target.password.value
  };
  const success = await authState.signup(data);
  if(success) {
    document.querySelector('.modal-overlay')?.remove();
    setTimeout(() => openLoginModal(), 300);
  }
};

window.handleUpdateProfile = async (e) => {
  e.preventDefault();
  const data = {
    firstName: e.target.firstName.value,
    lastName: e.target.lastName.value,
    password: e.target.password.value
  };
  const updatedUser = { ...authState.user, ...data };
  if(!data.password) delete updatedUser.password;
  if(JSON.stringify(updatedUser) === JSON.stringify(authState.user))
    toast.show('No changes made to update.', 'info');
  else {
    const success = await authState.updateProfile(updatedUser);
    if(success) document.querySelector('.modal-overlay')?.remove();
  }
};

// Expose Auth globally for logout
import { authState as auth } from '../services/auth.js';
window.auth = auth;
