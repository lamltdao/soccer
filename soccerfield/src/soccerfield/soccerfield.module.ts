import { Module } from '@nestjs/common';
import { SoccerfieldController } from './soccerfield.controller';

@Module({
  controllers: [SoccerfieldController]
})
export class SoccerfieldModule {}
