import { Navbar } from './Navbar.js';

export const Layout = () =>
  `
  <div id="nav-mount">${Navbar()}</div>
  <main>
    <div data-outlet></div>
  </main>
  <footer style="background: white; border-top: 1px solid #eaeaea; padding: 4rem 0; margin-top: 4rem;">
    <div class="container" style="text-align:center;">
       <h3 style="margin-bottom:1rem; opacity:0.8;">Refai.Code</h3>
       <div style="display:flex; justify-content:center; gap:1.5rem; margin-bottom:2rem;">
         <a href="#" style="color:#666; text-decoration:none;">Instagram</a>
         <a href="#" style="color:#666; text-decoration:none;">Twitter</a>
         <a href="#" style="color:#666; text-decoration:none;">GitHub</a>
       </div>
       <p style="color:#4b5563; font-size:0.9rem;">© 2026. All rights reserved.</p>
    </div>
  </footer>
`;
