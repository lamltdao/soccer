import { Model } from 'mongoose';
import { Soccerfield, SoccerfieldDocument } from './schemas/soccerfield.schema';
import { Location, searchQuery } from './interfaces/soccerfield.interface';
import { HttpService } from '@nestjs/axios';
export declare class SoccerfieldService {
    private soccerfieldModel;
    private httpService;
    constructor(soccerfieldModel: Model<SoccerfieldDocument>, httpService: HttpService);
    findAll(): Promise<SoccerfieldDocument[]>;
    findByQuery(query: searchQuery): Promise<SoccerfieldDocument[]>;
    getWithLocationsOptimized(soccerfields: SoccerfieldDocument[], userLocation: Location | null, otherLocations: Location[] | []): void;
    syncData(): void;
    getById(id: number): Promise<Soccerfield>;
}
