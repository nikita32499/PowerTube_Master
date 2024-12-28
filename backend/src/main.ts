import { INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import cookieParser from 'cookie-parser'
import { RmqService } from 'infrastructure/common/modules/rmq/rmq.service'
import { patchNestJsSwagger, ZodValidationPipe } from 'nestjs-zod'
import { AppModule } from './infrastructure/app.module'



async function bootstrap() {


    const app = await NestFactory.create(AppModule)

    const rmqService = app.get<RmqService>(RmqService)

    const microserviceOptions = rmqService.getOptions("master")

    app.connectMicroservice(microserviceOptions)

    app.setGlobalPrefix('/api/v1')

    app.use(cookieParser())

    app.useGlobalPipes(new ZodValidationPipe())

    setupSwagger(app)

    await app.startAllMicroservices()
    await app.listen(3001)
}

const setupSwagger = (app: INestApplication) => {
    patchNestJsSwagger()
    const configSwagger = new DocumentBuilder()
        .setTitle('API Documentation')
        .setDescription('API Documentation')
        .setVersion('1.0')
        .addTag('auth')
        .addBearerAuth()
        .build()

    const document = SwaggerModule.createDocument(app, configSwagger)
    SwaggerModule.setup('/api/swagger', app, document)
}

bootstrap()
