import type { ReactNode } from "react";
import NavigationBar from "../components/NavigationBar";
import DashBoard from "../app/DashBoard/DashBoard";
import "./globals.css";

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <NavigationBar />
        <DashBoard />
        {children}
      </body>
    </html>
  );
}
