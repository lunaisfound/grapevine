"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Row, Col, Typography, Layout, Alert } from "antd";
import { useState } from "react";
import { auth } from "@/lib/firebaseConfig";

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

      router.push("/dashboard");
    } catch (error: any) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content>
        <Row
          justify="center"
          align="middle"
          style={{ width: "100%", height: "100vh" }}
        >
          {/* Left Side - Login Form */}
          <Col xs={24} sm={24} md={12} lg={10} xl={8} style={{ padding: 24 }}>
            <Title level={2} style={{ textAlign: "center" }}>
              Login
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
              style={{ maxWidth: 400, margin: "0 auto" }}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please enter your email" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please enter your password" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </Form.Item>
            </Form>
          </Col>

          {/* Right Side - Logo */}
          <Col
            xs={0}
            sm={0}
            md={12}
            lg={14}
            xl={16}
            style={{
              background: "#f0f2f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <img
              src="/logo.png"
              alt="Logo"
              style={{ maxWidth: "60%", height: "auto" }}
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Login;
