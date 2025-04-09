"use client";

import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "antd";
import NavigationBar from "@/components/NavigationBar";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebaseConfig";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";

import image1 from "../../../public/image/image1.png";
import image2 from "../../../public/image/image2.png";
import image3 from "../../../public/image/image3.png";
import image4 from "../../../public/image/image4.png";
import image5 from "../../../public/image/image5.png";
import image6 from "../../../public/image/image6.png";
import image7 from "../../../public/image/image7.png";
import image8 from "../../../public/image/image8.png";

const images = [image1, image2, image3, image4, image5, image6, image7, image8];

const DashBoard: React.FC = () => {
  const router = useRouter();
  const storeId = "store-abc123";
  const [uid, setUid] = useState<string>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        console.log(user.uid);
      } else {
        router.push("/login"); // Navigate to login if no user is found
      }
    });

    return () => {
      unsubscribe();
    };
  }, [router]);

  if (uid === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavigationBar uid={uid} />
      <div
        style={{ padding: "24px", display: "flex", justifyContent: "center" }}
      >
        <div style={{ maxWidth: "1200px", width: "100%" }}>
          <Row gutter={[24, 24]}>
            {[...Array(8)].map((_, index) => (
              <Col key={index} xs={24} sm={12} md={6}>
                <Link href={`/view-business?storeId=${storeId}`} passHref>
                  <Card
                    variant="outlined"
                    style={{
                      height: 280,
                      width: 212,
                      aspectRatio: "3 / 4", // Optional for keeping poster shape
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontWeight: "bold",
                      fontSize: 16,
                      color: "#999",
                      backgroundColor: "#f5f5f5",
                      border: "2px dashed #ccc",
                      boxShadow: "0px 4px 10px rgba(0,0,0,0.05)",
                    }}
                  >
                    Image Placeholder {index + 1}
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
