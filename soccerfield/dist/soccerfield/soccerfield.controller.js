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
exports.SoccerfieldController = void 0;
const common_1 = require("@nestjs/common");
const soccerfield_service_1 = require("./soccerfield.service");
let SoccerfieldController = class SoccerfieldController {
    constructor(soccerfieldService) {
        this.soccerfieldService = soccerfieldService;
    }
    all() {
        return this.soccerfieldService.findAll();
    }
    async getByQuery(body) {
        const query = body.searchQuery;
        const filteredSoccerfieldList = await this.soccerfieldService.findByQuery(query);
        return this.soccerfieldService.getWithLocationsOptimized(filteredSoccerfieldList, query.userLocation, query.otherLocations);
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SoccerfieldController.prototype, "all", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SoccerfieldController.prototype, "getByQuery", null);
SoccerfieldController = __decorate([
    common_1.Controller('soccerfield'),
    __metadata("design:paramtypes", [soccerfield_service_1.SoccerfieldService])
], SoccerfieldController);
exports.SoccerfieldController = SoccerfieldController;
//# sourceMappingURL=soccerfield.controller.js.map