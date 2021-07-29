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
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const soccerfield_service_1 = require("./soccerfield.service");
const searchQuery_dto_1 = require("./dto/searchQuery.dto");
const microservices_1 = require("@nestjs/microservices");
const swagger_1 = require("@nestjs/swagger");
let SoccerfieldController = class SoccerfieldController {
    constructor(soccerfieldService, client) {
        this.soccerfieldService = soccerfieldService;
        this.client = client;
    }
    async index(query) {
        if (!query)
            return this.soccerfieldService.findAll();
        const filteredSoccerfieldList = await this.soccerfieldService.findByQuery(query);
        return this.soccerfieldService.getWithLocationsOptimized(filteredSoccerfieldList, query.userLocation, query.otherLocations);
    }
    syncData() {
        return this.soccerfieldService.syncData();
    }
    async show(id) {
        return this.soccerfieldService.getById(id);
    }
};
__decorate([
    common_1.Get(),
    swagger_1.ApiBody({ type: searchQuery_dto_1.SearchQueryDto }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Body('searchQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [searchQuery_dto_1.SearchQueryDto]),
    __metadata("design:returntype", Promise)
], SoccerfieldController.prototype, "index", null);
__decorate([
    common_1.Get('sync'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SoccerfieldController.prototype, "syncData", null);
__decorate([
    common_1.Get(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entity/soccerfield.entity").Soccerfield }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SoccerfieldController.prototype, "show", null);
SoccerfieldController = __decorate([
    common_1.Controller('soccerfield'),
    __param(1, common_1.Inject('SOCCERFIELD_SERVICE')),
    __metadata("design:paramtypes", [soccerfield_service_1.SoccerfieldService,
        microservices_1.ClientProxy])
], SoccerfieldController);
exports.SoccerfieldController = SoccerfieldController;
//# sourceMappingURL=soccerfield.controller.js.map