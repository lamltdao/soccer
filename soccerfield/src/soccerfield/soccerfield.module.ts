import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Soccerfield, SoccerfieldSchema } from './schemas/soccerfield.schema';
import { SoccerfieldController } from './soccerfield.controller';
import { SoccerfieldService } from './soccerfield.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Soccerfield.name, schema: SoccerfieldSchema },
    ]),
  ],
  controllers: [SoccerfieldController],
  providers: [SoccerfieldService],
})
export class SoccerfieldModule {}
