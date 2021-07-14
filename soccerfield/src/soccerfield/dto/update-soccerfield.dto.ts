import { PartialType } from '@nestjs/mapped-types';
import { CreateSoccerfieldDto } from './create-soccerfield.dto';

export class UpdateSoccerfieldDto extends PartialType(CreateSoccerfieldDto) {
  id: number;
}
