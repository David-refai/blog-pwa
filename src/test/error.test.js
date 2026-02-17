/**
 * Test Suite: Error Handling
 * Tests that all pages correctly handle and display errors when API calls fail
 * Verifies proper error UI and user feedback for different error scenarios
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from '../services/api.js';
import { BlogPage } from '../pages/BlogPage.js';
import { PostDetailsPage } from '../pages/PostDetailsPage.js';
import { CreatePostPage } from '../pages/CreatePostPage.js';

// Mock API to simulate failures
vi.mock('../services/api.js', () => ({
    api: {
        get: vi.fn(),
        post: vi.fn()
    }
}));

// Mock authenticated user for form submission tests
vi.mock('../services/auth.js', () => ({
    authState: {
        user: { id: 1, firstName: 'David', lastName: 'Refai' }
    }
}));

describe('Global Error Handling', () => {
    beforeEach(() => {
        document.body.innerHTML = '<div id="app"></div>';
        vi.clearAllMocks();
    });

    /**
     * Test: BlogPage displays error UI when API fails
     * Simulates a network failure and verifies that:
     * - An error message is displayed instead of the blog list
     * - The specific error message is shown to the user
     */
    it('BlogPage should render error UI when API fails', async () => {
        api.get.mockRejectedValueOnce(new Error('Network failure'));

        const html = await BlogPage();
        document.getElementById('app').innerHTML = html;

        expect(document.querySelector('h2').textContent).toBe('Oops! Something went wrong');
        expect(document.body.innerHTML).toContain('Network failure');
    });

    /**
     * Test: PostDetailsPage shows specific 404 error message
     * Simulates a 404 response and verifies that:
     * - A user-friendly "Article Not Found" message is shown
     * - The error is distinguished from generic network errors
     */
    it('PostDetailsPage should render specific error for 404', async () => {
        const error = new Error('Not Found');
        error.response = { status: 404 };
        api.get.mockRejectedValueOnce(error);

        const html = await PostDetailsPage({ params: { id: '999' } });
        document.getElementById('app').innerHTML = html;

        expect(document.querySelector('h1').textContent).toBe('Article Not Found');
    });

    /**
     * Test: CreatePostPage shows inline error message on submission failure
     * Simulates a server error during post creation and verifies that:
     * - The error is shown inline in the form (not page-wide)
     * - The specific error message is displayed to help the user retry
     * - The form remains accessible for corrections
     */
    it('CreatePostPage should show error message in form on submission failure', async () => {
        api.post.mockRejectedValueOnce(new Error('Server Error 500'));

        const html = await CreatePostPage();
        document.getElementById('app').innerHTML = html;

        // Wait for setTimeout in CreatePostPage to run (event handler attachment)
        await new Promise(r => setTimeout(r, 0));

        const form = document.getElementById('create-post-form');
        document.querySelector('input[name="title"]').value = 'Test Title';
        document.querySelector('textarea[name="content"]').value = 'Test Content';

        const event = new Event('submit', { cancelable: true });

        // Trigger submission
        if (form.onsubmit) {
            await form.onsubmit(event);
        }

        // Wait another tick for DOM update
        await new Promise(r => setTimeout(r, 0));

        const errorEl = document.getElementById('form-error');
        expect(errorEl.textContent).toContain('Server Error 500');
    });
});
