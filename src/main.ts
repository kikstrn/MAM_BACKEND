import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { environement } from './environements/environement.dev';
import * as bodyParser from 'body-parser';

const logger = new Logger();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(bodyParser.json({limit: '15mb'}));
  app.use(bodyParser.urlencoded({limit: '15mb', extended: true}));
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true, transformOptions: { enableImplicitConversion: true } }));
  await app.listen(environement.PORT);
  logger.log("API Meet a Mate started : "+  await app.getUrl());
}
bootstrap();