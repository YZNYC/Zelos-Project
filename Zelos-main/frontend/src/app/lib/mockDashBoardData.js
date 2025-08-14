// lib/mockDashboardData.js

export function genCounters() {
  return {
    abertos: Math.floor(Math.random() * 50) + 10,
    andamento: Math.floor(Math.random() * 30) + 5,
    finalizados: Math.floor(Math.random() * 100) + 20,
    tempoMedioHoras: (Math.random() * 72).toFixed(1),
  };
}

export function genPieData() {
  return [
    { name: "TI", value: Math.floor(Math.random() * 100) + 10 },
    { name: "Manutenção", value: Math.floor(Math.random() * 100) + 10 },
    { name: "Limpeza", value: Math.floor(Math.random() * 100) + 10 },
  ];
}

export function genLineData() {
  const labels = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ];

  return labels.map((name) => ({
    name,
    abertos: Math.floor(Math.random() * 200) + 300,      // números altos para abertos
    finalizados: Math.floor(Math.random() * 450) + 300,  // números altos para finalizados
  }));
}

export function genRecentRows(qtd = 80) {
  const statusList = ["Em aberto", "Em andamento", "Finalizado"];
  const tecnicos = ["Carlos", "Ana", "Roberto", "Fernanda", "Paulo"];
  return Array.from({ length: qtd }, () => ({
    protocolo: Math.floor(100000000 + Math.random() * 900000000),
    descricao: ["DataShow", "Computador", "Cadeira", "Rede", "Lâmpada"][Math.floor(Math.random() * 5)],
    status: statusList[Math.floor(Math.random() * statusList.length)],
    dataAbertura: `${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}/${
      String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")
    }/25`,
    tecnico: tecnicos[Math.floor(Math.random() * tecnicos.length)],
  }));
}
