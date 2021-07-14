import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as session from 'express-session';
import MongoStore = require('connect-mongo');

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());
  // Config express-session
  app.use(
    session({
      secret: 'session_secret',
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: false,
        signed: false,
      },
      store: MongoStore.create({
        mongoUrl: `${process.env.MONGO_ATLAS_URI}`,
      }),
    }),
    );
    
  // listen on port
  await app.listen(process.env.PORT);
  console.log('Auth listening on port ', process.env.PORT);
}
bootstrap();
