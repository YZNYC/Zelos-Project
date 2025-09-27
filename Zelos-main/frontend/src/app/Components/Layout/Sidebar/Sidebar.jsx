  'use client';
  import Link from "next/link";

const ALL_MENUS = [
  { title: "Visão geral", link: "/dashBoard" },
  { title: "Chamados", link: "/Chamados" },
  { title: "Relatórios", link: "/Relatorios" },
  { title: "Técnicos", link: "/Tecnicos" },
  { title: "Configurações", link: "/Configuracoes" },
];

const SIDEBAR_WIDTH_REM = 22.5;

export default function Sidebar({ open, onClose, funcao }) {
  // Filtra menus de acordo com a função
  const MENUS = ALL_MENUS.filter(menu => {
    if (funcao === "admin") return true; // admin vê tudo
    if (funcao === "tecnico") return ["Visão geral", "Chamados", "Relatórios", "Configurações"].includes(menu.title);
    if (funcao === "user") return ["Visão geral", "Chamados", "Relatórios"].includes(menu.title);
    return false;
  });

  return (
    <>
      {/* Overlay mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 sm:hidden transition-opacity ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Sidebar desktop */}
      <aside
        className={`fixed bottom-0 left-0 z-50 h-[calc(100%-165px)] sm:flex hidden flex-col justify-between p-5 pt-8`}
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
=======
  const MENUS = [
    { title: "Visão geral", link: "/dashBoard" },
    { title: "Chamados", link: "/Chamados" },
    { title: "Relatórios", link: "/Relatorios" },
    { title: "Técnicos", link: "/Tecnicos" },
    { title: "Configurações", link: "/Configuracoes" },
  ];

  const SIDEBAR_WIDTH_REM = 22.5;
  const HEADER_HEIGHT_DESKTOP = 165;
  const HEADER_HEIGHT_MOBILE = 88;

  export default function Sidebar({ open, onClose }) {
    return (
      <>
        {/* Overlay mobile */}
        <div
          className={`fixed inset-0 z-40 bg-black/40 sm:hidden transition-opacity ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          onClick={onClose}
        />

        {/* Sidebar desktop */}
        <aside
          className="hidden sm:flex fixed left-0 z-50 flex-col justify-between p-5 pt-8 
              w-[22.5rem] top-[120px] h-[calc(100vh-120px)] 
              bg-blue-950 border-4 border-blue-900/10 "
        >

          <nav>
            <ul>
              {MENUS.map((m, i) => (
                <li key={i} className="mt-3">
                  <Link
                    href={m.link}
                    className="flex items-center gap-3 text-white text-lg font-semibold p-2 rounded-md hover:bg-blue-900/70"
                  >
                    {m.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Sidebar mobile */}
        <aside
          className={`sm:hidden fixed left-0 z-50 flex flex-col justify-between p-5 pt-8
                w-[22.5rem] top-[88px] h-[calc(100vh-88px)]
                bg-black/80 border-4 border-gray-300 rounded-lg
                transition-transform duration-300 transform ${open ? "translate-x-0" : "-translate-x-[22.5rem]"}`}
        >

          <nav>
            <ul>
              {MENUS.map((item, i) => (
                <li key={i} className="mt-2">
                  <Link
                    href={item.link}
                    className="flex items-center gap-3 text-white text-lg font-semibold p-2 rounded-md hover:bg-gray-800"
                    onClick={onClose}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </>
    );
  }

