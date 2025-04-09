import express from "express";
import cors from "cors";
import userRouter from './routes/user';    
import businessRouter from './routes/business'; 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the API. Use /api/auth for authentication routes.");
});

// User routes - for fetching/updating user data
app.use('/api/users', userRouter);

// Business routes - for business operations
app.use('/api/businesses', businessRouter);


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
