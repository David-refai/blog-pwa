// ===== Refai.Code Router Setup (Auto-generated) =====
import './styles/main.css';
import { registerPWA } from './pwa/register.js';
import { LiteRouter } from './router/LiteRouter.js';
import { Layout } from './components/Layout.js';
import { Navbar } from './components/Navbar.js';
import { authState } from './services/auth.js';

import { HomePage } from './pages/HomePage.js';
import { ProductsPage } from './pages/ProductsPage.js';
import { ProductDetailsPage } from './pages/ProductDetailsPage.js';
import { LoginPage } from './pages/LoginPage.js';
import { SignupPage } from './pages/SignupPage.js';
import { DocsPage } from './pages/DocsPage.js';

const routes = [
  { path: '/', component: HomePage, layout: Layout, title: 'Home | Refai.Code' },
  { path: '/products', component: ProductsPage, layout: Layout, title: 'Products' },
  { path: '/products/:id', component: ProductDetailsPage, layout: Layout, title: 'Details' },
  { path: '/documentation', component: DocsPage, layout: Layout, title: 'Documentation' },
  { path: '/about', component: HomePage, layout: Layout, title: 'About | Refai.Code' },
  { path: '/login', component: LoginPage, layout: Layout, title: 'Login' },
  { path: '/logout', component: () => { authState.logout(); return '<div></div>'; } },
  { path: '/signup', component: SignupPage, layout: Layout, title: 'Signup' },
  { path: '*', component: () => '<h1 class="container">404</h1>', layout: Layout }
];

authState.subscribe(() => {
  const el = document.getElementById('nav-mount');
  if (el) el.innerHTML = Navbar();
});

registerPWA();
const router = new LiteRouter(routes, '#app');

// Global Offline Indicator Logic
const toggleOfflineUI = () => {
  const banner = document.getElementById('offline-indicator');
  if (banner) {
    banner.style.display = navigator.onLine ? 'none' : 'block';
  }
};

window.addEventListener('online', toggleOfflineUI);
window.addEventListener('offline', toggleOfflineUI);
toggleOfflineUI(); // Initial check

router.init();
// ===== End Refai.Code Router Setup =====
