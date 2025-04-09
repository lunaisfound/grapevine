import express from 'express';
import { addProductToStore } from '../controllers/productController';

const router = express.Router();

router.post('/:storeId/products', addProductToStore);

export default router;
