import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const viteConfig = defineConfig({
  server: {
    host: 'localhost',
    port: 3000,
  },
  plugins: [react()],
})

// https://vitejs.dev/config/
export default viteConfig;
