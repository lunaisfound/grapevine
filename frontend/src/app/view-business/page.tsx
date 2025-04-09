"use client";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Card, Col, Image, Rate, Row, Table, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import Title from "antd/es/typography/Title";
import NavigationBar from "@/components/NavigationBar";
import axios from "axios";
import { getCityStateFromZip } from "../utils/zipcodeUtils";

const ViewBusiness = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const storeId = searchParams.get("storeId") || "";

  const [storeData, setStoreData] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    if (storeId) {
      const fetchStoreAndProducts = async () => {
        const storeRef = doc(db, "stores", storeId as string);

        try {
          // Fetch store document
          const storeDoc = await getDoc(storeRef);

          if (storeDoc.exists()) {
            const storeInfo = storeDoc.data();

            // Fetch city and state based on zip code
            const cityState = storeInfo.zipCode
              ? await getCityStateFromZip(storeInfo.zipCode)
              : null;

            // Update the store data with city and state if available
            const updatedStoreData = {
              ...storeInfo,
              city: cityState?.city || "",
              state: cityState?.state || "",
            };

            setStoreData(updatedStoreData);

            const productsRef = collection(storeRef, "products");

            const productsSnapshot = await getDocs(productsRef);

            const productsList = productsSnapshot.docs
              .map((doc) => {
                const data = doc.data();
                return {
                  id: doc.id,
                  ...data,
                  startDate: data.startDate?.toDate?.(),
                  endDate: data.endDate?.toDate?.(),
                  isDraft: data.isDraft,
                };
              })
              .filter((product) => product.isDraft !== true);

            console.log(productsList);

            setProducts(productsList);
          } else {
            console.log("Store not found!");
          }
        } catch (error) {
          console.error("Error fetching store and products data: ", error);
        }
      };

      fetchStoreAndProducts();
    }
  }, [storeId]);

  if (!storeData) {
    return <div>Loading...</div>;
  }

  const handleBack = () => {
    router.push("/dashboard");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price per quantity",
      dataIndex: "price",
      key: "price",
      render: (text: any) => `$${text}`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Sell Start Date",
      dataIndex: "startDate",
      key: "startDate",
      sorter: (a: any, b: any) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime(), // Sort by startDate
      render: (text: any) => new Date(text).toLocaleDateString(), // Format as date
    },
    {
      title: "Sell End Date",
      dataIndex: "endDate",
      key: "endDate",
      sorter: (a: any, b: any) =>
        new Date(a.endDate).getTime() - new Date(b.endDate).getTime(), // Sort by endDate
      render: (text: any) => new Date(text).toLocaleDateString(), // Format as date
    },
  ];

  async function getCityState(zipCode: number) {
    try {
      const response = await axios.get(
        `https://api.zippopotam.us/us/${zipCode}`
      );
      const { city, state } = response.data.places[0];
      return { city, state };
    } catch (error) {
      console.error("Error fetching city/state:", error);
      return null;
    }
  }

  return (
    <>
      <NavigationBar uid={storeData.owner_id} />
      <div
        style={{
          paddingLeft: "5rem",
          paddingTop: "2rem",
          backgroundColor: "#fff",
          height: "100vh",
        }}
      >
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={handleBack}
          style={{
            marginBottom: 16,
            color: "#000",
            border: "none",
            height: 50,
          }}
        >
          Back to Dashboard
        </Button>

        <Row gutter={[24, 24]}>
          <Col xs={24} md={10} lg={8}>
            {storeData.imageUrl ? (
              <Image
                width="100%"
                src={storeData.imageUrl}
                alt={storeData.name}
                style={{ borderRadius: "8px", maxHeight: "60vh" }}
              />
            ) : (
              <p>No image available</p>
            )}
            <Title level={3} style={{ marginTop: 16 }}>
              {storeData.name}
            </Title>
            <Rate disabled defaultValue={4} />
            <div style={{ marginTop: 8 }}>
              <Typography.Text type="secondary">
                {storeData.type
                  ? storeData.type +
                    " • " +
                    storeData.city +
                    ", " +
                    storeData.state
                  : storeData.city + ", " + storeData.state}
              </Typography.Text>
            </div>
          </Col>

          <Col xs={24} md={14} lg={16}>
            <Card
              title={
                <>
                  <Title
                    level={4}
                    style={{
                      textAlign: "center",
                      color: " #61572D",
                      fontSize: "X-large",
                      fontWeight: "700",
                    }}
                  >
                    {storeData.name.toUpperCase()}’S STOCK
                  </Title>
                  {/* <Typography.Text
                    strong
                    style={{
                      display: "block",
                      textAlign: "center",
                      paddingBottom: "0.5rem",
                    }}
                  >
                    DURATION: 05/31/2025 - 04/06/2025
                  </Typography.Text> */}
                </>
              }
              style={{
                backgroundColor: "#fffbe6",
                borderRadius: 12,
                padding: "2rem",
                marginRight: "2rem",
                marginLeft: "2rem",
                height: "80vh",
              }}
            >
              <Row gutter={[16, 16]}>
                <Table
                  columns={columns}
                  dataSource={products}
                  pagination={{ pageSize: 10 }}
                  rowKey="id"
                  style={{ width: "100%" }}
                  rowClassName="custom-row"
                  // Customizing the first row (header) background color
                  components={{
                    header: {
                      cell: (props) => {
                        return (
                          <th
                            {...props}
                            style={{ backgroundColor: " #D9CE9B" }}
                          />
                        );
                      },
                    },
                  }}
                />
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ViewBusiness;
