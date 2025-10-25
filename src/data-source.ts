
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './typeorm/entities/user.entity';
import { Profile } from './typeorm/entities/profile.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'nestjs_mysql_1',
  entities: [User, Profile],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
};

export const AppDataSource = new DataSource(dataSourceOptions);
