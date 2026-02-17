import { authState } from '../services/auth.js';
import { openLoginModal, openProfileModal, openSignupModal } from '../utils/modals.js';

export const Navbar = () => {
  const user = authState.user;

  // Toggle Mobile Menu Logic
  setTimeout(() => {
    const btn = document.getElementById('hamburger-btn');
    const menu = document.getElementById('nav-menu');
    if(btn && menu) {
      btn.onclick = () => menu.classList.toggle('active');
      // Close menu when clicking any link
      menu.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('click', () => menu.classList.remove('active'));
      });
    }
  }, 0);

  return `<nav class="navbar">
      <div class="nav-inner">
        <a href="/" class="logo" style="font-weight:800; font-size:1.4rem; text-decoration:none; color:var(--text)" data-link>
          Refai<span style="color:var(--primary)">.Code</span>
        </a>

        <button class="hamburger" id="hamburger-btn">☰</button>

        <div class="nav-links" id="nav-menu">
          <a href="/" data-link>Home</a>
          <a href="#about">About</a>
          <a href="/products" data-link>Products</a>

          <div style="margin-left: 2rem; padding-left: 2rem; border-left: 1px solid #ddd;">
            ${user ? `
              <div style="display:flex; align-items:center; gap:0.6rem; cursor:pointer;" onclick="window.openProfile()">
                 <img src="${user.avatar}" style="width:34px; height:34px; border-radius:50%; border:2px solid var(--primary);" alt="Avatar">
                 <span style="font-weight:600; font-size:0.9rem;">${user.firstName}</span>
              </div>
             ` : `
               <button class="btn btn-primary" onclick="window.openLogin()" style="padding:0.4rem 1.2rem; font-size:0.9rem;">Sign In</button>
            `}
          </div>
        </div>
      </div>
    </nav>
  `;
};

// Global handlers for Modals
window.openLogin = openLoginModal;
window.openProfile = openProfileModal;
window.openSignup = openSignupModal;
