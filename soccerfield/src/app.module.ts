import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SoccerfieldModule } from './soccerfield/soccerfield.module';

@Module({
  imports: [SoccerfieldModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
