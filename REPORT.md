# Projektrapport: Blog PWA med automatiserad CI/CD

## 📝 Översikt
Detta projekt är en förbättrad **Progressive Web App (PWA)** byggd med en ren MVC-liknande arkitektur. Den har en helt automatiserad test- och distributionspipeline som använder GitHub Actions, Vitest och GitHub Pages.

## 🚀 Huvudfunktioner

### 1. Progressive Web App (PWA)
- **Offlineberedskap**: Konfigurerad via `vite-plugin-pwa` för att cacha kritiska tillgångar.
- **Installerbar**: Inkluderar ett komplett manifest och registrering av service worker.
- **Skrivskyddat läge**: Särskilt utformad för statisk hosting (GitHub Pages) genom att använda ett smart mocksystem.

### 2. Arkitektur & Tjänstelager
- **Miljödetektering**: Tjänsten `api.js` detekterar automatiskt om den körs lokalt (ansluter till `json-server`) eller i produktion (faller tillbaka på `mocks.js`).
- **Mocksystem**: Ger en sömlös användarupplevelse på GitHub Pages utan att kräva en live backend.

### 3. Automatiserad testning (Vitest)
- **Omfattande täckning**:
    - **Autentisering**: Verifierad inloggnings-/registreringslogik och lokal lagringspersistens.
    - **API-logik**: Verifierad miljöväxling och datahämtning.
    - **Felhantering**: Simulerade nätverksfel (offline) och serverfel för att verifiera robust användarfeedback (Toasts).
    - **Mockvalidering**: Verifierat att appen korrekt faller tillbaka på mockdata i icke-lokala miljöer.

### 4. CI/CD-pipeline
- **Kontinuerlig integration (CI)**: GitHub Actions kör alla tester vid varje push.
- **Kontinuerlig distribution (CD)**: Lyckade tester på `main`-grenen utlöser automatisk bygge och distribution till GitHub Pages.

## 🛠 Teknikstack
- **Frontend**: Vanilla JS, Vite, Tailwind CSS.
- **Testning**: Vitest, JSDOM, Testing Library.
- **DevOps**: GitHub Actions.
- **Mocking**: Anpassade tjänstelagermocks.

## 📊 Utvecklingsprocess (Reflektion)
Arbetet utfördes i logiska faser:
1.  **Grund**: Att sätta upp bas-MVP.
2.  **Infrastruktur**: Integrering av testning och automatiserade arbetsflöden.
3.  **Förbättring**: Implementering av PWA-funktioner och miljömedveten API.
4.  **Verifiering**: Iterativ testning och fixande av distributionshinder (bassökväg och routing).

## 🔗 Live-länk
[https://david-refai.github.io/blog-pwa/](https://david-refai.github.io/blog-pwa/)
