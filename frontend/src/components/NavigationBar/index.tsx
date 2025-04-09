"use client";

import Logo from "./logo";
import NavItems from "./NavItems";
import SearchBar from "./SearchBar";
import AvatarComponent from "./Avatar";
import AccountDropdown from "./AccountDropdown";
import { Layout, Space } from "antd";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useSearchParams } from "next/navigation";

const { Header } = Layout;

export default function NavigationBar({ uid }: { uid: string }) {
  const [userInfo, setUserInfo] = useState<{
    username: string;
    isBusiness: boolean;
  }>({
    username: "Guest", // Default value
    isBusiness: false, // Default value
  });

  const fetchUserInfo = async () => {
    if (!uid) {
      console.error("UID is not provided");
      return;
    }
    try {
      const userDocRef = doc(db, "users", uid);
      const docSnapshot = await getDoc(userDocRef);

      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        console.log(userData);
        setUserInfo({
          username: userData.firstName + " " + userData.lastName || "Guest", // Default to "Guest" if username is undefined
          isBusiness: userData.isBusiness || false, // Default to false if isBusiness is undefined
        });
      } else {
        console.error("No such user!");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  // Fetch user info on component mount
  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <Header
      style={{
        backgroundColor: "#FFF5B8",
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 122,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 48 }}>
        <Logo />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <NavItems />
        <SearchBar />
        <AccountDropdown
          username={userInfo.username}
          isBusiness={userInfo.isBusiness}
        />
      </div>
    </Header>
  );
}
