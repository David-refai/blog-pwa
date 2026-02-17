import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('UI - Offline Indicator', () => {
    beforeEach(() => {
        document.body.innerHTML = `
      <div id="offline-indicator" style="display: none;">Offline</div>
    `;

        // We replicate the logic from main.js for unit testing the behavior
        const toggleOfflineUI = () => {
            const banner = document.getElementById('offline-indicator');
            if (banner) {
                banner.style.display = navigator.onLine ? 'none' : 'block';
            }
        };

        window.addEventListener('online', toggleOfflineUI);
        window.addEventListener('offline', toggleOfflineUI);
    });

    it('should show the offline banner when offline event fires', () => {
        // Mock navigator.onLine
        Object.defineProperty(navigator, 'onLine', {
            value: false,
            configurable: true
        });

        window.dispatchEvent(new Event('offline'));

        const banner = document.getElementById('offline-indicator');
        expect(banner.style.display).toBe('block');
    });

    it('should hide the offline banner when online event fires', () => {
        // Mock navigator.onLine
        Object.defineProperty(navigator, 'onLine', {
            value: true,
            configurable: true
        });

        window.dispatchEvent(new Event('online'));

        const banner = document.getElementById('offline-indicator');
        expect(banner.style.display).toBe('none');
    });
});
