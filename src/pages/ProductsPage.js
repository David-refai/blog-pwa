import { api } from '../services/api.js';
import { renderStars } from '../utils/helpers.js';

export const ProductsPage = async () => {
  let products = [];
  try {
    products = await api.get('/products');
  } catch (e) {
    // Fallback
  }

  return `<div class="container" style="padding-top:4rem;">
       <h1 style="margin-bottom:2rem;">Featured Products</h1>
       <div class="grid">
         ${products.map(p => `
           <div class="card">
             <img src="${p.image}" class="card-img" alt="${p.name}">
             <div class="card-body">
               <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.5rem;">
                 <h3 style="font-size:1.1rem; margin:0; font-weight:700;">${p.name}</h3>
                 <span style="font-size:0.9rem; font-weight:600; color:var(--primary);">$${p.price}</span>
               </div>
               <div style="margin-bottom:1rem; font-size:0.9rem; color:#f59e0b;">
                 ${renderStars(p.rating)}
               </div>
               <p style="font-size:0.9rem; color:#6b7280; flex:1; overflow:hidden; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; margin-bottom:1.5rem;">
                 ${p.description}
               </p>
               <a href="/products/${p.id}" class="btn btn-primary" style="width:100%; justify-content:center;" data-link>View Details</a>
             </div>
           </div>
         `).join('')}
       </div>
    </div>`;
};
