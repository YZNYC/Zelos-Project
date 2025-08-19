"use client";
import CardRelatorio from "../Components/dashboard/CardRelatorio";
import { relatorios } from "../lib/mockDashBoardData";

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-5xl font-bold mt-30 ml-6">Relatórios</h1>
      <div className="p-6 mt-5">
      <CardRelatorio relatorios={relatorios} />
      </div>
    </div>
  );
}
