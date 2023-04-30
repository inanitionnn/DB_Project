import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const API = process.env.API_URL;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableShutdownHooks();

  await app.listen(PORT, () => {
    const p = path.join(__dirname, '..', '..', '..', 'client', 'build');
    console.log(p);
    console.log(
      `🥝 Server started 🥝\n🍋 On port ${PORT} 🍋\n🍉 Link ${API} 🍉`,
    );
  });
}
bootstrap();
