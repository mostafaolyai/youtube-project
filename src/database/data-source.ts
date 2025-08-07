import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

ConfigModule.forRoot(); //for loading .env
const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: +configService.get<number>('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: [join(__dirname, '..', 'database/entities', '*.entity.{ts,js}')],
  migrations: [join(__dirname, '..', 'database/migrations', '*.{ts,js}')],
  synchronize: false,
});
