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
const soccerfield_entity_1 = require("./entity/soccerfield.entity");
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
let SoccerfieldService = class SoccerfieldService {
    constructor(soccerfieldModel, httpService) {
        this.soccerfieldModel = soccerfieldModel;
        this.httpService = httpService;
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
    syncData() {
        const observable = this.httpService.get(`${process.env.SOCCERFIELD_SYNC_URL}`);
        observable.subscribe((res) => {
            let syncSoccerfields = [];
            if (res.data.status != 'OK')
                throw new common_1.BadRequestException();
            syncSoccerfields.push(...res.data.results);
            if (res.data.next_page_token) {
            }
        });
    }
    async getById(id) {
        return this.soccerfieldModel.findById(id).exec();
    }
};
__decorate([
    common_1.HttpCode(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SoccerfieldService.prototype, "syncData", null);
SoccerfieldService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel(soccerfield_entity_1.Soccerfield.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        axios_1.HttpService])
], SoccerfieldService);
exports.SoccerfieldService = SoccerfieldService;
//# sourceMappingURL=soccerfield.service.js.map