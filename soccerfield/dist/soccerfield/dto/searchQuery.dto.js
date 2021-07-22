"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchQueryDto = void 0;
const openapi = require("@nestjs/swagger");
class SearchQueryDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { scheduleStatus: { required: true, enum: require("../entity/soccerfield.entity").ScheduleStatus }, numShown: { required: true, type: () => Number }, price: { required: true, type: () => ({ currency: { required: true, type: () => String }, range: { required: true, type: () => [Number] } }) }, userLocation: { required: false, type: () => require("../entity/soccerfield.entity").Location, nullable: true }, otherLocations: { required: false, type: () => Object } };
    }
}
exports.SearchQueryDto = SearchQueryDto;
//# sourceMappingURL=searchQuery.dto.js.map