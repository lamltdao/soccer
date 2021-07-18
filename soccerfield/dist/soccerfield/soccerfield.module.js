"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoccerfieldModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const soccerfield_schema_1 = require("./schemas/soccerfield.schema");
const soccerfield_controller_1 = require("./soccerfield.controller");
const soccerfield_service_1 = require("./soccerfield.service");
let SoccerfieldModule = class SoccerfieldModule {
};
SoccerfieldModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: soccerfield_schema_1.Soccerfield.name, schema: soccerfield_schema_1.SoccerfieldSchema },
            ]),
        ],
        controllers: [soccerfield_controller_1.SoccerfieldController],
        providers: [soccerfield_service_1.SoccerfieldService],
    })
], SoccerfieldModule);
exports.SoccerfieldModule = SoccerfieldModule;
//# sourceMappingURL=soccerfield.module.js.map