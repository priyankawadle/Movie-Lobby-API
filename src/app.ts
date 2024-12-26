import express from 'express';
import cors from 'cors';
import movieRoutes from './routes/movie.routes';

const app = express();

app.use(cors());
app.use(express.json());

// Register Routes
app.use('/', movieRoutes);

export default app;
