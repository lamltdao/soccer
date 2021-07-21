import { SoccerfieldService } from './soccerfield.service';
import { searchQuery } from './interfaces/soccerfield.interface';
import { ClientProxy } from '@nestjs/microservices';
export declare class SoccerfieldController {
    private soccerfieldService;
    private client;
    constructor(soccerfieldService: SoccerfieldService, client: ClientProxy);
    index(query: searchQuery | null): Promise<void | import("./schemas/soccerfield.schema").SoccerfieldDocument[]>;
    syncData(): void;
    show(id: number): Promise<import("./schemas/soccerfield.schema").Soccerfield>;
}
