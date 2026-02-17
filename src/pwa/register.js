export function registerPWA() {
  // vite-plugin-pwa with injectRegister:'auto' registers automatically.
  // This file is just a safe place to add UX hooks (optional).
  if ('serviceWorker' in navigator) {
    // Optional: listen for SW updates
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      // SW updated and controlling the page
      console.log('[PWA] controller changed');
    });
  }
}
