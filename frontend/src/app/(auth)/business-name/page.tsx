"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Typography, Button, Space, Col, Layout, Row } from "antd";
import { Content } from "antd/es/layout/layout";

const { Title, Text } = Typography;

export default function BusinessNamePage() {
  const [businessName, setBusinessName] = useState("");
  const router = useRouter();

  const handleContinue = () => {
    if (businessName.trim()) {
      router.push(`/signup-business?businessName=${businessName}`);
    }
  };

  return (
    <Layout style={{ minHeight: "95vh", backgroundColor: "#fff" }}>
      <Content>
        <Row
          justify="center"
          align="middle"
          style={{ width: "100%", height: "100%" }}
        >
          {/* Left - Login Form */}
          <Col
            xs={24} // Full width on small screens
            md={16} // 70% width on medium and larger screens
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: "5rem",
              paddingTop: "2rem",
              paddingBottom: "2rem",
            }}
          >
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Title
                level={2}
                style={{
                  color: "#5c4f1e",
                  fontSize: "40px",
                  marginBottom: "0px",
                }}
              >
                Start with your Business Name
              </Title>
              <Text style={{ fontSize: "24px" }}>
                Search for your business. If you can’t find it, add your
                business name.
              </Text>
              <Input
                style={{ width: "70%", height: "43px" }}
                placeholder="e.g. The Fluttering Duck"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
              <Button
                htmlType="submit"
                block
                onClick={() => handleContinue()}
                style={{
                  backgroundColor: "#D9CE9B",
                  color: " #61572D",
                  fontWeight: 700,
                  border: "none",
                  height: "3rem",
                  width: "40%",
                  borderRadius: "8px",
                }}
              >
                "CONTINUE"
              </Button>
            </Space>
          </Col>

          {/* Right - Logo */}
          <Col
            xs={0} // Hidden on small screens
            md={8} // 30% width on medium and larger screens
            style={{
              display: "flex",
              justifyContent: "right",
              backgroundColor: "#fff",
            }}
          >
            <img
              src="/image 1.png"
              alt="Image"
              style={{ maxWidth: "400px", width: "100%", maxHeight: "95%" }}
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
