import { Request, Response } from 'express';
import { db } from '../firebaseConfig';
import { Business } from '../models/business';

const businessCollection = db.collection('businesses');

export const createBusiness = async (req: Request, res: Response) => {
  const id = (req as any).uid;
  const { name, email } = req.body as Business;

  try {
    const newBusiness = { name, email };
    const docRef = await businessCollection.add(newBusiness);

    res.status(201).json({ id: docRef.id, ...newBusiness });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create business', error });
  }
};

export const getBusiness = async (req: Request, res: Response) => {
  const businessId = req.params.id;

  try {
    const doc = await businessCollection.doc(businessId).get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'Business not found' });
    }

    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch business', error });
  }
};

export const updateBusiness = async (req: Request, res: Response) => {
  const businessId = req.params.id;
  const { name, address, description } = req.body;

  try {
    const docRef = businessCollection.doc(businessId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(403).json({ message: 'Unauthorized or not found' });
    }

    await docRef.update({ name, address, description });
    res.json({ message: 'Business updated' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update business', error });
  }
};

export const deleteBusiness = async (req: Request, res: Response) => {
  const businessId = req.params.id;

  try {
    const docRef = businessCollection.doc(businessId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(403).json({ message: 'Unauthorized or not found' });
    }

    await docRef.delete();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete business', error });
  }
};
