FROM node:14.17-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install @nestjs/cli

RUN npm install --only=prod

COPY . .

CMD [ "npm", "run", "start:dev" ]
