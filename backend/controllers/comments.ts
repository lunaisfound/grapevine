import {
  collection,
  query,
  orderBy,
  getDocs,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Comment } from "../models/comment";

// Fetch comments, newest first
export const fetchComments = async (): Promise<Comment[]> => {
  const q = query(collection(db, "comments"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Comment[];
};

export const createComment = async (commentData: {
  userId: string;
  header: string;
  text: string;
}): Promise<void> => {
  await addDoc(collection(db, "comments"), {
    ...commentData,
    createdAt: Timestamp.now(),
  });
};
