import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
/**
 * Configuración del servidor de desarrollo para manejar proxy.
 * 
 * @property {object} proxy - Configura la redirección de solicitudes a una API externa.
 * @property {string} '/platform-api' - Define el prefijo de las rutas que se van a redirigir.
 * @property {string} target - La URL objetivo a la que se redirigirán las solicitudes con el prefijo definido.
 * @property {boolean} changeOrigin - Si es true, modifica el origen de la solicitud para que coincida con el target.
 * @property {boolean} secure - Si es false, permite realizar solicitudes a servidores HTTPS con certificados autofirmados.
 * 
 * Paso a paso:
 * 1. Cualquier solicitud que comience con '/platform-api' será redirigida a 'https://app.skyfi.com'.
 * 2. Se cambia el origen de la solicitud para que coincida con el dominio de destino (SkyFi).
 * 3. `secure: false` permite que las solicitudes pasen incluso si el servidor usa un certificado SSL no válido o autofirmado.
 */
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/platform-api': {
        target: 'https://app.skyfi.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})