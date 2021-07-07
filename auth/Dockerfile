FROM node:14

EXPOSE 3001

WORKDIR /app

RUN npm install @nestjs/cli

COPY package.json package-lock.json ./

RUN npm install --only=prod

COPY . .

CMD [ "npm", "run", "start:dev" ]
