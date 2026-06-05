import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: 'apps/poster',
  base: './',
  build: {
    outDir: '../../dist',
    emptyOutDir: true
  },
  server: {
    fs: { allow: ['../..'] }
  }
});
