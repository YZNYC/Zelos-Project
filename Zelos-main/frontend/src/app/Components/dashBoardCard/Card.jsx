'use client';
import React from 'react';

export default function DashboardCard({
  icon,
  title,
  value,
  description,
  onClick,
  color = "text-white-500",
  action = false,
}) {
  let corPrincipal = 'white';
  let tomCor = '500';

  if (color.startsWith('text-')) {
    const partes = color.split('-');
    if (partes.length >= 2) corPrincipal = partes[1];
    if (partes.length >= 3) tomCor = partes[2];
  }

  const estiloCard = `
    relative group
    flex flex-col items-center justify-start

    w-full sm:w-60 md:w-64 xl:w-80 2xl:w-96
    min-h-[200px] sm:min-h-[220px]
    p-4 pt-14 sm:pt-16
    rounded-xl text-center
    bg-gray-500 

    border border-slate-700 border-l-4 border-l-blue-500
    shadow-[0_4px_10px_rgba(0,0,0,0.2),_0_1px_3px_rgba(0,0,0,0.1)]
    shadow-blue-500/30

    transition-all duration-300 ease-out
    mb-5 mt-5 md:ml-7 2xl:mb-10 2xl:ml-15 2xl:mt-5
  `;

  const estiloClickavel = action ? `
    cursor-pointer
    hover:-translate-y-1.5
    hover:shadow-xl hover:shadow-blue-500/30
    focus:outline-none focus:ring-2
    focus:ring-blue-500
    focus:ring-offset-2 focus:ring-offset-slate-800
  ` : '';

  const estiloIconeContainer = `
    absolute -top-6 sm:-top-7 left-1/2 -translate-x-1/2
    flex items-center justify-center
    w-16 h-16 sm:w-[70px] sm:h-[70px]
    rounded-full bg-gray-200
    border-2 border-slate-600
    shadow-lg transition-all duration-300 ease-out
    group-hover:bg-${corPrincipal}-${tomCor}
    group-hover:border-${corPrincipal}-${parseInt(tomCor) < 600 ? (parseInt(tomCor) + 100) : tomCor}
  `;

  const estiloIcone = `
    transition-colors duration-300
    ${action || value !== undefined ? `group-hover:text-white ${color}` : `text-slate-300 group-hover:${color}`}
  `;

  return (
    <div
      className={`${estiloCard} ${estiloClickavel}`}
      onClick={action ? onClick : undefined}
      role={action ? "button" : undefined}
      tabIndex={action ? 0 : undefined}
      onKeyDown={action && onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      {icon && (
        <div className={estiloIconeContainer}>
          {React.cloneElement(icon, {
            className: `${icon.props.className || ''} ${estiloIcone}`.trim(),
            size: icon.props.size || 30,
          })}
        </div>
      )}

      <div className="flex flex-col items-center w-full h-full">
        <h3 className="text-md sm:text-lg font-extrabold text-slate-100 mb-1 leading-tight mt-1">
          {title}
        </h3>

        {description && (
          <p className="text-xs font-bold text-slate-400 mb-2 px-1 leading-snug flex-grow">
            {description}
          </p>
        )}

        {value !== undefined && (
          <span className={`text-4xl sm:text-5xl font-bold ${color} mt-auto`}>
            {value}
          </span>
        )}
      </div>
    </div>
  );
}