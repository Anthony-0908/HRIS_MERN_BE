import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";  // Import AppDataSource
import { User } from "./entity/User";
import { Repository } from "typeorm";

const app = express();

// Initialize the data source (connection)
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    // Set up routes to interact with the database
    app.get("/users", async (req, res) => {
      try {
        const userRepository: Repository<User> = AppDataSource.getRepository(User);
        const users = await userRepository.find();
        res.json(users);
      } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
      }
    });

    app.listen(3000, () => {
      console.log("Server is running on port 3001");
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
