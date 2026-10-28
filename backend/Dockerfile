FROM node:22-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build

FROM node:22-alpine AS production

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production --legacy-peer-deps

COPY --from=build /usr/src/app/dist ./dist

EXPOSE 4000
CMD ["node", "dist/main.js"]
