export enum ScheduleStatus {
  Full = 'full',
  Vacant = 'vacant',
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Price {
  currency: string;
  value: number;
}

export interface searchQuery {
  scheduleStatus: ScheduleStatus;
  numShown: number;
  price: {
    currency: string;
    range: number[];
  };
  userLocation: Location | null;
  otherLocations: Location[] | [];
}
