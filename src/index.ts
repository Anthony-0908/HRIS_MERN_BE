import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';  // Import your routes

const app: Application = express();

app.use(express.json());  // Middleware to parse JSON request bodies
app.use(cors());
// Use the user routes
app.use('/api', userRoutes);  // Mount the user routes on the '/api' path

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
