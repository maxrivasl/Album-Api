import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { TypeOrmExceptionFilter } from './common/typeorm-exception.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,               // elimina campos que no están en el DTO
      forbidNonWhitelisted: true,    // ...o responde 400 si los envían
      transform: true,               // convierte tipos (string → number)
    }),
  );
  app.useGlobalFilters(new TypeOrmExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();