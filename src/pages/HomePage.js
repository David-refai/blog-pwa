import { api } from '../services/api.js';

export const HomePage = async () => {
  return `
    <header style="padding: 8rem 2rem; text-align:center; background: radial-gradient(circle at center, rgba(79,70,229,0.1), transparent 70%);">
       <div class="container">
         <span style="background:rgba(79,70,229,0.1); color:var(--primary); padding:0.4rem 1rem; border-radius:30px; font-weight:600; font-size:0.9rem;">
           Blog PWA v2.0
         </span>
         <h1 style="font-size:4rem; margin:1.5rem 0; line-height:1.1; letter-spacing:-0.02em;">
           Share Your <span style="background: linear-gradient(to right, #4f46e5, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Stories</span> Worldwide.
         </h1>
         <p style="font-size:1.4rem; color:#6b7280; max-width:600px; margin:0 auto 2.5rem;">
           A modern, lightning-fast Progressive Web App designed for writers who care about speed, offline access, and premium aesthetics.
         </p>
         <div style="display:flex; gap:1rem; justify-content:center;">
           <a href="/blog-pwa/blog" class="btn btn-primary" style="padding:1rem 2rem; font-size:1.1rem; border-radius:1rem;" data-link>Explore Articles</a>
           <a href="/blog-pwa/login" class="btn btn-social" style="width:auto; padding:1rem 2rem; font-size:1.1rem; border-radius:1rem;" data-link>Start Writing</a>
         </div>
       </div>
    </header>

    <section id="about" style="background:white; padding:8rem 2rem;">
      <div class="container">
         <div style="text-align:center; margin-bottom:5rem;">
           <h2 style="font-size:3rem; font-weight:800; margin-bottom:1.5rem; letter-spacing:-0.03em;">Built for the Modern Web</h2>
           <p style="color:#4b5563; font-size:1.1rem; max-width:600px; margin:0 auto;">Experience a blog that works everywhere, even without an internet connection.</p>
         </div>

         <div class="grid" style="gap:2rem;">
            <div class="glass-panel" style="text-align:center; border:none; background:#f9fafb; padding:3rem; border-radius:2rem;">
              <div style="font-size:3rem; margin-bottom:1.5rem;">📡</div>
              <h3 style="margin-bottom:1rem; font-size:1.5rem; font-weight:700;">Offline Ready</h3>
              <p style="color:#4b5563; line-height:1.6;">Full PWA support with service workers. Read your favorite articles anywhere, anytime.</p>
            </div>
            <div class="glass-panel" style="text-align:center; border:none; background:#f9fafb; padding:3rem; border-radius:2rem;">
              <div style="font-size:3rem; margin-bottom:1.5rem;">✍️</div>
              <h3 style="margin-bottom:1rem; font-size:1.5rem; font-weight:700;">Create & Edit</h3>
              <p style="color:#4b5563; line-height:1.6;">Intuitive publishing tools for authors. Manage your content with a sleek, responsive editor.</p>
            </div>
            <div class="glass-panel" style="text-align:center; border:none; background:#f9fafb; padding:3rem; border-radius:2rem;">
              <div style="font-size:3rem; margin-bottom:1.5rem;">🚀</div>
              <h3 style="margin-bottom:1rem; font-size:1.5rem; font-weight:700;">Blazing Fast</h3>
              <p style="color:#4b5563; line-height:1.6;">Built on a lightweight MVC architecture ensuring sub-second load times and smooth transitions.</p>
            </div>
         </div>
      </div>
    </section>
  `;
};
