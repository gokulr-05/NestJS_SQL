import { registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { User } from '../typeorm/entities/user.entity';
import { Profile } from '../typeorm/entities/profile.entity';

export default registerAs('database', (): DataSourceOptions => ({
  type: (process.env.DB_TYPE as any) || 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'nestjs_mysql_1',
  entities: [User, Profile],
  migrations: ['dist/migrations/*.js'],
  synchronize: process.env.DB_SYNCHRONIZE === 'true' || false,
  logging: process.env.DB_LOGGING === 'true' || false,
}));

