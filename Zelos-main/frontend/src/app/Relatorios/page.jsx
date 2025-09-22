"use client";
import CardRelatorio from "../Components/dashboard/CardRelatorio";

export default function Relatorio() {
  return (
    <div className="p-6">
      <h1 className="text-5xl font-bold mt-30 ml-6">Relatórios</h1>
      <div className="p-6 mt-5">
        <CardRelatorio />
      </div>
    </div>
  );
}