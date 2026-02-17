import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from '../services/api.js';
import { mockData } from '../services/mocks.js';

// No direct vi.mock for api.js here because we want to test its actual implementation
// However, we need to mock axios which api.js uses

vi.mock('axios', () => ({
    default: {
        get: vi.fn(),
        post: vi.fn(),
        put: vi.fn(),
        delete: vi.fn()
    }
}));

describe('apiService - Environment Logic', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Simulate production environment (non-localhost)
        Object.defineProperty(window, 'location', {
            value: { hostname: 'your-username.github.io' },
            writable: true
        });
    });

    it('should use mock data in production mode for GET requests', async () => {
        // Force hostname to be something other than localhost to trigger production mode simulation if needed
        // In our implementation, isProduction depends on import.meta.env.PROD || hostname !== 'localhost'
        // Since we are running in vitest, we can check how isProduction is evaluated.

        // For GET /products, it should return mockData.products without calling axios
        const products = await api.get('/products');
        expect(products).toEqual(mockData.products);
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
