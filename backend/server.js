import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import trackingRoutes from './routes/tracking.js';
import bookingRoutes from './routes/bookings.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'TransPort Backend API is running' });
});

app.use('/api/tracking', trackingRoutes);
app.use('/api/bookings', bookingRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
