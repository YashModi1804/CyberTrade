import express from 'express';
import sellStock from '../controllers/sell.js'; 
const router = express.Router();
router.post('/:username', sellStock);

export default router;
