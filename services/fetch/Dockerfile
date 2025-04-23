# syntax=docker/dockerfile:1
FROM node:23.9.0
RUN apt-get update
RUN apt-get install -y curl bash gnupg lsb-release less poppler-utils
RUN npm install -g tsx
RUN curl -fsSL https://packages.redis.io/gpg | gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
RUN echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | tee /etc/apt/sources.list.d/redis.list
RUN apt-get update
RUN apt-get install -y redis-server 
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD npx dotenvx run -- tsx /app/services/fetch/fetch.ts 2>&1 | tee /tmp/fetch.log