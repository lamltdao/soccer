import { Model } from 'mongoose';
import { SoccerfieldDocument } from './entity/soccerfield.entity';
import { SearchQueryDto } from './dto/searchQuery.dto';
export declare class SoccerfieldService {
    private soccerfieldModel;
    constructor(soccerfieldModel: Model<SoccerfieldDocument>);
    findAll(): Promise<SoccerfieldDocument[]>;
    findByQuery(query: SearchQueryDto): Promise<SoccerfieldDocument[]>;
    getById(id: number): Promise<SoccerfieldDocument>;
}
