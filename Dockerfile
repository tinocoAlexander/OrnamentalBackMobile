# Usa una imagen ligera con Node y npm
FROM node:20-alpine

# Crea directorio de trabajo
WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Compila TypeScript
RUN npm run build

# Expone el puerto
EXPOSE 3000

# Arranca la app
CMD ["npm", "start"]
