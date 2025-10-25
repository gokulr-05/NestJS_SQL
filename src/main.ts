import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // register global exception filter
  app.useGlobalFilters(new AllExceptionsFilter());

  const port = configService.get<number>('APP_PORT') || 3000;
  const nodeEnv = configService.get<string>('NODE_ENV') || 'development';

  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📝 Environment: ${nodeEnv}`);
}
bootstrap();
