"use client";

import { Avatar, Dropdown, Menu } from "antd";
import {
  ProfileOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useRouter } from "next/navigation";
import { Auth, signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";

interface AccountDropdownProps {
  username: string;
  isBusiness: boolean;
}

export default function AccountDropdown({
  username,
  isBusiness,
}: AccountDropdownProps) {
  const router = useRouter();
  const logout = async (auth: Auth): Promise<void> => {
    try {
      await signOut(auth);
      router.push("/");
      console.log("Logged out successfully.");
    } catch (error) {
      console.error("Error during logging out:", error);
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "account-info",
      type: "group",
      label: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "8px 0",
          }}
        >
          <Avatar src="/avatar.png" size={48} />
          <div>
            <div style={{ fontWeight: "bold", color: "#61572D" }}>
              {username}
            </div>
            <div style={{ color: "#c4b97a", fontSize: 14 }}>
              {isBusiness ? "Business Account" : "Customer Account"}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "profile",
      icon: <ProfileOutlined />,
      label: <span style={{ fontWeight: 500 }}>View Profile</span>,
    },
    ...(isBusiness
      ? [
          {
            key: "add",
            icon: <EditOutlined />,
            label: <span style={{ fontWeight: 500 }}
            onClick={() => router.push("/addnewproduct")}
              >Add new products</span>,
          },
        ]
      : []),
    {
      key: "logout",
      icon: <LogoutOutlined />,
      onClick: () => logout(auth),
      label: <span style={{ fontWeight: 500 }}>Log out</span>,
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      trigger={["click"]}
      placement="bottomRight"
      overlayClassName="account-dropdown"
      arrow={false}
    >
      <Avatar
        src="/avatar.png"
        size={50}
        style={{ backgroundColor: "#c7bb83", cursor: "pointer" }}
      />
    </Dropdown>
  );
}
