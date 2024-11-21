import { NestFactory, NestApplication } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './config/winston.config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';

async function bootstrap() {
  const app: NestApplication = await NestFactory.create(AppModule, {
    // Explicitly typed as NestApplication
    logger: WinstonModule.createLogger(winstonConfig),
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Duacoders API')
    .setDescription('API para gestionar duacoders')
    .setVersion('1.0')
    .addBearerAuth() // Si usas autenticación JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
