"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Form,
  Input,
  Button,
  Typography,
  Checkbox,
  Col,
  Row,
  Layout,
  Alert,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import { auth } from "@/lib/firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";

const { Title } = Typography;

export default function SignupBusiness() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const businessName = searchParams.get("businessName") || "";

  const handleSignUp = async (values: {
    businessNam: string;
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

      const storeRef = await addDoc(collection(db, "stores"), {
        firstName: values.firstName,
        lastName: values.lastName,
        zipCode: values.zipCode,
        owner_id: user.uid,
        name: businessName,
      });

      // Optionally, you can now retrieve the generated ID
      const storeId = storeRef.id;

      // Optionally, you can use this ID in other parts of your app
      console.log("Store ID:", storeId);

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
          {/* Sign Up Form */}
          <Col
            xs={24}
            md={22}
            lg={20}
            xl={18}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: "2rem",
              paddingTop: "2rem",
              paddingBottom: "2rem",
            }}
          >
            <div style={{ maxWidth: "800px", width: "100%" }}>
              <Title
                level={2}
                style={{
                  textAlign: "center",
                  fontWeight: 700,
                  color: " #61572D",
                  marginBottom: 32,
                  width: "100%",
                  fontSize: "40px",
                }}
              >
                Sign Up for Grapevine Business
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

                <Form.Item
                  name="agree"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error("You must agree to the terms")
                            ),
                    },
                  ]}
                >
                  <Checkbox>
                    By continuing, you agree to Grapevine's Terms of Business
                    and acknowledge our Privacy Policy.
                  </Checkbox>
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
                    {loading
                      ? "Signing up..."
                      : "SIGN UP FOR GRAPEVINE BUSINESS"}
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
                  Want to shop?{" "}
                  <Link href="/signup-business" style={{ fontWeight: 500 }}>
                    Sign Up as Customer
                  </Link>
                </Typography.Text>
              </div>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
