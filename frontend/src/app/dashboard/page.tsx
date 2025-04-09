import React from "react";
import { Row, Col, Card } from "antd";

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
  return (
    <div style={{ padding: "24px", display: "flex", justifyContent: "center" }}>
      <div style={{ maxWidth: "1200px", width: "100%" }}>
        <Row gutter={[24, 24]}>
          {images.map((img, index) => (
            <Col key={index} xs={24} sm={12} md={6}>
              <Card
                variant="outlined"
                style={{
                  height: 280,
                  width: 212,
                  aspectRatio: "3 / 4",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  overflow: "hidden",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.05)",
                  padding: 0,
                }}
                bodyStyle={{ padding: 0 }} // optional: removes default inner padding
                cover={
                  <img
                    src={img.src}
                    alt={`Placeholder ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                }
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default DashBoard;
