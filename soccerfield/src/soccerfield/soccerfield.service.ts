import { Injectable } from '@nestjs/common';
import { CreateSoccerfieldDto } from './dto/create-soccerfield.dto';
import { UpdateSoccerfieldDto } from './dto/update-soccerfield.dto';

@Injectable()
export class SoccerfieldService {
  create(createSoccerfieldDto: CreateSoccerfieldDto) {
    return 'This action adds a new soccerfield';
  }

  findAll() {
    return `This action returns all soccerfield`;
  }

  findOne(id: number) {
    return `This action returns a #${id} soccerfield`;
  }

  update(id: number, updateSoccerfieldDto: UpdateSoccerfieldDto) {
    return `This action updates a #${id} soccerfield`;
  }

  remove(id: number) {
    return `This action removes a #${id} soccerfield`;
  }
}
