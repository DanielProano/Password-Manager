FROM node:22.17.0-alpine
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci
#RUN npm install
COPY . .

ENV NODE_ENV=development
ENV PORT=8080

#CMD ["npm", "run", "dev" ]

CMD if [ "$NODE_ENV" = "production" ]; then npm start; else npm run dev; fi
