"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchQuery = void 0;
const openapi = require("@nestjs/swagger");
class searchQuery {
    static _OPENAPI_METADATA_FACTORY() {
        return { scheduleStatus: { required: true, type: () => Object }, numShown: { required: true, type: () => Number }, price: { required: true, type: () => ({ currency: { required: true, type: () => String }, range: { required: true, type: () => [Number] } }) }, userLocation: { required: true, type: () => Object, nullable: true }, otherLocations: { required: true, type: () => Object } };
    }
}
exports.searchQuery = searchQuery;
//# sourceMappingURL=searchQuery.dto.js.map