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

export const relatorios = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  tecnico: `Técnico ${Math.floor(Math.random() * 10) + 1}`,
  protocolo: `PROTO-${Math.floor(1000 + Math.random() * 9000)}`,
  descricao: `Descrição detalhada do protocolo ${i + 1}, com todos os detalhes necessários para análise.`,
  tempoResolucao: `${Math.floor(Math.random() * 24)}h ${Math.floor(Math.random() * 60)}m`,
  data: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString(),
}));
