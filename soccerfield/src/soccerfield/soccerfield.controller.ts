import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { SoccerfieldService } from './soccerfield.service';
import { searchQuery } from './interfaces/soccerfield.interface';
import { ClientProxy } from '@nestjs/microservices';

@Controller('soccerfield')
export class SoccerfieldController {
  constructor(
    private soccerfieldService: SoccerfieldService,
    @Inject('SOCCERFIELD_SERVICE')
    private client: ClientProxy,
  ) {}

  @Get()
  async index(@Body('searchQuery') query: searchQuery | null) {
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

  @Get('sync')
  syncData() {
    return this.soccerfieldService.syncData();
  }

  @Get(':id')
  async show(@Param('id') id: number) {
    return this.soccerfieldService.getById(id);
  }
}
