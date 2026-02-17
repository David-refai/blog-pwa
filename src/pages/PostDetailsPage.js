import { api } from '../services/api.js';
import { authState } from '../services/auth.js';

export const PostDetailsPage = async ({ params }) => {
  const { id } = params;
  let post = null;
  let error = null;

  try {
    post = await api.get(`/posts/${id}`);
  } catch (e) {
    console.error('Failed to fetch post details:', e);
    error = e.response?.status === 404 ? 'Article Not Found' : (e.message || 'Failed to load article');
  }

  if (error || !post) {
    return `<div class="container" style="padding-top:6rem; text-align:center;">
      <div style="background:#f9fafb; border:1px solid #e5e7eb; padding:3rem; border-radius:1.5rem; max-width:600px; margin:0 auto;">
        <h1 style="margin-bottom:1rem; font-weight:800;">${error === 'Article Not Found' ? 'Article Not Found' : 'Something went wrong'}</h1>
        <p style="margin-bottom:2rem; color:#4b5563;">${error === 'Article Not Found' ? 'The article you are looking for does not exist or has been moved.' : error}</p>
        <a href="/blog-pwa/blog" class="btn btn-primary" data-link>Back to Blog</a>
      </div>
    </div>`;
  }

  // Generate random read time for display
  const readTime = Math.ceil(post.content.split(' ').length / 200) + 2;

  return `<div class="container" style="padding-top:4rem; max-width:800px; padding-bottom:8rem;">
    <article>
      <header style="margin-bottom:3.5rem;">
        <a href="/blog-pwa/blog" style="display:inline-flex; align-items:center; color:var(--primary); text-decoration:none; margin-bottom:2.5rem; font-weight:600; font-size:0.95rem; transition: transform 0.2s;" data-link onmouseover="this.style.transform='translateX(-5px)'" onmouseout="this.style.transform='translateX(0)'">
          ← Back to Blog
        </a>
        <h1 style="font-size:3.5rem; font-weight:800; margin-bottom:1.5rem; line-height:1.15; color:#111827; letter-spacing:-0.025em;">${post.title}</h1>
        
        <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1.5rem; margin-bottom:2rem; padding-bottom:2rem; border-bottom:1px solid #f3f4f6;">
          <div style="display:flex; align-items:center; gap:1rem;">
            <img src="https://ui-avatars.com/api/?name=${post.author.replace(' ', '+')}&background=4f46e5&color=fff&bold=true" style="width:56px; height:56px; border-radius:50%; box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);" alt="${post.author}">
            <div>
              <div style="font-weight:700; color:#111827; font-size:1.1rem;">${post.author}</div>
              <div style="font-size:0.9rem; color:#4b5563; display:flex; gap:0.5rem; align-items:center;">
                <span>${new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span>•</span>
                <span style="display:flex; align-items:center; gap:0.25rem;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  ${readTime} min read
                </span>
              </div>
            </div>
          </div>
          <div style="display:flex; gap:0.75rem;">
            <span style="background:#eff6ff; color:#1d4ed8; padding:0.4rem 0.8rem; border-radius:2rem; font-size:0.8rem; font-weight:600;">#Tech</span>
            <span style="background:#f5f3ff; color:#6d28d9; padding:0.4rem 0.8rem; border-radius:2rem; font-size:0.8rem; font-weight:600;">#PWA</span>
          </div>
        </div>
        
        <img src="${post.image}" alt="${post.title}" style="width:100%; border-radius:2rem; margin-bottom:4rem; box-shadow:0 25px 50px -12px rgba(0,0,0,0.25); object-fit:cover; height:450px;">
      </header>

      <div class="content" style="font-size:1.25rem; line-height:1.9; color:#374151; font-family:'Inter', system-ui, sans-serif;">
        ${post.content.split('\n\n').map(p => `
          <p style="margin-bottom:2rem;">${p.replace(/\n/g, '<br>')}</p>
        `).join('')}
      </div>

      <footer style="margin-top:6rem; padding-top:4rem; border-top:1px solid #f3f4f6;">
        <div style="background:#f9fafb; border-radius:1.5rem; padding:2rem; display:flex; align-items:center; justify-content:space-between;">
          <div style="font-weight:600; color:#374151;">Was this helpful?</div>
          <div style="display:flex; gap:1rem;">
            <button class="btn btn-social" style="width:auto; padding:0.6rem 1.2rem;">Share</button>
            <button class="btn btn-primary" style="width:auto; padding:0.6rem 1.2rem;">Bookmark</button>
            ${authState.user ? `
              <a href="/blog-pwa/posts/edit/${post.id}" class="btn btn-social" style="width:auto; padding:0.6rem 1.2rem; background:#f3f4f6; color:#111827;" data-link>Edit Post</a>
            ` : ''}
          </div>
        </div>
      </footer>
    </article>
  </div>`;
};
