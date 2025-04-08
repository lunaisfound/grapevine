import express from 'express';
import {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
} from '../controllers/userController';

const userRouter = express.Router();

userRouter.get('/:id', getUserById)
userRouter.post('/:id', createUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;