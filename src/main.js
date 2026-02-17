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
  { path: '/blog-pwa/', component: HomePage, layout: Layout, title: 'Home | Refai.Code' },
  { path: '/blog-pwa/products', component: ProductsPage, layout: Layout, title: 'Products' },
  { path: '/blog-pwa/products/:id', component: ProductDetailsPage, layout: Layout, title: 'Details' },
  { path: '/blog-pwa/documentation', component: DocsPage, layout: Layout, title: 'Documentation' },
  { path: '/blog-pwa/login', component: LoginPage, layout: Layout, title: 'Login' },
  { path: '/blog-pwa/logout', component: () => { authState.logout(); return '<div></div>'; } },
  { path: '/blog-pwa/signup', component: SignupPage, layout: Layout, title: 'Signup' },
  { path: '*', component: () => '<h1 class="container">404</h1>', layout: Layout }
];

authState.subscribe(() => {
  const el = document.getElementById('nav-mount');
  if (el) el.innerHTML = Navbar();
});

registerPWA();
new LiteRouter(routes, '#app').init();
// ===== End Refai.Code Router Setup =====
