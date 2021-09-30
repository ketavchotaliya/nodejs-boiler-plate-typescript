import { Router } from 'express';

import LocationRoutes from '../components/provider/location';
const router = Router();
/**
 * Init All routes here
 */

// Private Routes
router.use('/api/v1/location', LocationRoutes);

export default router;
