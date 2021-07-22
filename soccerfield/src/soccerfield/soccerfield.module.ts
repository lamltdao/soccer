import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Soccerfield, SoccerfieldSchema } from './entity/soccerfield.entity';
import { SoccerfieldController } from './soccerfield.controller';
import { SoccerfieldService } from './soccerfield.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    }),
    MongooseModule.forFeature([
      { name: Soccerfield.name, schema: SoccerfieldSchema },
    ]),
    ClientsModule.registerAsync([
      {
        inject: [ConfigService],
        name: 'SOCCERFIELD_SERVICE',
        useFactory: (config: ConfigService) => {
          return {
            transport: Transport.RMQ,
            options: {
              urls: [config.get<string>('AMQP_URL')],
              queue: 'soccerfield_queue',
              queueOptions: {
                durable: false,
                noAck: false,
              },
            },
          };
        },
      },
    ]),
  ],
  controllers: [SoccerfieldController],
  providers: [SoccerfieldService],
})
export class SoccerfieldModule {}
