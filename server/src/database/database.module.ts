import { Logger, Module, OnApplicationShutdown } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { ModuleRef } from '@nestjs/core';
import { databaseProviders } from './database.providers';
import { DatabaseService } from './database.service';

const databasePoolFactory = async (configService: ConfigService) => {
  return new Pool({
    user: configService.get('database.user'),
    host: configService.get('database.host'),
    database: configService.get('database.database'),
    password: configService.get('database.password'),
    port: configService.get('database.port'),
  });
};

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'DATABASE_POOL',
      inject: [ConfigService],
      useFactory: databasePoolFactory,
    },
    DatabaseService,
    ...databaseProviders,
  ],
  exports: [DatabaseService, ...databaseProviders],
})
export class DatabaseModule implements OnApplicationShutdown {
  private readonly logger = new Logger(DatabaseModule.name);

  constructor(private readonly moduleRef: ModuleRef) {}

  onApplicationShutdown(signal?: string): any {
    this.logger.log(`Shutting down on signal ${signal}`);
    const pool = this.moduleRef.get('DATABASE_POOL') as Pool;
    return pool.end();
  }
}
