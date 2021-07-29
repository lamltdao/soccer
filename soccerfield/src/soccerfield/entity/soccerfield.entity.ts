import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SoccerfieldDocument = Soccerfield & Document;

export enum ScheduleStatus {
  Full = 'full',
  Vacant = 'vacant',
}

export class Location {
  lat: number;
  lng: number;
}

class Price {
  currency: string;
  value: number;
}

@Schema({
  toJSON: {
    transform(doc, ret) {
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
    },
  },
})
export class Soccerfield {
  // Sent along in GoogleMap Place Detail API to fetch data on a place
  // which in turn will be saved to the DB
  @Prop({ required: true, unique: true })
  placeId: string;

  @Prop()
  isOpen?: boolean;

  @Prop({ required: true })
  address: string;

  @Prop(
    raw({
      lat: {
        type: Number,
      },
      lng: {
        type: Number,
      },
    }),
  )
  location: Location;

  @Prop()
  phoneNumber?: string;

  @Prop(
    raw({
      // could be enum of all currency
      currency: {
        type: String,
      },
      value: {
        type: Number,
      },
    }),
  )
  price: Price;

  @Prop({
    required: true,
    enum: [ScheduleStatus.Full, ScheduleStatus.Vacant],
    default: ScheduleStatus.Vacant,
  })
  scheduleStatus: ScheduleStatus;
}

export const SoccerfieldSchema = SchemaFactory.createForClass(Soccerfield);
