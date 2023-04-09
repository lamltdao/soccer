import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Soccerfield, SoccerfieldDocument } from './entity/soccerfield.entity';
import { SearchQueryDto } from './dto/searchQuery.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SoccerfieldService {
  constructor(
    @InjectModel(Soccerfield.name)
    private soccerfieldModel: Model<SoccerfieldDocument>,
  ) {}

  async findAll(): Promise<SoccerfieldDocument[]> {
    return this.soccerfieldModel.find().exec();
  }

  async findByQuery(query: SearchQueryDto): Promise<SoccerfieldDocument[]> {
    const minPrice = query.price.range[0];
    const maxPrice = query.price.range[1];
    return this.soccerfieldModel
      .where('scheduleStatus', query.scheduleStatus)
      .$where(
        `this.price.currency === ${query.price.currency} && this.price.value >= ${minPrice} && this.price.value <= ${maxPrice}`,
      )
      .limit(query.numShown)
      .exec();
  }

  async getById(id: number): Promise<SoccerfieldDocument> {
    return this.soccerfieldModel.findById(id).exec();
  }
}
