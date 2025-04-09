// src/components/BackButton.tsx
"use client";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  to?: string;
  label?: string;
}

export default function BackButton({
  to = "/dashboard",
  label = "Back to Dashboard",
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    router.push(to);
  };

  return (
    <Button
      type="link"
      icon={<ArrowLeftOutlined />}
      onClick={handleBack}
      style={{
        marginBottom: 16,
        color: "#000",
        border: "none",
        height: 50,
      }}
    >
      {label}
    </Button>
  );
}
