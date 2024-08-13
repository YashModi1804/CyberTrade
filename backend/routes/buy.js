import express from 'express';
import buyStock from '../controllers/buy.js';
const router = express.Router();
router.post('/:username', buyStock);

export default router;
