import express from 'express';
import {
  createBusiness,
  getBusiness,
  updateBusiness,
  deleteBusiness,
} from '../controllers/businessController';

const businessRouter = express.Router();

businessRouter.post('/', createBusiness);
businessRouter.get('/:id', getBusiness);
businessRouter.put('/:id', updateBusiness);
businessRouter.delete('/:id', deleteBusiness);

export default businessRouter;
