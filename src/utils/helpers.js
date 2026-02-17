export const sanitize = (str) => {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
};

export const renderStars = (rating) => {
  const stars = Math.round(rating);
  let html = '';
  for (let i = 1; i <= 5; i++) {
    html += `<span style="color: ${i <= stars ? '#f59e0b' : '#d1d5db'}">★</span>`;
  }
  return html;
};

export const sleep = (ms) => new Promise(r => setTimeout(r, ms));
