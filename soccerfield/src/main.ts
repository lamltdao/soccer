import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { Transport } from '@nestjs/microservices';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  if (process.env.NODE_ENV !== 'production') {
    console.log('cors enabled');
    app.enableCors();
  }

  const config = new DocumentBuilder()
    .setTitle('Soccerfield API Spec')
    .setDescription('The soccerfield API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apidoc', app, document);

  // connect microservice, a.k.a amqp client
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [`${process.env.AMQP_URL}`],
      queue: 'soccerfield_queue',
      queueOptions: {
        durable: false,
        noAck: false,
      },
    },
  });

  await app.startAllMicroservices();
  console.log('AMQP server connected');

  await app.listen(process.env.PORT);
  console.log('Soccerfield listening on port ', process.env.PORT);
}
bootstrap();
