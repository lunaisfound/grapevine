import {
  EnvironmentOutlined,
  BookOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import Link from "next/link";

export default function NavItems() {
  const [current, setCurrent] = useState("dashboard");

  const items = [
    {
      key: "dashboard",
      label: (
        <Link href="../app/DashBoard/Dashboard.tsx">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <EnvironmentOutlined
              style={{
                fontSize: 20,
                color: current === "dashboard" ? "#61572D" : "#000",
              }}
            />
            <span
              style={{
                fontSize: 12,
                lineHeight: "16px",
                fontWeight: 500,
                color: "#3d361c",
                marginTop: 4,
              }}
            >
              Dashboard
            </span>
          </div>
        </Link>
      ),
      style: {
        borderRadius: 20,
        padding: "4px 12px",
        backgroundColor: current === "dashboard" ? "#e7dfb9" : "transparent",
      },
    },
    {
      key: "saved",
      label: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <BookOutlined
            style={{
              fontSize: 20,
              color: current === "saved" ? "#61572D" : "#000",
            }}
          />
          <span
            style={{
              fontSize: 12,
              lineHeight: "16px",
              fontWeight: 500,
              color: "#3d361c",
              marginTop: 4,
            }}
          >
            Saved
          </span>
        </div>
      ),
      style: {
        borderRadius: 20,
        padding: "4px 12px",
        backgroundColor: current === "saved" ? "#e7dfb9" : "transparent",
      },
    },
    {
      key: "forum",
      label: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <BellOutlined
            style={{
              fontSize: 20,
              color: current === "forum" ? "#61572D" : "#000",
            }}
          />
          <span
            style={{
              fontSize: 12,
              lineHeight: "16px",
              fontWeight: 500,
              color: "#3d361c",
              marginTop: 4,
            }}
          >
            Forum
          </span>
        </div>
      ),
      style: {
        borderRadius: 20,
        padding: "4px 12px",
        backgroundColor: current === "forum" ? "#e7dfb9" : "transparent",
      },
    },
  ];

  return (
    <Menu
      mode="horizontal"
      selectedKeys={[current]}
      onClick={(e) => setCurrent(e.key)}
      items={items}
      style={{
        background: "transparent",
        borderBottom: "none",
        display: "flex",
        gap: 16,
      }}
    />
  );
}
