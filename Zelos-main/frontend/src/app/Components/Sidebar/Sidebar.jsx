'use client';
// imports
import { useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 


export default function Sidebar() {
    const router = useRouter();

  const menus = [
    { title: "Visão geral", link: "./dashBoard" },
    { title: "Chamados", link: "./RotaAluno" },
    { title: "Relatórios", link: "./RotaAluno" },
    { title: "Técnicos", link: "./RotaAluno" },
    { title: "Configurações", link: "./RotaAluno" },
  ];

  return (
<div
  className={`
    hidden sm:flex
    w-90
    p-5 pt-8
    flex-col justify-between
    duration-300
    z-50
    fixed left-0 bottom-0  
    h-[calc(100%-165px)]  
  `}
  style={{ backgroundColor: '#002F6C'}}
>   <div>

        <ul className="pt-6">
          {menus.map((menu, index) => (
            <li key={index} className="mt-2">
              <Link
                href={menu.link}
                title={menu.title}
                className={`
                  flex items-center gap-6 cursor-pointer
                  text-white-700 text-sm p-2 rounded-md
                  duration-200 hover:bg-[#113F7A] hover:text-white
                `}
              >
                <span className="text-xl text-white"></span>
                <span className={`text-base duration-200 text-white font-bold text-xl py-4`}>{menu.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center items-center ">
          <span className="text-md text-white text-center"><strong>Zelos © 2025 - Escola SENAI <br></br> Armando de Arruda Pereira</strong></span>
      </div>
    </div>
  );
}