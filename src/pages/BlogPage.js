import { api } from '../services/api.js';
import { authState } from '../services/auth.js';

export const BlogPage = async () => {
  let posts = [];
  let error = null;
  try {
    posts = await api.get('/posts');
  } catch (e) {
    console.error('Failed to fetch posts:', e);
    error = e.message || 'An unexpected error occurred while fetching posts.';
  }

  const user = authState.user;

  if (error) {
    return `<div class="container" style="padding-top:6rem; text-align:center;">
          <div style="background:#fee2e2; border:1px solid #ef4444; color:#b91c1c; padding:2rem; border-radius:1rem; max-width:600px; margin:0 auto;">
            <h2 style="margin-bottom:1rem; font-weight:800;">Oops! Something went wrong</h2>
            <p style="margin-bottom:1.5rem;">${error}</p>
            <button class="btn btn-primary" onclick="window.location.reload()">Try Again</button>
          </div>
        </div>`;
  }

  return `<div class="container" style="padding-top:4rem;">
       <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:3rem;">
         <div>
           <h1 style="margin:0; font-size:2.5rem; font-weight:800; background:linear-gradient(to right, var(--primary), #818cf8); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">Refai.Code Blog</h1>
           <p style="color:#6b7280; margin-top:0.5rem;">Insights, tutorials, and news from the world of web development.</p>
         </div>
         ${user ? `
           <a href="/blog-pwa/blog/create" class="btn btn-primary" style="display:inline-flex; align-items:center; gap:0.5rem;" data-link>
             <span style="font-size:1.2rem;">+</span> Create Post
           </a>
         ` : ''}
       </div>

       <div class="grid">
         ${posts.map(post => `
           <article class="card h-full" style="display:flex; flex-direction:column; transition:transform 0.3s ease, box-shadow 0.3s ease;">
             <div style="position:relative; overflow:hidden; border-radius:1rem 1rem 0 0;">
               <img src="${post.image}" class="card-img" alt="${post.title}" style="height:200px; object-fit:cover; width:100%;">
               <div style="position:absolute; top:1rem; left:1rem;">
                 <span style="background:rgba(255,255,255,0.9); padding:0.25rem 0.75rem; border-radius:2rem; font-size:0.75rem; font-weight:700; color:var(--primary); text-transform:uppercase; letter-spacing:0.05em;">Article</span>
               </div>
             </div>
             <div class="card-body" style="flex:1; display:flex; flex-direction:column; padding:1.5rem;">
               <div style="font-size:0.875rem; color:#9ca3af; margin-bottom:0.75rem; display:flex; align-items:center; gap:0.5rem;">
                 <span>${new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                 <span>•</span>
                 <span>By ${post.author}</span>
               </div>
               <h3 style="font-size:1.25rem; margin-bottom:1rem; font-weight:700; line-height:1.4;">${post.title}</h3>
               <p style="font-size:0.95rem; color:#4b5563; margin-bottom:1.5rem; line-height:1.6; flex:1;">
                 ${post.excerpt}
               </p>
               <a href="/blog-pwa/posts/${post.id}" class="btn btn-primary" style="width:100%; justify-content:center; padding:0.75rem;" data-link>Read More</a>
             </div>
           </article>
         `).join('')}
       </div>
    </div>`;
};
