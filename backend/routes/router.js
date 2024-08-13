import express from 'express'
const router = express.Router();
import authRoutes from '../routes/auth.js'
import Portfolio from '../routes/portfolio.js'
import buy from '../routes/buy.js'
import sell from '../routes/sell.js'
router.use('/api/auth', authRoutes)
router.use('/api/portfolio', Portfolio)
router.use('/api/buy', buy)
router.use('/api/sell', sell)
export default router;