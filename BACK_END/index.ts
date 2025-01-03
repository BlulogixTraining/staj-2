import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import AppDataSource from './config/database'; // Your TypeORM config
import 'reflect-metadata';
import authRoutes from './routes/auth.routes';


dotenv.config(); // Load environment variables

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

// Database Connection
AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully.');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

// Routes
console.log('test')
app.use('/api/auth', authRoutes); // Use routes with `/api` prefix

// Health Check Endpoint
app.get('/', (req: Request, res: Response) => {
  res.status(200).send('CRM API is running.');
});

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
