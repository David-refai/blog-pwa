import { api } from '../services/api.js';

export const HomePage = async () => {
  return `
    <header style="padding: 8rem 2rem; text-align:center; background: radial-gradient(circle at center, rgba(79,70,229,0.1), transparent 70%);">
       <div class="container">
         <span style="background:rgba(79,70,229,0.1); color:var(--primary); padding:0.4rem 1rem; border-radius:30px; font-weight:600; font-size:0.9rem;">
           v2.0 Ultimate
         </span>
         <h1 style="font-size:4rem; margin:1.5rem 0; line-height:1.1;">
           Build with <span style="background: linear-gradient(to right, #4f46e5, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Precision</span>.
         </h1>
         <p style="font-size:1.4rem; color:#6b7280; max-width:600px; margin:0 auto 2.5rem;">
           A fully functional MVC architecture with Authentication, Routing, and Live Database integration.
         </p>
         <div style="display:flex; gap:1rem; justify-content:center;">
           <a href="/blog-pwa/products" class="btn btn-primary" style="padding:1rem 2rem; font-size:1.1rem;" data-link>Fetch Data</a>
           <a href="/blog-pwa/documentation" class="btn btn-social" style="width:auto; padding:1rem 2rem; font-size:1.1rem;" data-link>Documentation</a>
         </div>
       </div>
    </header>

    <section id="about" style="background:white; padding:6rem 2rem;">
      <div class="container">
         <div style="text-align:center; margin-bottom:4rem;">
           <h2 style="font-size:2.5rem; margin-bottom:1rem;">Why Refai.Code?</h2>
           <p style="color:#6b7280;">Built for modern developers who need speed and structure.</p>
         </div>

         <div class="grid">
           <div class="glass-panel" style="text-align:center; border:none; background:#f9fafb;">
             <div style="font-size:2.5rem; margin-bottom:1rem;">⚡</div>
             <h3 style="margin-bottom:0.5rem;">Concurrent Run</h3>
             <p style="color:#6b7280;">Vite & Server run in a single command.</p>
           </div>
           <div class="glass-panel" style="text-align:center; border:none; background:#f9fafb;">
             <div style="font-size:2.5rem; margin-bottom:1rem;">🔐</div>
             <h3 style="margin-bottom:0.5rem;">Real Auth</h3>
             <p style="color:#6b7280;">Users saved to JSON DB with persistent login.</p>
           </div>
           <div class="glass-panel" style="text-align:center; border:none; background:#f9fafb;">
             <div style="font-size:2.5rem; margin-bottom:1rem;">💅</div>
             <h3 style="margin-bottom:0.5rem;">Glass UI</h3>
             <p style="color:#6b7280;">Modern aesthetics with blurred backgrounds.</p>
           </div>
         </div>
      </div>
    </section>
  `;
};
