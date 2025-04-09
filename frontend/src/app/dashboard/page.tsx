"use client";

import React, { useEffect, useState } from "react";
import { Row, Col, Card, Image, Typography } from "antd";
import NavigationBar from "@/components/NavigationBar";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebaseConfig";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

import image1 from "../../../public/image/image1.png";
import image2 from "../../../public/image/image2.png";
import image3 from "../../../public/image/image3.png";
import image4 from "../../../public/image/image4.png";
import image5 from "../../../public/image/image5.png";
import image6 from "../../../public/image/image6.png";
import image7 from "../../../public/image/image7.png";
import image8 from "../../../public/image/image8.png";
import { FileUnknownOutlined } from "@ant-design/icons";

const images = [image1, image2, image3, image4, image5, image6, image7, image8];

const DashBoard: React.FC = () => {
  const router = useRouter();
  const storeId = "store-abc123";
  const [uid, setUid] = useState<string>();
  const [stores, setStores] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Fetch stores
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "stores"));
        const storeList = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...doc.data(),
            imageUrl: data.imageUrl,
            name: data.name,
          };
        });
        setStores(storeList);
        console.log(storeList);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchStores();
  }, []);

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
            {stores.map((store, index) => (
              <Col key={index} xs={24} sm={12} md={6}>
                <Link href={`/view-business?storeId=${store.id}`} passHref>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Card
                      variant="outlined"
                      style={{
                        height: 280,
                        width: 212,
                        aspectRatio: "3 / 4",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: store.imageUrl ? "none" : "1px solid #000", // Conditional border
                        borderRadius: "8px",
                      }}
                    >
                      {store.imageUrl ? (
                        <Image
                          width="100%"
                          src={store.imageUrl}
                          alt={store.name}
                          style={{ border: "none", borderRadius: "8px" }}
                          preview={false}
                        />
                      ) : (
                        <FileUnknownOutlined
                          style={{
                            width: "100%",
                            borderRadius: "8px",
                            fontSize: "3rem",
                          }}
                        />
                      )}
                    </Card>

                    <Typography.Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        color: "#61572D",
                        textAlign: "center",
                        marginTop: "1rem",
                      }}
                    >
                      {store.name || "Unnamed Store"}
                    </Typography.Text>
                  </div>
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
