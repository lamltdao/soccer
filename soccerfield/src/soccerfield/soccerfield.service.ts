import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Soccerfield, SoccerfieldDocument } from './schemas/soccerfield.schema';
import { Location, searchQuery } from './interfaces/soccerfield.interface';
import {
  BadRequestException,
  HttpCode,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class SoccerfieldService {
  constructor(
    @InjectModel(Soccerfield.name)
    private soccerfieldModel: Model<SoccerfieldDocument>,
    private httpService: HttpService,
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

  @HttpCode(HttpStatus.OK)
  syncData(): void {
    // fetch GGL API
    const observable: Observable<AxiosResponse> = this.httpService.get(
      `${process.env.SOCCERFIELD_SYNC_URL}`,
      // 'https://jsonplaceholder.typicode.com/users',
    );
    observable.subscribe((res: AxiosResponse) => {
      let syncSoccerfields = [];
      // create or update db
      if (res.data.status != 'OK') throw new BadRequestException();
      syncSoccerfields.push(...res.data.results);
      // more page of data to load, maximum: 3 pages(60 items) in total
      if (res.data.next_page_token) {
        // fetch again using next_page_token
      }
    });

    // update or create soccerfield based on the result
  }

  async getById(id: number): Promise<Soccerfield> {
    return this.soccerfieldModel.findById(id).exec();
  }
}
