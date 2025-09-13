// src/routes/mocks.router.js
import { Router } from 'express';
import { getMockProducts } from '../controllers/mocks.controller.js';

const router = Router();

// GET /api/mocks/mockingproducts
router.get('/mockingproducts', getMockProducts);

export default router;
