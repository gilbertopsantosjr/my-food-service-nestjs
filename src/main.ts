import { AllExceptionsFilter } from '@core/filters/exception.filter'
import { PrismaClientExceptionFilter } from '@core/filters/prisma-client-exception.filter'
import { Logger } from '@nestjs/common'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = new DocumentBuilder()
    .setTitle('My Food Store API')
    .setDescription('The My Food Store API description')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  app.useGlobalFilters(
    new PrismaClientExceptionFilter(app.get(HttpAdapterHost)),
    new AllExceptionsFilter(app.get(HttpAdapterHost))
  )
  const port = process.env.PORT || 3333
  await app.listen(port, () => {
    Logger.log(`Listening at http://localhost:${port}/`)
  })
}
bootstrap()
