import { Document } from 'mongoose';
import { ScheduleStatus, Location, Price } from '../interfaces/soccerfield.interface';
export declare type SoccerfieldDocument = Soccerfield & Document;
export declare class Soccerfield {
    placeId: string;
    isOpen: boolean;
    address: string;
    location: Record<string, Location>;
    phoneNumber: string;
    price: Record<string, Price>;
    scheduleStatus: ScheduleStatus;
}
export declare const SoccerfieldSchema: import("mongoose").Schema<Document<Soccerfield, any, any>, import("mongoose").Model<any, any, any>, undefined, any>;
