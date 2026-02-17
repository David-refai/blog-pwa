/**
 * Sanitizes user input by escaping HTML special characters
 * This prevents XSS attacks by converting HTML entities
 * @param {string} str - The input string to sanitize
 * @returns {string} The sanitized string safe for HTML insertion
 */
export const sanitize = (str) => {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
};

/**
 * Renders a visual star rating display
 * Converts a numeric rating (1-5) into HTML star symbols
 * @param {number} rating - The rating value (typically 1-5)
 * @returns {string} HTML string with colored star symbols
 */
export const renderStars = (rating) => {
  const stars = Math.round(rating);
  let html = '';
  for (let i = 1; i <= 5; i++) {
    html += `<span style="color: ${i <= stars ? '#f59e0b' : '#d1d5db'}">★</span>`;
  }
  return html;
};

/**
 * Utility function to pause execution for a specified time
 * Useful for testing async operations and creating delays
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise<void>} Promise that resolves after the delay
 */
export const sleep = (ms) => new Promise(r => setTimeout(r, ms));
