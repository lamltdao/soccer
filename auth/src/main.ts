import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import * as session from 'express-session';
import MongoStore = require('connect-mongo');

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  if (process.env.NODE_ENV !== 'production') {
    console.log('cors enabled');
    app.enableCors();
  }

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

  const config = new DocumentBuilder()
    .setTitle('Auth API Spec')
    .setDescription('The Auth API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apidoc', app, document);

  // listen on port
  await app.listen(process.env.PORT);
  console.log('Auth listening on port ', process.env.PORT);
}
bootstrap();
