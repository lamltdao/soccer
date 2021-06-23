FROM node:14

EXPOSE 3001

# Use latest version of yarn
RUN yarn set version latest

# Install the nestJs CLI
RUN yarn global add @nestjs/cli

COPY package.json yarn.lock ./

RUN yarn

# copy in our source code last, as it changes the most
WORKDIR /app

COPY . .

CMD [ "npm", "run", "start:dev" ]
