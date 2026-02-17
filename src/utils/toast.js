export const toast = {
  show: (msg, type = 'error') => {
    const el = document.createElement('div');
    const color = type === 'success' ? '#10b981' : '#ef4444';
    el.style.cssText = `
      position: fixed; top: 20px; right: 20px;
      background: ${color}; color: white; padding: 1rem 1.5rem;
      border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 9999; animation: slideIn 0.3s ease-out; font-weight: 500;
    `;
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(-20px)';
      el.style.transition = 'all 0.3s';
      setTimeout(() => el.remove(), 300);
    }, 3000);
  }
};
