/**
 * Test Suite: Authentication Service
 * Tests the login, signup, and session persistence functionality
 * Verifies that user authentication works correctly with localStorage
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authState } from '../services/auth.js';
import { api } from '../services/api.js';

// Mock the API service to control authentication responses
vi.mock('../services/api.js', () => ({
    api: {
        get: vi.fn(),
        post: vi.fn(),
        put: vi.fn(),
        delete: vi.fn()
    }
}));

// Mock toast to verify user feedback on auth errors
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

    /**
     * Test: Successful login with valid credentials
     * Verifies that when correct email and password are provided:
     * - The user is authenticated
     * - User data is stored in authState
     * - Session is persisted to localStorage
     */
    it('should login successfully with correct credentials', async () => {
        const mockUser = { id: 1, email: 'test@example.com', password: 'password', firstName: 'Test' };
        api.get.mockResolvedValue([mockUser]);

        const result = await authState.login('test@example.com', 'password');

        expect(result).toBe(true);
        expect(authState.user).toEqual(mockUser);
        expect(localStorage.getItem('user')).toBe(JSON.stringify(mockUser));
    });

    /**
     * Test: Login failure with incorrect password
     * Verifies that authentication fails when the password doesn't match
     * and that no user session is created
     */
    it('should fail login with incorrect password', async () => {
        const mockUser = { id: 1, email: 'test@example.com', password: 'password' };
        api.get.mockResolvedValue([mockUser]);

        const result = await authState.login('test@example.com', 'wrongpassword');

        expect(result).toBe(false);
        expect(authState.user).toBeNull();
    });

    /**
     * Test: Login failure when user doesn't exist
     * Verifies that authentication fails when the email is not found in the system
     */
    it('should fail login if user not found', async () => {
        api.get.mockResolvedValue([]);

        const result = await authState.login('nonexistent@example.com', 'password');

        expect(result).toBe(false);
        expect(authState.user).toBeNull();
    });

    /**
     * Test: Successful user registration
     * Verifies that new users can sign up when their email is not already registered
     * Confirms that user data is created with avatar and proper structure
     */
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

    /**
     * Test: Signup failure when email already exists
     * Verifies that duplicate email registrations are prevented
     * and that no API POST call is made
     */
    it('should fail signup if email already exists', async () => {
        api.get.mockResolvedValue([{ id: 1, email: 'exists@example.com' }]);

        const signupData = { email: 'exists@example.com', firstName: 'New', lastName: 'User' };
        const result = await authState.signup(signupData);

        expect(result).toBe(false);
        expect(api.post).not.toHaveBeenCalled();
    });
});
