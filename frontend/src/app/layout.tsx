'use client';

import type { ReactNode } from "react";
import NavigationBar from "../components/NavigationBar";
import DashBoard from "./dashboard/page";
import AddNewProduct from "./addnewproduct/page";
import "./globals.css";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  const pathname = usePathname();
  const isAddProductPage = pathname.startsWith('/addnewproduct');
  
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
