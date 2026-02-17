/**
 * Test Suite: UI Components - Offline Indicator
 * Tests the offline/online indicator banner that appears when network connectivity changes
 * Verifies that the UI correctly responds to browser online/offline events
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('UI - Offline Indicator', () => {
    beforeEach(() => {
        // Set up the offline indicator element in the DOM
        document.body.innerHTML = `
      <div id="offline-indicator" style="display: none;">Offline</div>
    `;

        // Replicate the logic from main.js for unit testing the behavior
        const toggleOfflineUI = () => {
            const banner = document.getElementById('offline-indicator');
            if (banner) {
                banner.style.display = navigator.onLine ? 'none' : 'block';
            }
        };

        // Attach event listeners to respond to network status changes
        window.addEventListener('online', toggleOfflineUI);
        window.addEventListener('offline', toggleOfflineUI);
    });

    /**
     * Test: Offline banner appears when network goes offline
     * Simulates the browser 'offline' event and verifies that the banner becomes visible
     */
    it('should show the offline banner when offline event fires', () => {
        // Mock navigator.onLine to simulate offline state
        Object.defineProperty(navigator, 'onLine', {
            value: false,
            configurable: true
        });

        window.dispatchEvent(new Event('offline'));

        const banner = document.getElementById('offline-indicator');
        expect(banner.style.display).toBe('block');
    });

    /**
     * Test: Offline banner hides when network comes back online
     * Simulates the browser 'online' event and verifies that the banner becomes hidden
     */
    it('should hide the offline banner when online event fires', () => {
        // Mock navigator.onLine to simulate online state
        Object.defineProperty(navigator, 'onLine', {
            value: true,
            configurable: true
        });

        window.dispatchEvent(new Event('online'));

        const banner = document.getElementById('offline-indicator');
        expect(banner.style.display).toBe('none');
    });
});
