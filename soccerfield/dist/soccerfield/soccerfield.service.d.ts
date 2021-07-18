import { Model } from 'mongoose';
import { SoccerfieldDocument } from './schemas/soccerfield.schema';
import { Location, searchQuery } from './interfaces/soccerfield.interface';
export declare class SoccerfieldService {
    private soccerfieldModel;
    constructor(soccerfieldModel: Model<SoccerfieldDocument>);
    findAll(): Promise<SoccerfieldDocument[]>;
    findByQuery(query: searchQuery): Promise<SoccerfieldDocument[]>;
    getWithLocationsOptimized(soccerfields: SoccerfieldDocument[], userLocation: Location | null, otherLocations: Location[] | []): void;
}
