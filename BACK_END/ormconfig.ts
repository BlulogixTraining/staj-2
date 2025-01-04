import { DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';

import {User} from './entities/user.entity'

dotenv.config();

const config: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User],
//   migrations: ['./migrations/**/*.ts'],
  synchronize: true,
  logging: false,
};

export default config;
