import { Controller, Get, Param } from '@nestjs/common';
import { SoccerfieldService } from './soccerfield.service';

@Controller('soccerfield')
export class SoccerfieldController {
  constructor(private soccerfieldService: SoccerfieldService) {}

  @Get()
  async index() {
    return this.soccerfieldService.findAll();
  }

  @Get(':id')
  async show(@Param('id') id: number) {
    return this.soccerfieldService.getById(id);
  }
}
