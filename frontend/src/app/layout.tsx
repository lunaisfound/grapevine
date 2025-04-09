import type { ReactNode } from "react";
import NavigationBar from "../components/NavigationBar";
import DashBoard from "./dashboard/page";
import "./globals.css";
import Login from "./(auth)/login/page";

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
