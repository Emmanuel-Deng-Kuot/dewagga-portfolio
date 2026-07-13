import { defineConfig } from 'vite';
import { resolve } from 'node:path';

const redirectToHome = () => ({
  name: 'redirect-root-to-home',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === '/' || req.url === '/#') {
        res.statusCode = 302;
        res.setHeader('Location', '/home.html');
        res.end();
        return;
      }
      next();
    });
  },
  configurePreviewServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === '/' || req.url === '/#') {
        res.statusCode = 302;
        res.setHeader('Location', '/home.html');
        res.end();
        return;
      }
      next();
    });
  },
});

export default defineConfig({
  plugins: [redirectToHome()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'home.html'),
        aboutMe: resolve(__dirname, 'pages/about-me.html'),
        contact: resolve(__dirname, 'pages/contact.html'),
        services: resolve(__dirname, 'pages/services.html'),
        learning: resolve(__dirname, 'pages/learning.html'),
        learningDetails: resolve(__dirname, 'pages/learning-details.html'),
        error: resolve(__dirname, 'pages/error.html'),
      },
    },
  },
});