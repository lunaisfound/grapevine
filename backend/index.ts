import express from 'express';
import cors from 'cors';
import productRoutes from './routes/product';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // Allow frontend access
app.use(express.json()); // Parse JSON

// Routes
app.use('/', productRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
