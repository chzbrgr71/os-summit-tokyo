FROM node:9.4.0-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install

COPY . .
ENV NODE_ENV "development"
EXPOSE 8080

CMD [ "npm", "run", "dev" ]