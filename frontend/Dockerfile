FROM node:22.17.0-alpine AS dev
WORKDIR /app

COPY package.json package-lock.json ./
#RUN npm ci

RUN npm install
COPY . .
RUN npm run build


#ENV NODE_ENV=production
ENV PORT=5173
EXPOSE 5173

#CMD ["npm", "run", "dev" ]
CMD ["node", "server.js"]
#CMD if [ "$NODE_ENV" = "production" ]; then npm start; else npm run dev; fi
