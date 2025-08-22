"use client";
import { useState } from "react";
import Sidebar from "../Components/Layout/SidebarUser/Sidebar";
import Header from "../Components/Layout/Header/Header";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {/* Mantém margem esquerda só para desktop */}
      <main className="pt-[88px] ml-0 sm:ml-[22.5rem]">{children}</main>
    </div>
  );
}
