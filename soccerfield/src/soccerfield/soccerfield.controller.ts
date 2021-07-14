import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SoccerfieldService } from './soccerfield.service';
import { CreateSoccerfieldDto } from './dto/create-soccerfield.dto';
import { UpdateSoccerfieldDto } from './dto/update-soccerfield.dto';

@Controller()
export class SoccerfieldController {
  constructor(private readonly soccerfieldService: SoccerfieldService) {}

  @MessagePattern('createSoccerfield')
  create(@Payload() createSoccerfieldDto: CreateSoccerfieldDto) {
    return this.soccerfieldService.create(createSoccerfieldDto);
  }

  @MessagePattern('findAllSoccerfield')
  findAll() {
    return this.soccerfieldService.findAll();
  }

  @MessagePattern('findOneSoccerfield')
  findOne(@Payload() id: number) {
    return this.soccerfieldService.findOne(id);
  }

  @MessagePattern('updateSoccerfield')
  update(@Payload() updateSoccerfieldDto: UpdateSoccerfieldDto) {
    return this.soccerfieldService.update(updateSoccerfieldDto.id, updateSoccerfieldDto);
  }

  @MessagePattern('removeSoccerfield')
  remove(@Payload() id: number) {
    return this.soccerfieldService.remove(id);
  }
}
