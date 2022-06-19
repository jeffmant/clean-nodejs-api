FROM node:16-alpine

WORKDIR /usr/src/clean-node-api

COPY package.json .

RUN npm install --omit=dev

COPY ./dist ./dist

EXPOSE 7000

CMD ["node", "dist/main/server.js"]
