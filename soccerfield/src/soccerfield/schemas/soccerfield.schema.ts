import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SoccerfieldDocument = Soccerfield & Document;

@Schema({
  toJSON: {
    transform(doc, ret) {
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
    }  
  }
})
export class Soccerfield {
  // Sent along in GoogleMap Place Detail API to fetch data on a place
  // which in turn will be saved to the DB
  @Prop({ required: true, unique: true })
  placeId: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  location: {
    lat: number;
    lng: number;
  };

  @Prop()
  phoneNumber: string;

  @Prop({ required: true})
  price: {
    // could be enum of all currency
    currency: string,
    value: number
  }

  @Prop({ required: true })
  scheduleStatus: {

  }
}

export const UserSchema = SchemaFactory.createForClass(Soccerfield);