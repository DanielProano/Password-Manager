FROM node:22.17.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV=production

EXPOSE 8080

CMD ["sh", "-c", "if [ \"$NODE_ENV\" = 'development' ]; then npx nodemon server.js; else npm start; fi"]
