import { Router } from 'express';
import { getSales, getFilterOptions } from '../controllers/salesController';

const router = Router();

router.get('/', getSales);
router.get('/meta', getFilterOptions);

export default router;
