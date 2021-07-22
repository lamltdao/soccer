import { ScheduleStatus, Location } from '../schemas/soccerfield.entity';
export declare class searchQuery {
    scheduleStatus: ScheduleStatus;
    numShown: number;
    price: {
        currency: string;
        range: number[];
    };
    userLocation: Location | null;
    otherLocations: Location[] | [];
}
