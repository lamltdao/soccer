import { Module } from '@nestjs/common';
import { SoccerfieldService } from './soccerfield.service';
import { SoccerfieldController } from './soccerfield.controller';

@Module({
  controllers: [SoccerfieldController],
  providers: [SoccerfieldService]
})
export class SoccerfieldModule {}
