# Project Report: Blog PWA with automated CI/CD

## 📝 Overview
This project is an enhanced **Progressive Web App (PWA)** built with a clean MVC-like architecture. It features a fully automated testing and deployment pipeline using GitHub Actions, Vitest, and GitHub Pages.

## 🚀 Key Features

### 1. Progressive Web App (PWA)
- **Offline Readiness**: Configured via `vite-plugin-pwa` to cache critical assets.
- **Installable**: Includes a full manifest and service worker registration.
- **Read-Only Mode**: Specifically designed for static hosting (GitHub Pages) by using a smart mocking system.

### 2. Architecture & Service Layer
- **Environment Detection**: The `api.js` service automatically detects if it's running locally (connecting to `json-server`) or in production (falling back to `mocks.js`).
- **Mock System**: Provides a seamless user experience on GitHub Pages without requiring a live backend.

### 3. Automated Testing (Vitest)
- **Comprehensive Coverage**:
    - **Authentication**: Verified login/signup logic and local storage persistence.
    - **API Logic**: Verified environment switching and data fetching.
    - **Error Handling**: Simulated network failures (offline) and server errors to verify robust user feedback (Toasts).
    - **Mock Validation**: Verified that the app correctly falls back to mock data in non-local environments.

### 4. CI/CD Pipeline
- **Continuous Integration (CI)**: GitHub Actions runs all tests on every push.
- **Continuous Deployment (CD)**: Successful tests on the `main` branch trigger an automatic build and deploy to GitHub Pages.

## 🛠 Tech Stack
- **Frontend**: Vanilla JS, Vite, Tailwind CSS.
- **Testing**: Vitest, JSDOM, Testing Library.
- **DevOps**: GitHub Actions.
- **Mocking**: Custom Service Layer Mocks.

## 📊 Development Process (Reflection)
The work was carried out in logical phases:
1.  **Foundation**: Setting up the base MVP.
2.  **Infrastructure**: Integrating testing and automated workflows.
3.  **Enhancement**: Implementing the PWA features and environment-aware API.
4.  **Verification**: Iterative testing and fixing deployment hurdles (base path and routing).

## 🔗 Live Link
[https://david-refai.github.io/blog-pwa/](https://david-refai.github.io/blog-pwa/)
