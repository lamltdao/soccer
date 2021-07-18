import { Body, Controller, Get } from '@nestjs/common';
import { SoccerfieldService } from './soccerfield.service';
import { searchQuery } from './interfaces/soccerfield.interface';

@Controller('soccerfield')
export class SoccerfieldController {
  constructor(private soccerfieldService: SoccerfieldService) {}

  @Get()
  async getByQuery(@Body() body) {
    const query: searchQuery | null = body.searchQuery;
    if (!query) return this.soccerfieldService.findAll();

    const filteredSoccerfieldList = await this.soccerfieldService.findByQuery(
      query,
    );
    return this.soccerfieldService.getWithLocationsOptimized(
      filteredSoccerfieldList,
      query.userLocation,
      query.otherLocations,
    );
  }

  @Get('/sync')
  async syncData() {
    return this.soccerfieldService.syncData();
  }
}
