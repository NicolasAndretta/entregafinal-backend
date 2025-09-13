# -------------------------------
# Dockerfile para entrega final
# -------------------------------
FROM node:20-alpine

# Crear carpeta de la app
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json primero (mejor cacheo)
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Puerto expuesto
EXPOSE 8080

# Comando de arranque
CMD ["npm", "start"]
