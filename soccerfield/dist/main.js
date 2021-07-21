"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
const microservices_1 = require("@nestjs/microservices");
dotenv.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.connectMicroservice({
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: [`${process.env.AMQP_URL}`],
            queue: 'soccerfield_queue',
            queueOptions: {
                durable: false,
                noAck: false,
            },
        },
    });
    await app.startAllMicroservices();
    console.log('AMQP server connected');
    await app.listen(process.env.PORT);
    console.log('Soccerfield listening on port ', process.env.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map