import { api } from '../services/api.js';
import { authState } from '../services/auth.js';
import { LiteRouter } from '../router/LiteRouter.js';

export const CreatePostPage = async () => {
  if (!authState.user) {
    return `<div class="container" style="padding-top:6rem; text-align:center;">
      <h1>Access Denied</h1>
      <p>You must be logged in to create a post.</p>
      <button class="btn btn-primary" onclick="window.openLogin()">Sign In</button>
    </div>`;
  }

  // Handle Form Submission Logic
  setTimeout(() => {
    const form = document.getElementById('create-post-form');
    if (form) {
      form.onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const postData = {
          title: formData.get('title'),
          excerpt: formData.get('excerpt'),
          content: formData.get('content'),
          image: formData.get('image') || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
          author: `${authState.user.firstName} ${authState.user.lastName}`,
          date: new Date().toISOString().split('T')[0]
        };

        if (!postData.title || !postData.content) {
          alert('Title and Content are required!');
          return;
        }

        try {
          await api.post('/posts', postData);
          window.location.href = '/blog-pwa/blog';
        } catch (err) {
          console.error('Failed to create post:', err);
          const errorEl = document.getElementById('form-error');
          if (errorEl) {
            errorEl.textContent = err.message || 'Failed to create post. Please try again.';
            errorEl.style.display = 'block';
          }
        }
      };
    }
  }, 0);

  return `<div class="container" style="padding-top:4rem; max-width:700px;">
    <h1 style="margin-bottom:2rem; font-weight:800;">Create New Post</h1>
    <div class="card" style="padding:2.5rem; border-radius:1.5rem;">
      <div id="form-error" style="display:none; background:#fee2e2; border:1px solid #ef4444; color:#b91c1c; padding:1rem; border-radius:0.5rem; margin-bottom:1.5rem; font-size:0.9rem;"></div>
      <form id="create-post-form">
        <div style="margin-bottom:1.5rem;">
          <label style="display:block; margin-bottom:0.5rem; font-weight:600;">Title</label>
          <input name="title" type="text" placeholder="Enter post title" style="width:100%; padding:0.8rem; border:1px solid #ddd; border-radius:0.5rem;" required>
        </div>
        
        <div style="margin-bottom:1.5rem;">
          <label style="display:block; margin-bottom:0.5rem; font-weight:600;">Excerpt (A short summary)</label>
          <input name="excerpt" type="text" placeholder="Short summary of the post" style="width:100%; padding:0.8rem; border:1px solid #ddd; border-radius:0.5rem;">
        </div>

        <div style="margin-bottom:1.5rem;">
          <label style="display:block; margin-bottom:0.5rem; font-weight:600;">Cover Image URL</label>
          <input name="image" type="url" placeholder="https://example.com/image.jpg" style="width:100%; padding:0.8rem; border:1px solid #ddd; border-radius:0.5rem;">
        </div>

        <div style="margin-bottom:2rem;">
          <label style="display:block; margin-bottom:0.5rem; font-weight:600;">Content</label>
          <textarea name="content" placeholder="Write your post content here..." style="width:100%; padding:0.8rem; border:1px solid #ddd; border-radius:0.5rem; min-height:200px;" required></textarea>
        </div>

        <div style="display:flex; gap:1rem;">
          <button type="submit" class="btn btn-primary" style="flex:1; justify-content:center;">Publish Post</button>
          <a href="/blog-pwa/blog" class="btn btn-social" style="flex:1; justify-content:center; width:auto;" data-link>Cancel</a>
        </div>
      </form>
    </div>
  </div>`;
};
