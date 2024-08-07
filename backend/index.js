// index.js
import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv'
import connectDB from './db/config.js'
import routes from './routes/router.js'
import authMiddleware  from './middleware/authMiddleware.js';
// Connect to MongoDB
dotenv.config();
connectDB(); 
const app = express();
// Middleware 
app.use(express.json());
app.use(cors())
app.use(routes);
app.get('/protected', authMiddleware, (req, res) => {
    res.send('This is a protected route');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
