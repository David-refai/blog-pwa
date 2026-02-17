export const DocsPage = async () => {
    return `
    <div class="container" style="padding: 4rem 2rem; max-width: 800px; margin: 0 auto;">
        <div class="glass-panel" style="padding: 3rem; background: white;">
            <h1 style="font-size: 2.5rem; margin-bottom: 2rem; border-bottom: 2px solid var(--primary); padding-bottom: 1rem;">
                Project Report & Documentation
            </h1>
            
            <section style="margin-bottom: 2.5rem;">
                <h2 style="color: var(--primary); margin-bottom: 1rem;">📝 Overview</h2>
                <p style="color: #4b5563; line-height: 1.7;">
                    This project is an enhanced <strong>Progressive Web App (PWA)</strong> built with a clean MVC-like architecture. It features a fully automated testing and deployment pipeline using GitHub Actions, Vitest, and GitHub Pages.
                </p>
            </section>

            <section style="margin-bottom: 2.5rem;">
                <h2 style="color: var(--primary); margin-bottom: 1rem;">🚀 Key Features</h2>
                <ul style="list-style-type: none; padding: 0;">
                    <li style="margin-bottom: 1rem; padding-left: 1.5rem; position: relative;">
                        <span style="position: absolute; left: 0; color: var(--primary);">✔</span>
                        <strong>Offline Readiness:</strong> Configured via Vite PWA to cache critical assets.
                    </li>
                    <li style="margin-bottom: 1rem; padding-left: 1.5rem; position: relative;">
                        <span style="position: absolute; left: 0; color: var(--primary);">✔</span>
                        <strong>Smart Routing:</strong> Handles subdirectory deployment on GitHub Pages seamlessly.
                    </li>
                    <li style="margin-bottom: 1rem; padding-left: 1.5rem; position: relative;">
                        <span style="position: absolute; left: 0; color: var(--primary);">✔</span>
                        <strong>Automated Testing:</strong> Robust test suite for Auth, API, and Error Handling.
                    </li>
                </ul>
            </section>

            <section style="margin-bottom: 2.5rem;">
                <h2 style="color: var(--primary); margin-bottom: 1rem;">🛠 Tech Stack</h2>
                <div style="display: flex; flex-wrap: wrap; gap: 0.8rem;">
                    <span style="background: #f3f4f6; padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.9rem;">Vanilla JS</span>
                    <span style="background: #f3f4f6; padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.9rem;">Vite</span>
                    <span style="background: #f3f4f6; padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.9rem;">Vitest</span>
                    <span style="background: #f3f4f6; padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.9rem;">PWA</span>
                    <span style="background: #f3f4f6; padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.9rem;">GitHub Actions</span>
                </div>
            </section>

            <div style="margin-top: 4rem; text-align: center;">
                <a href="/blog-pwa/" class="btn btn-primary" data-link>Back to Home</a>
            </div>
        </div>
    </div>
    `;
};
