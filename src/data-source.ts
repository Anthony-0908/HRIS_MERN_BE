// src/data-source.ts
import { DataSource } from 'typeorm';
import { User } from './entity/User';  // Import your entities

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",  // Use your MySQL username
  password: "",  // Use your MySQL password
  database: "hris",  // Your database name
  synchronize: true,  // Set to false for migrations
  logging: true,
  entities: [__dirname + '/entity/**/*.ts'], // Ensure the path is correct
  migrations: [__dirname + '/migration/**/*.ts'], // Ensure the path is correct
  subscribers: [__dirname + '/subscriber/**/*.ts'] // Ensure the path is correct
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
