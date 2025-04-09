"use client";

import {
  EnvironmentOutlined,
  BookOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavItems() {
  const pathname = usePathname();

  // Determine active tab based on route
  const current =
    pathname.includes("/dashboard")
      ? "dashboard"
      : pathname.includes("/saved")
      ? "saved"
      : pathname.includes("/forum")
      ? "forum"
      : "";

  const items = [
    {
      key: "dashboard",
      label: (
        <Link href="/dashboard">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <EnvironmentOutlined
              style={{ fontSize: 20, color: current === "dashboard" ? "#61572D" : "#000" }}
            />
            <span style={{ fontSize: 12, lineHeight: "16px", fontWeight: 500, marginTop: 4 }}>
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
        <Link href="/saved">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <BookOutlined
              style={{ fontSize: 20, color: current === "saved" ? "#61572D" : "#000" }}
            />
            <span style={{ fontSize: 12, lineHeight: "16px", fontWeight: 500, marginTop: 4 }}>
              Saved
            </span>
          </div>
        </Link>
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
        <Link href="/forum">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <BellOutlined
              style={{ fontSize: 20, color: current === "forum" ? "#61572D" : "#000" }}
            />
            <span style={{ fontSize: 12, lineHeight: "16px", fontWeight: 500, marginTop: 4 }}>
              Forum
            </span>
          </div>
        </Link>
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
