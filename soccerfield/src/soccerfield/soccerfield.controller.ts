import { Body, Controller, Get } from '@nestjs/common';
import { SoccerfieldService } from './soccerfield.service';
import { Location, searchQuery } from './interfaces/soccerfield.interface';

@Controller('soccerfield')
export class SoccerfieldController {
  constructor(private soccerfieldService: SoccerfieldService) {}

  @Get()
  all() {
    return this.soccerfieldService.findAll();
  }

  @Get()
  async getByQuery(@Body() body) {
    const query: searchQuery = body.searchQuery;
    const filteredSoccerfieldList = await this.soccerfieldService.findByQuery(
      query,
    );
    return this.soccerfieldService.getWithLocationsOptimized(
      filteredSoccerfieldList,
      query.userLocation,
      query.otherLocations,
    );
  }
}
