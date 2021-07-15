import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SoccerfieldModule } from './soccerfield/soccerfield.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          uri: config.get<string>('MONGO_ATLAS_URI'),
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true,
        }
      }
    }),
    SoccerfieldModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
