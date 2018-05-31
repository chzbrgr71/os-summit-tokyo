FROM node:8.11.2-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8000

CMD [ "npm", "run", "dev" ]