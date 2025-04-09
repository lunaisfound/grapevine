import { Request, Response } from 'express';
import { db } from '../firebaseConfig';
import { collection, doc, addDoc } from 'firebase/firestore';

export const addProductToStore = async (req: Request, res: Response) => {
  try {
    const storeId = req.params.storeId;
    const productData = req.body;

    const productRef = collection(doc(collection(db, 'stores'), storeId), 'products');

    await addDoc(productRef, productData);

    res.status(200).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
