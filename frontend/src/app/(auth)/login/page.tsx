"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Row, Col, Typography, Layout, Alert } from "antd";
import { useState } from "react";
import { auth } from "@/lib/firebaseConfig";
import axios from "axios";
import Link from "next/link";

const { Title } = Typography;
const { Content } = Layout;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;

      console.log("User signed in:", user);

      const response = await axios.get(
        `http://localhost:5000/api/users/${user.uid}`
      );
      const userData = response.data;
      console.log(userData);

      router.push("/dashboard");
    } catch (error: any) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
      <Content>
        <Row
          justify="center"
          align="middle"
          style={{ width: "100%", height: "100vh" }}
        >
          {/* Left - Login Form */}
          <Col
            xs={24}
            md={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: "2rem",
              paddingTop: "2rem",
              paddingBottom: "2rem",
            }}
          >
            <div style={{ maxWidth: 500, width: "100%" }}>
              <Title
                level={2}
                style={{
                  textAlign: "center",
                  fontWeight: 700,
                  color: " #61572D",
                  marginBottom: 32,
                  width: "100%",
                }}
              >
                Log In for Grapevine
              </Title>

              {error && (
                <Alert
                  message="Error"
                  description={error}
                  type="error"
                  showIcon
                  style={{ marginBottom: 16 }}
                />
              )}

              <Form
                layout="vertical"
                onFinish={handleLogin}
                style={{ width: "100%", margin: "0 auto" }}
              >
                <Form.Item
                  name="email"
                  rules={[{ required: true, message: "Enter your email" }]}
                  style={{ color: "#695A5A" }}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[{ required: true, message: "Enter your password" }]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item>
                  <Button
                    htmlType="submit"
                    block
                    style={{
                      backgroundColor: "#D9CE9B",
                      color: " #61572D",
                      fontWeight: 700,
                      border: "none",
                      height: "3rem",
                      borderRadius: "8px",
                    }}
                    loading={loading}
                  >
                    {loading ? "Logging in..." : "LOG IN"}
                  </Button>
                </Form.Item>
              </Form>

              <div style={{ textAlign: "right", marginTop: 16 }}>
                <Typography.Text type="secondary" style={{ fontSize: 16 }}>
                  Don't have an account?{" "}
                  <Link href="/signup" style={{ fontWeight: 500 }}>
                    Sign Up
                  </Link>
                </Typography.Text>
              </div>

              <div style={{ textAlign: "right", marginTop: 16 }}>
                <Typography.Text type="secondary" style={{ fontSize: 16 }}>
                  Not a customer?{" "}
                  <Link href="/business-name" style={{ fontWeight: 500 }}>
                    Sign Up for Business
                  </Link>
                </Typography.Text>
              </div>
            </div>
          </Col>

          {/* Right - Logo */}
          <Col
            xs={0}
            md={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
              padding: "2rem",
            }}
          >
            <img
              src="/page-logo.png"
              alt="Grapevine Logo"
              style={{ maxWidth: "400px", width: "100%", height: "auto" }}
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Login;
