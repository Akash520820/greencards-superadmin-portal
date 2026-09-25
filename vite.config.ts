import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/greencards-superadmin-portal/',
  server: {
    port: 5176,
    open: true,
  },
});
