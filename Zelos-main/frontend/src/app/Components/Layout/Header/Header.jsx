"use client";

export default function Header({ onToggleSidebar }) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 sm:px-6"
      style={{ backgroundColor: "#ED1C24", height: "165px" }}
    >
      <style jsx>{`
        @media (max-width: 639px) {
          header {
            height: 88px !important;
          }
        }
      `}</style>

      {/* Botão hambúrguer (mobile) */}
      <button
        type="button"
        className="sm:hidden inline-flex items-center justify-center p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
        onClick={onToggleSidebar}
        aria-label="Abrir menu"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Logo */}
      <img
        src="/Zelos-Logo-Header.png"
        alt="Logo"
        className="h-16 sm:h-28 md:h-65 md:mt-2 md:ml-[-70px] object-contain -mt-6 sm:-mt-16"
      />

      <div className="w-9" />
    </header>
  );
}
