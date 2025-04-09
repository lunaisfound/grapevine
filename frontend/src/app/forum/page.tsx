"use client";

import {
  DownOutlined,
  EditOutlined,
  HeartOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Col,
  Divider,
  Row,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db, auth } from "@/lib/firebaseConfig";
import { Comment } from "../../../../backend/models/comment";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import NavigationBar from "@/components/NavigationBar";
import BackButton from "@/components/BackButton/BackButton";

const { Text, Paragraph } = Typography;

interface UserInfo {
  firstName: string;
  lastName: string;
  avatar: string;
}

interface CommentWithUser extends Comment {
  user: UserInfo | null;
  tag?: string;
}

const Forum = (): React.JSX.Element => {
  const [uid, setUid] = useState<string>();
  const [comments, setComments] = useState<CommentWithUser[]>([]);
  const router = useRouter();

  const tagColors: Record<string, string> = {
    "International Foods": "#fef08a",
    "Cafe Suggestions": "#c1f0db",
    "Best Places to Eat": "#ffd6a5",
    "Vegan & Healthy Options": "#d3f261",
    "Community": "#ffccc7",
  };
  

  //  Auth check for user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router])

  //  Fetch forum comments
  useEffect(() => {
    const fetchComments = async () => {
      if (!uid) return;
  
      const q = query(collection(db, "comments"), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        const commentData: Comment[] = [];
        const userIds = new Set<string>();
  
        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data() as Comment;
          commentData.push({ ...data, id: docSnap.id });
          if (data.userId) userIds.add(data.userId);
        });
  
        const userMap: Record<string, UserInfo> = {};
        await Promise.all(
          Array.from(userIds).map(async (uid) => {
            const userDoc = await getDoc(doc(db, "users", uid));
            if (userDoc.exists()) {
              userMap[uid] = userDoc.data() as UserInfo;
            }
          })
        );
  
        const combined: CommentWithUser[] = commentData.map((comment) => ({
          ...comment,
          user: comment.userId ? userMap[comment.userId] ?? null : null,
        }));
  
        setComments(combined);
      });
  
      return () => unsubscribe();
    };
  
    fetchComments();
  }, [uid]);
  
  if (uid === undefined) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <NavigationBar uid={uid}/>
      <div className="w-full flex justify-center bg-white min-h-screen">
        <BackButton/>
        <div
          className="w-full"
          style={{ maxWidth: 1280, padding: "32px 32px 64px" }}
        >
          <Row
            justify="space-between"
            align="middle"
            style={{ marginBottom: 24 }}
          >
            <Col>
              <Row align="middle" gutter={8}>
                <Col>
                  <DownOutlined style={{ fontSize: 18, color: "#5e4b00" }} />
                </Col>
                <Col>
                  <Text strong style={{ fontSize: 16, color: "#5e4b00" }}>
                    Best
                  </Text>
                </Col>
              </Row>
            </Col>
            <Col>
              <Button
                shape="round"
                icon={<EditOutlined />}
                style={{
                  backgroundColor: "#fef08a",
                  borderColor: "#fef08a",
                  color: "#000",
                  fontWeight: 600,
                }}
                onClick={() => router.push("/newpost")}
              >
                What do you think?
              </Button>
            </Col>
          </Row>

          {comments.map((comment) => (
            <div key={comment.id} style={{ marginBottom: 40, paddingBottom: 10 }}>
              <Divider />
              <Row gutter={16}>
                <Col>
                  <Avatar
                    src={comment.user?.avatar || "/default-avatar.png"}
                    size={50}
                  />
                </Col>
                <Col flex="auto">
                  <Row justify="space-between">
                    <Col>
                      <Text strong>
                        {comment.user
                          ? `${comment.user.firstName} ${comment.user.lastName}`
                          : "Unknown User"}
                      </Text>
                      <Text style={{ marginLeft: 12, color: "#999" }}>
                        {timeAgo(comment.createdAt?.seconds)}
                      </Text>
                    </Col>
                    <Col>
                    <Button
                      shape="round"
                      icon={<MessageOutlined />}
                      style={{
                        backgroundColor: comment.tag !== undefined ? tagColors[comment.tag] : "#fef08a",
                        borderColor: "transparent",
                        color: "#000",
                      }}
                    >
                      {comment.tag || "General"}
                    </Button>

                    </Col>
                  </Row>
                  <Paragraph
                    style={{ fontWeight: 600, cursor: "pointer" }}
                    onClick={() => router.push(`/forum/${comment.id}`)}
                  >
                    {comment.header}
                  </Paragraph>
                  <Paragraph>{comment.text}</Paragraph>
                  <Row gutter={16}>
                    <Col>
                      <Badge
                        count={0}
                        showZero
                        style={{ backgroundColor: "#fef08a" }}
                      >
                        <HeartOutlined
                          style={{ fontSize: 15, color: "#865c00" }}
                        />
                      </Badge>
                    </Col>
                    <Col>
                      <Badge
                        count={0}
                        showZero
                        style={{ backgroundColor: "#fef08a" }}
                      >
                        <MessageOutlined
                          style={{ fontSize: 15, color: "#865c00" }}
                        />
                      </Badge>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Forum;

// Helper to display time ago
function timeAgo(timestampSec: number | undefined): string {
  if (!timestampSec) return "";
  const now = Date.now();
  const then = timestampSec * 1000;
  const diff = now - then;

  if (diff < 0) return "just now";
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;

  const date = new Date(then);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
