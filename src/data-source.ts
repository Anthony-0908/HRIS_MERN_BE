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
  entities: [User], // List of your entities
migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"]

});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
