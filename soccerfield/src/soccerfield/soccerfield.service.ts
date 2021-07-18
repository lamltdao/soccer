import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Soccerfield, SoccerfieldDocument } from './schemas/soccerfield.schema';
import { Location, searchQuery } from './interfaces/soccerfield.interface';
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

  async findByQuery(query: searchQuery): Promise<SoccerfieldDocument[]> {
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

  // Arrange soccerfields in terms of being the most optimized depending on locations
  getWithLocationsOptimized(
    soccerfields: SoccerfieldDocument[],
    userLocation: Location | null,
    otherLocations: Location[] | [],
  ) {}

  async syncData(): Promise<void> {
    // fetch GGL API, then update DB
  }
}
