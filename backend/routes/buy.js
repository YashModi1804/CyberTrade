import express from 'express';
import buyStock from '../controllers/buy.js';

const router = express.Router();

router.post('/buy/:username', buyStock);

export default router;
