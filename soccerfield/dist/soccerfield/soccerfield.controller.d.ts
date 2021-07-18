import { SoccerfieldService } from './soccerfield.service';
export declare class SoccerfieldController {
    private soccerfieldService;
    constructor(soccerfieldService: SoccerfieldService);
    all(): Promise<import("./schemas/soccerfield.schema").SoccerfieldDocument[]>;
    getByQuery(body: any): Promise<void>;
}
