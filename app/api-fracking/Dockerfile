FROM node:8.11.2-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install

COPY . .

EXPOSE 8002

CMD [ "npm", "run", "dev" ]