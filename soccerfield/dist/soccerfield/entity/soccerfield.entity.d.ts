import { Document } from 'mongoose';
export declare type SoccerfieldDocument = Soccerfield & Document;
export declare enum ScheduleStatus {
    Full = "full",
    Vacant = "vacant"
}
export declare class Location {
    lat: number;
    lng: number;
}
declare class Price {
    currency: string;
    value: number;
}
export declare class Soccerfield {
    placeId: string;
    isOpen?: boolean;
    address: string;
    location: Location;
    phoneNumber?: string;
    price: Price;
    scheduleStatus: ScheduleStatus;
}
export declare const SoccerfieldSchema: import("mongoose").Schema<Document<Soccerfield, any, any>, import("mongoose").Model<any, any, any>, undefined, any>;
export {};
