import { api } from '../services/api.js';
import { authState } from '../services/auth.js';

export const EditPostPage = async ({ params }) => {
  const { id } = params;

  if (!authState.user) {
    return `<div class="container" style="padding-top:6rem; text-align:center;">
          <h1>Access Denied</h1>
          <p>You must be logged in to edit a post.</p>
          <button class="btn btn-primary" onclick="window.openLogin()">Sign In</button>
        </div>`;
  }

  let post = null;
  try {
    post = await api.get(`/posts/${id}`);
  } catch (e) {
    console.error('Failed to fetch post for editing:', e);
  }

  if (!post) {
    return `<div class="container" style="padding-top:6rem; text-align:center;">
          <h1>Post Not Found</h1>
          <p>The article you are trying to edit does not exist.</p>
          <a href="/blog-pwa/blog" class="btn btn-primary" data-link>Back to Blog</a>
        </div>`;
  }

  // Handle Form Submission Logic
  setTimeout(() => {
    const form = document.getElementById('edit-post-form');
    if (form) {
      form.onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const postData = {
          ...post,
          title: formData.get('title'),
          excerpt: formData.get('excerpt'),
          content: formData.get('content'),
          image: formData.get('image') || post.image
        };

        if (!postData.title || !postData.content) {
          alert('Title and Content are required!');
          return;
        }

        try {
          await api.put(`/posts/${id}`, postData);
          window.location.href = `/blog-pwa/posts/${id}`;
        } catch (err) {
          console.error('Failed to update post:', err);
          const errorEl = document.getElementById('form-error');
          if (errorEl) {
            errorEl.textContent = err.message || 'Failed to update post. Please try again.';
            errorEl.style.display = 'block';
          }
        }
      };
    }
  }, 0);

  return `<div class="container" style="padding-top:4rem; max-width:700px; padding-bottom:8rem;">
    <h1 style="margin-bottom:2rem; font-weight:800;">Edit Post</h1>
    <div class="card" style="padding:2.5rem; border-radius:1.5rem;">
      <div id="form-error" style="display:none; background:#fee2e2; border:1px solid #ef4444; color:#b91c1c; padding:1rem; border-radius:0.5rem; margin-bottom:1.5rem; font-size:0.9rem;"></div>
      <form id="edit-post-form">
        <div style="margin-bottom:1.5rem;">
          <label style="display:block; margin-bottom:0.5rem; font-weight:600;">Title</label>
          <input name="title" type="text" value="${post.title}" style="width:100%; padding:0.8rem; border:1px solid #ddd; border-radius:0.5rem;" required>
        </div>
        
        <div style="margin-bottom:1.5rem;">
          <label style="display:block; margin-bottom:0.5rem; font-weight:600;">Excerpt (A short summary)</label>
          <input name="excerpt" type="text" value="${post.excerpt}" style="width:100%; padding:0.8rem; border:1px solid #ddd; border-radius:0.5rem;">
        </div>

        <div style="margin-bottom:1.5rem;">
          <label style="display:block; margin-bottom:0.5rem; font-weight:600;">Cover Image URL</label>
          <input name="image" type="url" value="${post.image}" style="width:100%; padding:0.8rem; border:1px solid #ddd; border-radius:0.5rem;">
        </div>

        <div style="margin-bottom:2rem;">
          <label style="display:block; margin-bottom:0.5rem; font-weight:600;">Content</label>
          <textarea name="content" style="width:100%; padding:0.8rem; border:1px solid #ddd; border-radius:0.5rem; min-height:200px;" required>${post.content}</textarea>
        </div>

        <div style="display:flex; gap:1rem;">
          <button type="submit" class="btn btn-primary" style="flex:1; justify-content:center;">Update Post</button>
          <a href="/blog-pwa/posts/${post.id}" class="btn btn-social" style="flex:1; justify-content:center; width:auto;" data-link>Cancel</a>
        </div>
      </form>
    </div>
  </div>`;
};
