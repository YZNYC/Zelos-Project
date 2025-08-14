'use client';

import Sidebar from '../Components/Sidebar/Sidebar';
import Header from '../Components/Header/Header';


export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
         <Header />
      <Sidebar/>
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  );
}