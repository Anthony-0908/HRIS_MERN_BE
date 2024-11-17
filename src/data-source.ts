// src/data-source.ts
import { DataSource } from 'typeorm';
import { User } from './entity/User'; // Adjust the path and entity as needed

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'admin',
  database: 'hris',
  synchronize: true, // Set to false in production and use migrations
  logging: true,
  entities: [User],  // Add your entities here
  subscribers: [],
  migrations: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
