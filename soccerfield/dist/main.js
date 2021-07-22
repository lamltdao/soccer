"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const dotenv = require("dotenv");
const microservices_1 = require("@nestjs/microservices");
dotenv.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Soccerfield API Spec')
        .setDescription('The soccerfield API description')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('apidoc', app, document);
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