import express from 'express';
import {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
} from '../controllers/userController';

const userRouter = express.Router();

userRouter.get('/:id', getUserById)
userRouter.post('/', createUser);
userRouter.put('/', updateUser);
userRouter.delete('/', deleteUser);

export default userRouter;