FROM node:16

WORKDIR /usr/src/app-api-museum

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y git

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run build
EXPOSE 8080

# Start the application, 'npm start' or 'node src/index.js'
CMD ["npm", "run","start:prod"]

# docker build . -t img-node

# Chạy trên VPS đổi lại host: localhost thành ID của VPS

