import { api } from '../services/api.js';
import { renderStars } from '../utils/helpers.js';

export const ProductDetailsPage = async ({ params }) => {
  try {
    const p = await api.get(`/products/${params.id}`);
    return `<div class="container" style="padding-top:4rem;">
        <a href="/products" data-link style="display:inline-flex; align-items:center; color:#6b7280; text-decoration:none; margin-bottom:2rem; font-weight:500;">
          <svg style="width:20px; margin-right:5px;" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          Back to Products
        </a>

        <div class="glass-panel" style="display:grid; grid-template-columns: 1fr 1fr; gap:3rem; padding:3rem;">
           <img src="${p.image}" class="product-detail-img" style="width:100%; border-radius:12px;" alt="${p.name}">
           <div>
              <h1 style="font-size:2.5rem; margin:0 0 1rem 0;">${p.name}</h1>
              <div style="display:flex; align-items:center; gap:1rem; margin-bottom:2rem;">
                 <span style="font-size:1.5rem; font-weight:700; color:var(--primary);">$${p.price}</span>
                 <div style="border-left:1px solid #ddd; padding-left:1rem; font-size:1.1rem; color:#f59e0b;">
                   ${renderStars(p.rating)}
                 </div>
              </div>
              <p style="color:#4b5563; line-height:1.7; font-size:1.1rem; margin-bottom:3rem;">
                ${p.description}
              </p>
              <button class="btn btn-primary" style="padding:1rem 2rem; font-size:1.1rem; width:100%;" onclick="alert('Added to cart!')">
                Add to Cart
              </button>
           </div>
        </div>`;
  } catch (e) {
    return `<div class="container"><h1>Product Not Found</h1></div>`;
  }
};
