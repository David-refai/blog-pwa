import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from '../services/api.js';
import { mockData } from '../services/mocks.js';
import axios from 'axios';
import { toast } from '../utils/toast.js';

vi.mock('axios', () => ({
    default: {
        get: vi.fn(),
        post: vi.fn(),
        put: vi.fn(),
        delete: vi.fn()
    }
}));

vi.mock('../utils/toast.js', () => ({
    toast: {
        show: vi.fn()
    }
}));

describe('apiService - Environment Logic', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        Object.defineProperty(window, 'location', {
            value: { hostname: 'your-username.github.io' },
            writable: true
        });
    });

    it('should use mock data in production mode for GET requests', async () => {
        const posts = await api.get('/posts');
        expect(posts).toEqual(mockData.posts);
    });

    it('should return mock user by email in production mode', async () => {
        const adminEmail = "admin@refai.code";
        const result = await api.get(`/users?email=${adminEmail}`);
        expect(result.length).toBe(1);
        expect(result[0].email).toBe(adminEmail);
    });

    it('should simulate successful POST in production mode', async () => {
        const data = { title: 'New Post' };
        const result = await api.post('/posts', data);
        expect(result).toEqual(data);
    });
});

describe('apiService - Error Handling & Offline Simulation', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        Object.defineProperty(window, 'location', {
            value: { hostname: 'localhost' },
            writable: true
        });
    });

    it('should handle network errors (offline simulation) via toast', async () => {
        axios.get.mockRejectedValue(new Error('Network Error'));

        await expect(api.get('/posts')).rejects.toThrow('Network Error');
        expect(toast.show).toHaveBeenCalledWith('Network Error', 'error');
    });

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
