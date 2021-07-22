import { Model } from 'mongoose';
import { Soccerfield, SoccerfieldDocument } from './entity/soccerfield.entity';
import { SearchQueryDto } from './dto/searchQuery.dto';
import { Location } from './entity/soccerfield.entity';
import { HttpService } from '@nestjs/axios';
export declare class SoccerfieldService {
    private soccerfieldModel;
    private httpService;
    constructor(soccerfieldModel: Model<SoccerfieldDocument>, httpService: HttpService);
    findAll(): Promise<SoccerfieldDocument[]>;
    findByQuery(query: SearchQueryDto): Promise<SoccerfieldDocument[]>;
    getWithLocationsOptimized(soccerfields: SoccerfieldDocument[], userLocation: Location | null, otherLocations: Location[] | []): void;
    syncData(): void;
    getById(id: number): Promise<Soccerfield>;
}
