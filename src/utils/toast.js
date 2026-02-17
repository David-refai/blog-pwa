/**
 * Toast notification system for displaying temporary messages
 * Creates a floating notification that auto-dismisses after 3 seconds
 */
export const toast = {
  /**
   * Displays a toast notification message
   * @param {string} msg - The message to display
   * @param {string} type - Type of notification: 'success' (green) or 'error' (red)
   */
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
    // Auto-remove after 3 seconds with fade-out animation
    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(-20px)';
      el.style.transition = 'all 0.3s';
      setTimeout(() => el.remove(), 300);
    }, 3000);
  }
};
