import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  const configService: ConfigService<unknown> = app.get(ConfigService);

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:5173'],
  });
  app.use(cookieParser());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Devstore API')
    .setDescription('Api made for devnology fullstack test')
    .setVersion('1.0')
    .addCookieAuth('Authorization', {
      type: 'http',
      in: 'header',
      name: 'Authorization',
      scheme: 'bearer',
    })
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/v1/docs', app, document);

  await app.listen(configService.get('PORT') || 3001);
}
bootstrap();
