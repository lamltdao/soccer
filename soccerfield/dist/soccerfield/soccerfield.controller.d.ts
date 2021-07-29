import { SoccerfieldService } from './soccerfield.service';
import { SearchQueryDto } from './dto/searchQuery.dto';
import { ClientProxy } from '@nestjs/microservices';
export declare class SoccerfieldController {
    private soccerfieldService;
    private client;
    constructor(soccerfieldService: SoccerfieldService, client: ClientProxy);
    index(query: SearchQueryDto | null): Promise<void | import("./entity/soccerfield.entity").SoccerfieldDocument[]>;
    syncData(): void;
    show(id: number): Promise<import("./entity/soccerfield.entity").Soccerfield>;
}
