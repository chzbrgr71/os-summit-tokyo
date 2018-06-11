FROM node:8.11.2-alpine

ARG IMAGE_TAG_REF

ENV IMAGE_TAG $IMAGE_TAG_REF

WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install

COPY . .

EXPOSE 8000

CMD [ "npm", "run", "dev" ]