import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// BASE_PATH é usado pelo GitHub Pages (site publicado em /vertice-motors/).
// Em Vercel, Netlify ou domínio próprio, deixe sem definir.
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
})
