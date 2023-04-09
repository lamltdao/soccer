import { SoccerfieldService } from './soccerfield.service';
export declare class SoccerfieldController {
    private soccerfieldService;
    constructor(soccerfieldService: SoccerfieldService);
    index(): Promise<import("./entity/soccerfield.entity").SoccerfieldDocument[]>;
    show(id: number): Promise<import("./entity/soccerfield.entity").SoccerfieldDocument>;
}
