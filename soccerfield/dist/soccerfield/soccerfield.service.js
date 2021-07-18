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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoccerfieldService = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const soccerfield_schema_1 = require("./schemas/soccerfield.schema");
const common_1 = require("@nestjs/common");
let SoccerfieldService = class SoccerfieldService {
    constructor(soccerfieldModel) {
        this.soccerfieldModel = soccerfieldModel;
    }
    async findAll() {
        return this.soccerfieldModel.find().exec();
    }
    async findByQuery(query) {
        const minPrice = query.price.range[0];
        const maxPrice = query.price.range[1];
        return this.soccerfieldModel
            .where('scheduleStatus', query.scheduleStatus)
            .$where(`this.price.currency === ${query.price.currency} && this.price.value >= ${minPrice} && this.price.value <= ${maxPrice}`)
            .limit(query.numShown)
            .exec();
    }
    getWithLocationsOptimized(soccerfields, userLocation, otherLocations) { }
    async syncData() {
    }
};
SoccerfieldService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel(soccerfield_schema_1.Soccerfield.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], SoccerfieldService);
exports.SoccerfieldService = SoccerfieldService;
//# sourceMappingURL=soccerfield.service.js.map