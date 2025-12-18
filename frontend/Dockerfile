FROM node:22.17.0-alpine AS dev
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
ENV PORT=5173
EXPOSE 5173
CMD ["npm", "run", "dev" ]
