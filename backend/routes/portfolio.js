import express from 'express';
import portfolio from '../controllers/portfolio.js';

const router = express.Router();

router.get('/portfolio/:username', portfolio);

export default router;
