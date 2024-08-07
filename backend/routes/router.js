import express from 'express'
const router = express.Router();
import authRoutes from '../routes/auth.js'

router.use('/api/auth', authRoutes)
export default router;