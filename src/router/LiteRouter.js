export class LiteRouter {
  constructor(routes, appElement) {
    this.routes = routes;
    this.app = document.querySelector(appElement);

    window.addEventListener('popstate', () => this.loadRoute());

    document.body.addEventListener('click', e => {
      const anchor = e.target.closest('a[href^="#"]');
      if (anchor) {
        e.preventDefault();
        const id = anchor.getAttribute('href');
        if (window.location.pathname !== '/') {
          this.navigateTo('/' + id);
        } else {
          this.scrollToId(id);
        }
        return;
      }

      const link = e.target.closest('[data-link]');
      if (link) {
        e.preventDefault();
        this.navigateTo(link.getAttribute('href'));
      }
    });

    // Initial Load Logic
    if (document.readyState === 'complete') {
      this.loadRoute();
    } else {
      window.addEventListener('load', () => this.loadRoute());
    }
  }

  navigateTo(url) {
    history.pushState(null, null, url);
    this.loadRoute();
  }

  async loadRoute() {
    let path = window.location.pathname;
    const base = '/blog-pwa';

    // Strip base path for matching
    if (path.startsWith(base)) {
      path = path.replace(base, '') || '/';
    }
    if (!path.startsWith('/')) path = '/' + path;

    // Check hash intent from other pages
    let hashTarget = '';
    if (path.includes('/#')) {
      const parts = path.split('/#');
      path = '/';
      hashTarget = '#' + parts[1];
    }

    if (path === '/index.html') path = '/';

    const match = this.routes.find(r => {
      const rx = new RegExp("^" + r.path.replace(/:(\w+)/g, "(?<$1>[^/]+)") + "$");
      return path.match(rx);
    }) || this.routes.find(r => r.path === '*');

    const result = path.match(new RegExp("^" + match.path.replace(/:(\w+)/g, "(?<$1>[^/]+)") + "$"));
    const params = result?.groups || {};
    const search = new URLSearchParams(window.location.search);

    // Layout
    if (match.layout) {
      if (!this.currentLayout || this.currentLayout !== match.layout) {
        this.app.innerHTML = await match.layout();
        this.currentLayout = match.layout;
      }
    }

    const outlet = this.app.querySelector('[data-outlet]') || this.app;

    // Spinner
    outlet.innerHTML = '<div class="spinner-container"><div class="spinner"></div></div>';

    try {
      const view = await match.component({ params, query: search });
      outlet.innerHTML = view;
    } catch (err) {
      outlet.innerHTML = `<div class="error-page"><h2>Error</h2><p>${err.message}</p></div>`;
    }

    if (match.title) document.title = match.title;

    // Scroll Handling
    if (hashTarget) {
      setTimeout(() => this.scrollToId(hashTarget), 300);
    } else if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  scrollToId(id) {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  init() {
    // defer init call to window.load often safest or immediate
  }
}
