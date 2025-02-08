import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';  // Import your routes
import userauth from './routes/authRoutes'

const app: Application = express();

app.use(
  cors({
    origin: "http://localhost:3000", // React app URL
    credentials: true, // Allow cookies
    methods: "GET,POST,PUT,DELETE",
  })
);

app.use(express.json());  // Middleware to parse JSON request bodies
app.use(cors());
// Use the user routes
app.use('/api/User', userRoutes);  // Mount the user routes on the '/api' path
app.use('/api/login', userauth);  // Mount the user routes on the '/api' path

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
