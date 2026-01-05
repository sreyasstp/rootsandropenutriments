import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // 👈 THIS FIXES /index.html URL ISSUE
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
