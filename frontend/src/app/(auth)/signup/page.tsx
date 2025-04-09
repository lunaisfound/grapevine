"use client";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Row, Col, Typography, Layout, Alert } from "antd";
import { useState } from "react";
import { auth } from "@/lib/firebaseConfig";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import Link from "next/link";

const { Title } = Typography;
const { Content } = Layout;

const SignUp: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignUp = async (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    zipCode?: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;

      // Save additional data to Firestore
      const db = getFirestore();
      await setDoc(doc(db, "users", user.uid), {
        firstName: values.firstName,
        lastName: values.lastName,
        zipCode: values.zipCode,
      });

      console.log("User signed up:", {
        uid: user.uid,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        zipCode: values.zipCode,
      });

      router.push("/dashboard");
    } catch (error: any) {
      console.error("Error during sign up:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
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
          {/* Left Side - Sign Up Form */}
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
                Sign Up for Grapevine
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
                onFinish={handleSignUp}
                style={{ width: "100%", margin: "0 auto" }}
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="firstName"
                      rules={[
                        { required: true, message: "Enter your first name" },
                      ]}
                    >
                      <Input placeholder="First Name" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="lastName"
                      rules={[
                        { required: true, message: "Enter your last name" },
                      ]}
                    >
                      <Input placeholder="Last Name" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="email"
                  rules={[{ required: true, message: "Enter your email" }]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[{ required: true, message: "Enter your password" }]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item
                  name="zipCode"
                  rules={[
                    { required: true, message: "Please enter your ZIP Code" },
                  ]}
                >
                  <Input placeholder="ZIP Code" />
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
                    {loading ? "Signing up..." : "SIGN UP"}
                  </Button>
                </Form.Item>
              </Form>
              <div style={{ textAlign: "right", marginTop: 16 }}>
                <Typography.Text type="secondary" style={{ fontSize: 16 }}>
                  Already have an account?{" "}
                  <Link href="/login" style={{ fontWeight: 500 }}>
                    Login
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

export default SignUp;
