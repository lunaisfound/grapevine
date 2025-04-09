"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  doc,
  getDoc,
  onSnapshot,
  collection,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { Avatar, Button, Input, Typography, Divider, Row, Col } from "antd";
import NavigationBar from "@/components/NavigationBar";
import BackButton from "@/components/BackButton/BackButton";

const { Text, Paragraph } = Typography;

const PostDetailPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [uid, setUid] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) setUid(user.uid);
    });
    return () => unsub();
  }, []);

  // Fetch post
  useEffect(() => {
    if (!postId) return;
    const postRef = doc(db, "comments", postId as string);
    getDoc(postRef).then((docSnap) => {
      if (docSnap.exists()) setPost({ id: docSnap.id, ...docSnap.data() });
    });
  }, [postId]);

  // Fetch comments (subcollection)
  useEffect(() => {
    if (!postId) return;
    const q = query(
      collection(db, "comments", postId as string, "replies"),
      orderBy("createdAt", "asc")
    );
    const unsub = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setComments(list);
    });
    return () => unsub();
  }, [postId]);

  // Submit comment
  const handleCommentSubmit = async () => {
    if (!uid || !newComment.trim()) return;

    await addDoc(collection(db, "comments", postId as string, "replies"), {
      text: newComment,
      userId: uid,
      createdAt: serverTimestamp(),
    });

    setNewComment("");
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <NavigationBar uid={uid ?? ""} />
      <div className="w-full flex justify-center bg-white min-h-screen p-8">
        <BackButton />
        <div style={{ maxWidth: 800, width: "100%" }}>
          <Text strong style={{ fontSize: 18 }}>
            {post.header}
          </Text>
          <Paragraph>{post.text}</Paragraph>

          <Divider />
          <h3>Comments</h3>
          {comments.map((comment) => (
            <Row key={comment.id} style={{ marginBottom: 16 }} gutter={12}>
              <Col>
                <Avatar src="/default-avatar.png" />
              </Col>
              <Col>
                <Text>{comment.text}</Text>
              </Col>
            </Row>
          ))}

          <Input.TextArea
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            style={{ marginTop: 20 }}
          />
          <Button
            type="primary"
            onClick={handleCommentSubmit}
            style={{ marginTop: 10 }}
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
