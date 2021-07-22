"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoccerfieldSchema = exports.Soccerfield = exports.Location = exports.ScheduleStatus = void 0;
const openapi = require("@nestjs/swagger");
const mongoose_1 = require("@nestjs/mongoose");
var ScheduleStatus;
(function (ScheduleStatus) {
    ScheduleStatus["Full"] = "full";
    ScheduleStatus["Vacant"] = "vacant";
})(ScheduleStatus = exports.ScheduleStatus || (exports.ScheduleStatus = {}));
class Location {
    static _OPENAPI_METADATA_FACTORY() {
        return { lat: { required: true, type: () => Number }, lng: { required: true, type: () => Number } };
    }
}
exports.Location = Location;
class Price {
    static _OPENAPI_METADATA_FACTORY() {
        return { currency: { required: true, type: () => String }, value: { required: true, type: () => Number } };
    }
}
let Soccerfield = class Soccerfield {
    static _OPENAPI_METADATA_FACTORY() {
        return { placeId: { required: true, type: () => String }, isOpen: { required: false, type: () => Boolean }, address: { required: true, type: () => String }, location: { required: true, type: () => require("./soccerfield.entity").Location }, phoneNumber: { required: false, type: () => String }, price: { required: true, type: () => Price }, scheduleStatus: { required: true, enum: require("./soccerfield.entity").ScheduleStatus } };
    }
};
__decorate([
    mongoose_1.Prop({ required: true, unique: true }),
    __metadata("design:type", String)
], Soccerfield.prototype, "placeId", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Boolean)
], Soccerfield.prototype, "isOpen", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Soccerfield.prototype, "address", void 0);
__decorate([
    mongoose_1.Prop(mongoose_1.raw({
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        },
    })),
    __metadata("design:type", Location)
], Soccerfield.prototype, "location", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], Soccerfield.prototype, "phoneNumber", void 0);
__decorate([
    mongoose_1.Prop(mongoose_1.raw({
        currency: {
            type: String,
        },
        value: {
            type: Number,
        },
    })),
    __metadata("design:type", Price)
], Soccerfield.prototype, "price", void 0);
__decorate([
    mongoose_1.Prop({
        required: true,
        enum: [ScheduleStatus.Full, ScheduleStatus.Vacant],
        default: ScheduleStatus.Vacant,
    }),
    __metadata("design:type", String)
], Soccerfield.prototype, "scheduleStatus", void 0);
Soccerfield = __decorate([
    mongoose_1.Schema({
        toJSON: {
            transform(doc, ret) {
                delete ret.__v;
                ret.id = ret._id;
                delete ret._id;
            },
        },
    })
], Soccerfield);
exports.Soccerfield = Soccerfield;
exports.SoccerfieldSchema = mongoose_1.SchemaFactory.createForClass(Soccerfield);
//# sourceMappingURL=soccerfield.entity.js.map