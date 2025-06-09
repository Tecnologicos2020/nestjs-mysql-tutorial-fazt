/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import User from '../users/user.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '159.89.47.110',
  port: 3307,
  username: 'root',
  password: 'Trabajos100@',
  database: 'nestdb',
  entities: [User],
  synchronize: true,
}
