# Refai.Code - Blog PWA

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Vitest](https://img.shields.io/badge/tested%20with-Vitest-yellow)
![Deploy](https://github.com/David-refai/blog-pwa/actions/workflows/deploy.yml/badge.svg)

A modern, professional **Progressive Web App (PWA)** built with Vanilla JavaScript, focusing on performance, automated testing, and seamless CI/CD.

## 🔗 Live Demo
Check out the live version here: **[https://david-refai.github.io/blog-pwa/](https://david-refai.github.io/blog-pwa/)**

---

## 🚀 Key Features

### 🛠 Technical Excellence
- **PWA Ready**: Installable on mobile and desktop with offline support.
- **MVC Architecture**: Clean separation of concerns for maintainable code.
- **Smart Routing**: Custom SPA router that handles GitHub Pages subdirectories automatically.
- **Mock Service Layer**: Built-in production mocks for a fully functional "Read-Only" mode on static hosting.

### 🧪 Robust Testing & DevOps
- **Automated Testing**: Comprehensive unit and integration tests using **Vitest**.
- **CI/CD Pipeline**: 
  - **CI**: Automated testing on every pull request/push.
  - **CD**: Automated build and deployment to GitHub Pages upon successful tests.
- **Environment Aware**: Automatically switches between local `json-server` and production mocks.

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/David-refai/blog-pwa.git
   cd blog-pwa
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
To start the development server with a live JSON backend:
```bash
npm run dev:full
```
This runs both the Vite dev server and the `json-server` concurrently.

### Running Tests
Execute the full test suite:
```bash
npm test
```

---

## 📁 Project Structure

- `src/pwa/`: Service worker and PWA registration logic.
- `src/router/`: Custom SPA routing engine.
- `src/services/api.js`: Environment-aware API client.
- `src/test/`: Unit and integration tests.
- `REPORT.md`: Detailed technical project report.

---

## 📝 License
Built by David Refai as part of the Web Development curriculum.
MIT Licensed.
