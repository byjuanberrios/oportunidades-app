# Aplicación de Oportunidades

Este repositorio contiene una aplicación full-stack para gestionar oportunidades, con un frontend en React (Vite) y un backend en Node.js (Express) con TypeScript.

## Requisitos Previos

- Node.js (v18 o superior)
- npm o yarn
- PostgreSQL (v14 o superior)

## Configuración de la Base de Datos

1. Ejecutar PostgreSQL
2. Cargar la base de datos PostgreSQL
3. La aplicación se conectará automáticamente a la base de datos utilizando las credenciales configuradas en el archivo `.env` del backend.

## Configuración del Backend

1. Navega al directorio del backend:

```bash
cd backend
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` basado en el ejemplo:

```bash
cp .env.example .env
```

4. Edita el archivo `.env` con tus credenciales de PostgreSQL

5. Inicia el servidor de desarrollo:

```bash
npm run dev
```

El servidor backend estará ejecutándose en `http://localhost:3000`.

## Configuración del Frontend

1. Navega al directorio del frontend:

```bash
cd frontend
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` basado en el ejemplo:

```bash
cp .env.example .env
```

4. Inicia el servidor de desarrollo:

```bash
npm run dev
```

El frontend estará ejecutándose en `http://localhost:5173` (o el puerto que Vite asigne).

Los archivos compilados se encontrarán en el directorio `frontend/dist` y pueden ser servidos por cualquier servidor web estático.

## Estructura del Proyecto

- `backend/`: Contiene el código del servidor API con Express y TypeScript
- `frontend/`: Contiene la aplicación de React con TypeScript

## Notas Importantes

- Asegúrate de que PostgreSQL esté ejecutándose antes de iniciar el backend
- Por defecto, el frontend intentará conectarse al backend en `http://localhost:3000/api`
- Si cambias el puerto del backend, asegúrate de actualizar la variable `VITE_API_URL` en el archivo `.env` del frontend
