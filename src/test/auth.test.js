import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authState } from '../services/auth.js';
import { api } from '../services/api.js';

vi.mock('../services/api.js', () => ({
    api: {
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

describe('authService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
        authState.user = null;
    });

    it('should login successfully with correct credentials', async () => {
        const mockUser = { id: 1, email: 'test@example.com', password: 'password', firstName: 'Test' };
        api.get.mockResolvedValue([mockUser]);

        const result = await authState.login('test@example.com', 'password');

        expect(result).toBe(true);
        expect(authState.user).toEqual(mockUser);
        expect(localStorage.getItem('user')).toBe(JSON.stringify(mockUser));
    });

    it('should fail login with incorrect password', async () => {
        const mockUser = { id: 1, email: 'test@example.com', password: 'password' };
        api.get.mockResolvedValue([mockUser]);

        const result = await authState.login('test@example.com', 'wrongpassword');

        expect(result).toBe(false);
        expect(authState.user).toBeNull();
    });

    it('should fail login if user not found', async () => {
        api.get.mockResolvedValue([]);

        const result = await authState.login('nonexistent@example.com', 'password');

        expect(result).toBe(false);
        expect(authState.user).toBeNull();
    });

    it('should signup successfully if email is not registered', async () => {
        api.get.mockResolvedValue([]);
        api.post.mockResolvedValue({ id: 2, email: 'new@example.com' });

        const signupData = { email: 'new@example.com', firstName: 'New', lastName: 'User' };
        const result = await authState.signup(signupData);

        expect(result).toBe(true);
        expect(api.post).toHaveBeenCalledWith('/users', expect.objectContaining({
            email: 'new@example.com',
            avatar: expect.stringContaining('ui-avatars.com')
        }));
    });

    it('should fail signup if email already exists', async () => {
        api.get.mockResolvedValue([{ id: 1, email: 'exists@example.com' }]);

        const signupData = { email: 'exists@example.com', firstName: 'New', lastName: 'User' };
        const result = await authState.signup(signupData);

        expect(result).toBe(false);
        expect(api.post).not.toHaveBeenCalled();
    });
});
