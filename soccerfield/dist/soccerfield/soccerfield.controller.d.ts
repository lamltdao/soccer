import { SoccerfieldService } from './soccerfield.service';
export declare class SoccerfieldController {
    private soccerfieldService;
    constructor(soccerfieldService: SoccerfieldService);
    getByQuery(body: any): Promise<void | import("./schemas/soccerfield.schema").SoccerfieldDocument[]>;
    syncData(): Promise<void>;
}
