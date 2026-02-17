/**
 * Test Suite: API Service
 * Tests the API service layer's environment detection, mock data fallback,
 * and error handling capabilities
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from '../services/api.js';
import { mockData } from '../services/mocks.js';
import axios from 'axios';
import { toast } from '../utils/toast.js';

// Mock axios HTTP client to intercept network calls
vi.mock('axios', () => ({
    default: {
        get: vi.fn(),
        post: vi.fn(),
        put: vi.fn(),
        delete: vi.fn()
    }
}));

// Mock toast notification system to verify error messages
vi.mock('../utils/toast.js', () => ({
    toast: {
        show: vi.fn()
    }
}));

/**
 * Test Suite: Environment Detection Logic
 * Verifies that the API service correctly detects production vs local environments
 * and falls back to mock data when running on GitHub Pages
 */
describe('apiService - Environment Logic', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        Object.defineProperty(window, 'location', {
            value: { hostname: 'your-username.github.io' },
            writable: true
        });
    });

    /**
     * Test: Production mode GET requests use mock data
     * Ensures that when deployed to GitHub Pages (production),
     * the app serves mock data instead of attempting real API calls
     */
    it('should use mock data in production mode for GET requests', async () => {
        const posts = await api.get('/posts');
        expect(posts).toEqual(mockData.posts);
    });

    /**
     * Test: Query mock users by email in production
     * Verifies that email-based filtering works correctly in mock mode
     */
    it('should return mock user by email in production mode', async () => {
        const adminEmail = "admin@refai.code";
        const result = await api.get(`/users?email=${adminEmail}`);
        expect(result.length).toBe(1);
        expect(result[0].email).toBe(adminEmail);
    });

    /**
     * Test: POST requests in production return success simulation
     * Since GitHub Pages is read-only, POST operations return the data
     * with a success toast instead of actually persisting it
     */
    it('should simulate successful POST in production mode', async () => {
        const data = { title: 'New Post' };
        const result = await api.post('/posts', data);
        expect(result).toEqual(data);
    });
});

/**
 * Test Suite: Error Handling & Network Failures
 * Verifies that the API service correctly handles network errors,
 * offline scenarios, and displays appropriate user feedback via toasts
 */
describe('apiService - Error Handling & Offline Simulation', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        Object.defineProperty(window, 'location', {
            value: { hostname: 'localhost' },
            writable: true
        });
    });

    /**
     * Test: Network error handling and toast notification
     * Simulates an offline scenario where axios throws a network error
     * Verifies that the error is caught and a toast notification is shown to the user
     */
    it('should handle network errors (offline simulation) via toast', async () => {
        axios.get.mockRejectedValue(new Error('Network Error'));

        await expect(api.get('/posts')).rejects.toThrow('Network Error');
        expect(toast.show).toHaveBeenCalledWith('Network Error', 'error');
    });

    /**
     * Test: Server error messages are extracted and displayed
     * Verifies that when the server returns a custom error message,
     * it is properly extracted from the response and shown via toast notification
     */
    it('should handle specific API error messages from server', async () => {
        const errorResponse = {
            response: {
                data: { message: 'Custom Server Error' }
            }
        };
        axios.get.mockRejectedValue(errorResponse);

        await expect(api.get('/invalid')).rejects.toEqual(errorResponse);
        expect(toast.show).toHaveBeenCalledWith('Custom Server Error', 'error');
    });
});
