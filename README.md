# CIRCUIT AI Support

Propuesta editorial para diseñar un circuito de atención asistido por IA, con respuestas sugeridas, revisión humana y escalado de casos sensibles.

Este repositorio contiene un brief interactivo de investigación. No implementa llamadas a modelos, un chat operativo, envío de correo ni integración con Gmail. Los modelos, precios, puntuaciones y plantillas de la interfaz son ejemplos de trabajo que deben validarse antes de usarlos en una operación real.

## Tecnología

- React 19 y Vite para la interfaz.
- Express para servir el build estático en producción.
- Pruebas con el ejecutor integrado de Node.js.
- Licencia MIT.

## Requisitos

- Node.js 22.12 o posterior.
- pnpm 10.4.1, fijado en `package.json`.

## Desarrollo

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

## Comprobaciones

```bash
pnpm check
pnpm test
pnpm build
```

`pnpm build` genera los assets web en `dist/public`, comprueba que el colector de depuración no se publique y compila el servidor Express. Para ejecutar la versión compilada:

```bash
pnpm start
```

El servidor escucha en el puerto definido por `PORT` o en el 3000 por defecto.

## Colector de depuración opcional

El colector está desactivado por defecto. Si necesitas investigar el comportamiento local, inicia Vite con:

```bash
MANUS_DEBUG_COLLECTOR=1 pnpm dev
```

Esta herramienta puede guardar consola del navegador, payloads de red y eventos de sesión en `.manus-logs/`. Evita usarla con datos personales o conversaciones reales.
