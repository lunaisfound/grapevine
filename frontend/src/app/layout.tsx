import type { ReactNode } from "react";
import NavigationBar from "../components/NavigationBar";
import DashBoard from "./dashboard/page";
import "./globals.css";

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <NavigationBar />
        {children}
      </body>
    </html>
  );
}
