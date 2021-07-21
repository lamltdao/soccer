import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { Transport } from '@nestjs/microservices';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

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
