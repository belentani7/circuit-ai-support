# CIRCUIT AI Support · Research Brief

Archivo editorial interactivo sobre cómo implantar asistencia por IA con revisión humana. No es un chatbot con backend ni un servicio automático de correo: la interfaz actual muestra una arquitectura de referencia, una comparación histórica de modelos y plantillas de respuestas que el visitante puede copiar manualmente.

## Funcionalidad disponible

La copia de plantillas muestra confirmación solo si el navegador realmente copió el texto; si falla, ofrece un error visible y una ruta alternativa. La compilación rechaza debug collectors en assets públicos.
- Página de inicio con resumen, circuito de decisión, catálogo de plantillas, protocolos y guardrails.
- Navegación adaptable a móvil.
- Selección de propuestas y copia de plantillas en el navegador (sin envío ni almacenamiento en servidor).
- Ilustraciones SVG propias, accesibles y disponibles sin depender de almacenamiento de Manus.
- Sin inyección de analítica por variables no configuradas; eliminados los plugins de telemetría, captura de consola y grabación de sesiones de la configuración de Vite.

## Ejecutar

Node.js 24 y pnpm 10.4.1 (declarado en `package.json`).

```bash
corepack enable
corepack prepare pnpm@10.4.1 --activate
pnpm install --frozen-lockfile
pnpm run check
pnpm run build
pnpm run start
```

El build genera frontend en `dist/public` y servidor Express en `dist/index.js`; por defecto, el servidor escucha en el puerto 3000. Para desarrollo: `pnpm run dev`.

La orden `pnpm run start` utiliza `node dist/index.js` y funciona igual en Windows y sistemas POSIX. El servidor encuentra los archivos ya compilados junto al ejecutable, sin exigir `NODE_ENV` en la shell. Las respuestas HTML, los recursos estáticos y los errores incluyen cabeceras de seguridad: CSP sin scripts externos, bloqueo de iframes, `nosniff`, política de referentes y permisos limitados. La hoja de Google Fonts y sus archivos de fuentes están permitidos expresamente; el prototipo sigue sin API de envío, correo ni procesamiento de datos de usuarios.


## Honestidad comercial y actualización

- Precios, fichas y puntuaciones de modelos son **referencias históricas**: no son ofertas ni benchmarks validados en tiempo real.
- La integración Gmail, agentes y automatización de respuestas **no está implementada** en este repositorio.
- Las plantillas requieren aprobación humana. No se efectúa envío automático.
- Para convertir este informe en producto comercial faltan autenticación, integraciones reales, políticas de retención, API, observabilidad, pruebas de extremo a extremo y una revisión jurídica y de privacidad.

## Lanzamiento

El workflow `.github/workflows/ci.yml` debe pasar instalación congelada, TypeScript, build y existencia de recursos en el paquete. La rama de rescate no se considera publicada en producción hasta verificar estas pruebas y un despliegue funcional.
