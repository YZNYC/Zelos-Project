"use client";
import Link from "next/link";

const MENUS = [
  { title: "Visão geral", link: "/dashBoardTec" },
  // { title: "Chamados", link: "/ChamadosTec" },
  { title: "Relatórios", link: "/dashBoardTec/Relatorios" },
  { title: "Configurações", link: "/dashBoardTec/Configuracoes" },
];

const SIDEBAR_WIDTH_REM = 18.5; // 22.5rem (equiv. ao seu w-90)

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Overlay no mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 sm:hidden transition-opacity ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      <aside
        className={`fixed bottom-0 left-0 z-50 h-[calc(100%-100px)] sm:flex hidden flex-col justify-between p-5 pt-8`}
        style={{ backgroundColor: "#002F6C", width: `${SIDEBAR_WIDTH_REM}rem` }}
      >
        <nav>
          <ul className="pt-6">
            {MENUS.map((m, i) => (
              <li key={i} className="mt-2">
                <Link
                  href={m.link}
                  className="flex items-center gap-4 text-white text-xl font-bold p-2 rounded-md hover:bg-[#113F7A]"
                >
                  {m.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="text-center text-white text-sm">
          <strong>Zelos © 2025 - Escola SENAI<br/>Armando de Arruda Pereira</strong>
        </div>
      </aside>

      {/* Drawer mobile */}
      <aside
        className={`sm:hidden fixed top-[88px] bottom-0 left-0 z-50 transition-transform duration-300 p-5 pt-8 flex flex-col justify-between`}
        style={{
          width: `${SIDEBAR_WIDTH_REM}rem`,
          backgroundColor: "#002F6C",
          transform: open ? "translateX(0)" : `translateX(-${SIDEBAR_WIDTH_REM}rem)`,
        }}
      >
        <nav>
          <ul className="pt-2">
            {MENUS.map((m, i) => (
              <li key={i} className="mt-2">
                <Link
                  href={m.link}
                  className="block text-white text-lg font-bold p-2 rounded-md hover:bg-[#113F7A]"
                  onClick={onClose}
                >
                  {m.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="text-center text-white text-xs">
          <strong>Zelos © 2025 - Escola SENAI<br/>Armando de Arruda Pereira</strong>
        </div>
      </aside>
    </>
  );
}