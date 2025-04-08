import { Request, Response } from 'express';
import { db } from '../firebaseConfig';
import { User } from '../models/user';

const usersCollection = db.collection('users');

export const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const doc = await usersCollection.doc(userId).get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { firstName, lastName, zipCode } = req.body;

  try {
    const userRef = usersCollection.doc(userId);
    const doc = await userRef.get();

    if (doc.exists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    await userRef.set({ firstName, lastName, zipCode });
    res.status(201).json({ id: userId, firstName, lastName, zipCode });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create user', error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { firstName, lastName, zipCode } = req.body as User;

  try {
    const userRef = usersCollection.doc(userId);
    await userRef.update({ firstName, lastName, zipCode });

    const updated = await userRef.get();
    res.json({ id: userId, ...updated.data() });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user', error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    await usersCollection.doc(userId).delete();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error });
  }
};
