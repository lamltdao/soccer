import { ScheduleStatus, Location } from '../entity/soccerfield.entity';
export declare class SearchQueryDto {
    scheduleStatus: ScheduleStatus;
    numShown: number;
    price: {
        currency: string;
        range: number[];
    };
    userLocation?: Location | null;
    otherLocations?: Location[] | [];
}
