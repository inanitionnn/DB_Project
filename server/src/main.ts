import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get('port');
  const API = configService.get('apiUrl');
  app.setGlobalPrefix('api');
  app.enableShutdownHooks();

  await app.listen(PORT, () => {
    console.log(
      `🥝 Server started 🥝\n🍋 On port ${PORT} 🍋\n🍉 Link ${API} 🍉`,
    );
  });
}
bootstrap();
