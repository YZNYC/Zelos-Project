'use client'
import { useState, useEffect } from "react";
import DashboardCard from '../Components/DashboardCard/Card';
import { TbNumber } from "react-icons/tb";
import {  PiPlusCircleBold, PiPencilSimpleBold, PiTrashBold, PiListChecksBold } from "react-icons/pi";

const cardBaseStyle = "bg-gray-100 border border-slate-700 rounded-xl p-5  transition-all duration-200 flex flex-col min-h-[180px] sm:min-h-[200px]";
const cardActionStyle = "cursor-pointer hover:border-sky-500 active:bg-white";
const cardIconColor = "text-white";
const cardIconSize = 30;
const cardTitleStyle = "font-semibold text-slate-100 text-base sm:text-lg mb-1 mt-2";
const cardDescriptionStyle = "text-slate-400 text-xs sm:text-sm flex-grow";
const cardValueStyle = `font-bold text-2xl sm:text-3xl mb-1 ${cardIconColor}`;


export default function dashBoard() {

  return (
    // <RotaProtegidaAdm requiredRole="responsavel">

      <>
        <main
          className="h-screen bg-cover bg-center bg-no-repeat overflow-hidden px-10 md:px-10 ml-10 flex items-center justify-center"
          style={{ backgroundColor: "#D3D3D3"}}
        >
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6 ">
                <DashboardCard
                  cardStyle={cardBaseStyle} iconColor={cardIconColor} titleStyle={cardTitleStyle} descriptionStyle={cardDescriptionStyle} valueStyle={cardValueStyle}
                  icon={<TbNumber size={cardIconSize} />}
                  title="Total de Admins"
                  description="Número atual de administradores ativos no sistema."
                      value={"nada"}
                />
                <DashboardCard
                  cardStyle={`${cardBaseStyle} ${cardActionStyle}`} iconColor={cardIconColor} titleStyle={cardTitleStyle} descriptionStyle={cardDescriptionStyle}
                  icon={<PiPlusCircleBold size={cardIconSize} />}
                  title="Novo Administrador"
                  description="Clique para adicionar um novo perfil de administrador."
                  onClick={() => setShowModalCadastroAdmin(true)}
                  action
                />
                <DashboardCard
                  cardStyle={`${cardBaseStyle} ${cardActionStyle}`} iconColor={cardIconColor} titleStyle={cardTitleStyle} descriptionStyle={cardDescriptionStyle}
                  icon={<PiListChecksBold size={cardIconSize} />}
                  title="Listar Administradores"
                  description="Acesse o relatório completo de administradores."
                  onClick={() => setShowModalRelatorioAdmin(true)}
                  action
                />
                <DashboardCard
                  cardStyle={`${cardBaseStyle} ${cardActionStyle}`} iconColor={cardIconColor} titleStyle={cardTitleStyle} descriptionStyle={cardDescriptionStyle}
                  icon={<PiPencilSimpleBold size={cardIconSize} />}
                  title="Editar Admin"
                  description="Modifique informações de um administrador existente."
                  onClick={() => setShowModalUpdateAdmin(true)}
                  action
                />
                <DashboardCard
                  cardStyle={`${cardBaseStyle} ${cardActionStyle} hover:border-red-500 group`} iconColor="text-red-400 group-hover:text-red-500" titleStyle={cardTitleStyle} descriptionStyle={cardDescriptionStyle}
                  icon={<PiTrashBold size={cardIconSize} />}
                  title="Excluir Admin"
                  description="Remova um administrador do sistema (ação irreversível)."
                  onClick={() => setShowModalExcluirAdmin(true)}
                  action
                />
                <DashboardCard
                  cardStyle={`${cardBaseStyle} ${cardActionStyle} hover:border-red-500 group`} iconColor="text-red-400 group-hover:text-red-500" titleStyle={cardTitleStyle} descriptionStyle={cardDescriptionStyle}
                  icon={<PiTrashBold size={cardIconSize} />}
                  title="Historico"
                  description="Visualize o historico de alterações"
                  onClick={() => setShowModalHistorico(true)}
                  action
                />

                </div>


        </main>
      </>
  );
}