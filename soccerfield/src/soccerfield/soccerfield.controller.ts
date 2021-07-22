import { Body, Controller, Get, Inject, Param } from '@nestjs/common';
import { SoccerfieldService } from './soccerfield.service';
import { SearchQueryDto } from './dto/searchQuery.dto';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBody } from '@nestjs/swagger';

@Controller('soccerfield')
export class SoccerfieldController {
  constructor(
    private soccerfieldService: SoccerfieldService,
    @Inject('SOCCERFIELD_SERVICE')
    private client: ClientProxy,
  ) {}

  @Get()
  @ApiBody({ type: SearchQueryDto })
  async index(@Body('searchQuery') query: SearchQueryDto | null) {
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
