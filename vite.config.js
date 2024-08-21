import path from "path";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import eslintPlugin from 'vite-plugin-eslint'
import { version } from './package.json';
// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __APP_VERSION : JSON.stringify(version),
  },
  plugins: [
    react(), 
  //  eslintPlugin({
  //   cache: false,
  //   include: ['./src/**/*.js', './src/**/*.jsx'],
  //   exclude: [],
  // })
],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
})


