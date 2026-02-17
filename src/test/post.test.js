import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from '../services/api.js';
import { authState } from '../services/auth.js';
import { CreatePostPage } from '../pages/CreatePostPage.js';
import { PostDetailsPage } from '../pages/PostDetailsPage.js';
import { EditPostPage } from '../pages/EditPostPage.js';

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

vi.mock('../services/auth.js', () => ({
    authState: {
        user: { id: 1, firstName: 'David', lastName: 'Refai' }
    }
}));

describe('PostDetailsPage', () => {
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

    it('should render the create post form for authenticated users', async () => {
        const html = await CreatePostPage();
        document.getElementById('app').innerHTML = html;

        expect(document.querySelector('h1').textContent).toBe('Create New Post');
        expect(document.getElementById('create-post-form')).not.toBeNull();
        expect(document.querySelector('input[name="title"]')).not.toBeNull();
    });

    it('should deny access for unauthenticated users', async () => {
        const originalUser = authState.user;
        authState.user = null;

        const html = await CreatePostPage();
        document.getElementById('app').innerHTML = html;

        expect(document.querySelector('h1').textContent).toBe('Access Denied');
        expect(document.getElementById('create-post-form')).toBeNull();

        authState.user = originalUser;
    });

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

    it('should fetch existing post and render the edit form', async () => {
        const params = { id: '1' };
        const html = await EditPostPage({ params });
        document.getElementById('app').innerHTML = html;

        expect(api.get).toHaveBeenCalledWith('/posts/1');
        expect(document.querySelector('h1').textContent).toBe('Edit Post');
        expect(document.querySelector('input[name="title"]').value).toBe('Mock Post');
    });

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
