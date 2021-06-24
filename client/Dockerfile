FROM node:14
  
EXPOSE 3000

WORKDIR /app

COPY package.json .

RUN npm install --only=prod

COPY . .

CMD [ "npm", "run", "dev" ]
