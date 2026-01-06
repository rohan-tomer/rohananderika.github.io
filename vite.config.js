import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
  plugins: [svelte()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        travel: 'travel.html',
        reception: 'reception.html',
      }
    }
  },
  base: '/',
  // DISABLED
  // server: {
  //   proxy: isProduction ? {} : {
  //     '/api': {
  //       target: 'https://script.google.com',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, '/macros/s/AKfycbw6cgPUNc-I_bMIr6U_CMWr3w0PvBBSu7RcJr-mguToqLCO6glkpTnXNIoiaboi0fQFMQ/exec')
  //     }
  //   }
  // }
})