FROM node:20-alpine

RUN mkdir -p /app

EXPOSE 8888

WORKDIR /app

COPY package*.json .
RUN chmod 777 -R /app
RUN npm install --quiet --no-progress && npm cache clean --force

COPY . .

CMD ["node", "index.js"]