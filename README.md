# OrnamentalBackMobile

🚜 Backend para el proyecto del carrito podador autónomo.  
Incluye control de sesiones de mapeo y corte, gestión de sensores, notificaciones, y generación automática de rutas de corte.  
Construido con **Node.js**, **TypeScript**, **Express**, **MongoDB** y dockerizado para fácil despliegue en plataformas como **Railway**.

---

## 📋 Características
- Gestión de sesiones: iniciar, actualizar, finalizar y eliminar sesiones.
- Registro y consulta de datos de sensores (temperatura, humedad, timestamp).
- Notificaciones de eventos como obstáculos, errores y mantenimiento.
- Generación de la ruta de corte a partir del mapeo en forma de zig-zag.
- Validación de datos con Joi.
- Seguridad básica con Helmet, rate limiting y CORS.
- Tests unitarios e integración con Jest, Supertest y mongodb-memory-server.

---

## 🛠️ Tecnologías
- Node.js + Express
- TypeScript
- MongoDB (Mongoose)
- Joi (validación)
- Jest + Supertest (tests)
- Docker

---

## 🚀 Cómo ejecutar

### Localmente
1️⃣ Clona el repositorio:
```bash
git clone https://github.com/tinocoAlexander/OrnamentalBackMobile.git
cd OrnamentalBackMobile
```
2️⃣ Instala las dependencias:
```
npm install
```
3️⃣ Crea un archivo .env con al menos:
```
PORT=3000
DATABASE_URL=<tu-URL-de-MongoDB>
```
4️⃣ Ejecuta en modo desarrollo:
```
npm run dev
```
5️⃣ Compilar y ejecutar en producción:
```
npm run build
npm start
```
Con Docker

1️⃣ Construye la imagen:
```
docker build -t ornamental-backend .
```
2️⃣ Ejecuta el contenedor:
```
docker run -d -p 3000:3000 --env-file .env ornamental-backend
```
En Railway

1️⃣ Sube el repositorio a GitHub.

2️⃣ Conéctalo a Railway.

3️⃣ Configura las variables de entorno (PORT, DATABASE_URL).

4️⃣ Railway construye y despliega automáticamente la app.

🧪 Tests

Para ejecutar los tests:
```
npm test
```
Incluyen pruebas para:

    Rutas y servicios de sesiones

    Rutas y servicios de sensores

    Rutas y servicios de notificaciones

    Rutas y servicio de generación de corte

📂 Estructura del proyecto
```
src/
├── __tests__/          # Tests
├── config/             # Configuración DB
├── controllers/        # Lógica de controladores
├── middlewares/        # Middlewares
├── models/             # Modelos Mongoose
├── routes/             # Endpoints
├── services/           # Lógica de negocio
├── utils/              # Utilidades
├── validations/        # Esquemas Joi
index.ts                # Punto de entrada
```
📄 Licencia

Este proyecto está liberado bajo la licencia Unlicense.
