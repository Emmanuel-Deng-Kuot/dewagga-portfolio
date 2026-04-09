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
      },
    },
  },
});