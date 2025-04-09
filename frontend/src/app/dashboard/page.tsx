import React from "react";
import { Row, Col, Card } from "antd";
import NavigationBar from "@/components/NavigationBar";

const DashBoard: React.FC = () => {
  return (
    <div>
      <NavigationBar />
      <div
        style={{ padding: "24px", display: "flex", justifyContent: "center" }}
      >
        <div style={{ maxWidth: "1200px", width: "100%" }}>
          <Row gutter={[24, 24]}>
            {[...Array(8)].map((_, index) => (
              <Col key={index} xs={24} sm={12} md={6}>
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
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
