/**
 * Test Suite: Post Management Features
 * Tests Create, Read, and Edit functionality for blog posts
 * Verifies that post pages correctly handle authentication and form submissions
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from '../services/api.js';
import { authState } from '../services/auth.js';
import { CreatePostPage } from '../pages/CreatePostPage.js';
import { PostDetailsPage } from '../pages/PostDetailsPage.js';
import { EditPostPage } from '../pages/EditPostPage.js';

// Mock API service with predefined successful responses and sample post data
vi.mock('../services/api.js', () => ({
    api: {
        post: vi.fn().mockResolvedValue({ success: true }),
        put: vi.fn().mockResolvedValue({ success: true }),
        get: vi.fn().mockResolvedValue({
            id: '1',
            title: 'Mock Post',
            excerpt: 'Mock Excerpt',
            content: 'Mock Content',
            author: 'David Refai',
            date: '2026-02-17',
            image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'
        })
    }
}));

// Mock authenticated user for testing auth-protected pages
vi.mock('../services/auth.js', () => ({
    authState: {
        user: { id: 1, firstName: 'David', lastName: 'Refai' }
    }
}));

/**
 * Test Suite: Post Details Page
 * Tests the post viewing functionality
 */
describe('PostDetailsPage', () => {
    /**
     * Test: Correct API call with post ID from URL params
     * Verifies that the page extracts the post ID from route params
     * and fetches the correct post data
     */
    it('should correctly extract id from params and fetch post data', async () => {
        const params = { id: '123' };
        await PostDetailsPage({ params });

        expect(api.get).toHaveBeenCalledWith('/posts/123');
    });
});

describe('CreatePostPage', () => {
    beforeEach(() => {
        document.body.innerHTML = '<div id="app"></div>';
        vi.clearAllMocks();
    });

    /**
     * Test: Create post form renders for authenticated users
     * Verifies that logged-in users can access the create post form
     * and all required input fields are present
     */
    it('should render the create post form for authenticated users', async () => {
        const html = await CreatePostPage();
        document.getElementById('app').innerHTML = html;

        expect(document.querySelector('h1').textContent).toBe('Create New Post');
        expect(document.getElementById('create-post-form')).not.toBeNull();
        expect(document.querySelector('input[name="title"]')).not.toBeNull();
    });

    /**
     * Test: Access denied for unauthenticated users
     * Verifies that users who are not logged in cannot access
     * the create post page and see an appropriate error message
     */
    it('should deny access for unauthenticated users', async () => {
        const originalUser = authState.user;
        authState.user = null;

        const html = await CreatePostPage();
        document.getElementById('app').innerHTML = html;

        expect(document.querySelector('h1').textContent).toBe('Access Denied');
        expect(document.getElementById('create-post-form')).toBeNull();

        authState.user = originalUser;
    });

    /**
     * Test: Form submission creates a new post
     * Verifies that when the create post form is submitted,
     * the API is called with the correct post data including title, content, and author
     */
    it('should call api.post with correct data on form submission', async () => {
        const html = await CreatePostPage();
        document.getElementById('app').innerHTML = html;

        const form = document.getElementById('create-post-form');
        const titleInput = document.querySelector('input[name="title"]');
        const contentInput = document.querySelector('textarea[name="content"]');

        titleInput.value = 'Test Title';
        contentInput.value = 'Test Content Body';

        const event = new Event('submit', { cancelable: true });
        form.dispatchEvent(event);

        await new Promise(r => setTimeout(r, 10));

        if (form.onsubmit) {
            await form.onsubmit(event);
        }

        expect(api.post).toHaveBeenCalledWith('/posts', expect.objectContaining({
            title: 'Test Title',
            content: 'Test Content Body',
            author: 'David Refai'
        }));
    });
});

describe('EditPostPage', () => {
    beforeEach(() => {
        document.body.innerHTML = '<div id="app"></div>';
        vi.clearAllMocks();
    });

    /**
     * Test: Edit page fetches existing post data
     * Verifies that the edit page loads the current post data
     * and pre-fills the form with existing values
     */
    it('should fetch existing post and render the edit form', async () => {
        const params = { id: '1' };
        const html = await EditPostPage({ params });
        document.getElementById('app').innerHTML = html;

        expect(api.get).toHaveBeenCalledWith('/posts/1');
        expect(document.querySelector('h1').textContent).toBe('Edit Post');
        expect(document.querySelector('input[name="title"]').value).toBe('Mock Post');
    });

    /**
     * Test: Edit form submission updates the post
     * Verifies that when the edit form is submitted,
     * the API is called with PUT method and the updated data
     */
    it('should call api.put with updated data on form submission', async () => {
        const params = { id: '1' };
        const html = await EditPostPage({ params });
        document.getElementById('app').innerHTML = html;

        const form = document.getElementById('edit-post-form');
        const titleInput = document.querySelector('input[name="title"]');

        titleInput.value = 'Updated Title';

        const event = new Event('submit', { cancelable: true });
        form.dispatchEvent(event);

        await new Promise(r => setTimeout(r, 10));

        if (form.onsubmit) {
            await form.onsubmit(event);
        }

        expect(api.put).toHaveBeenCalledWith('/posts/1', expect.objectContaining({
            title: 'Updated Title'
        }));
    });
});
