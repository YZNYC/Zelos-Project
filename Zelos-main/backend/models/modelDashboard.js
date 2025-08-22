// models/modelDashboard.js
import { readAll } from "../config/database.js";

//  Counters
export async function getCounters() {
  const chamados = await readAll("chamados");
  const apontamentos = await readAll("apontamentos");

  console.log("Chamados:", chamados);
  console.log("Apontamentos:", apontamentos);

  const abertos = chamados.filter(c => c.status === "pendente").length;
  const andamento = chamados.filter(c => c.status === "em andamento").length;
  const finalizados = chamados.filter(c => c.status === "concluido").length;

  let totalSegundos = apontamentos.reduce((acc, ap) => acc + (ap.duracao || 0), 0);
  let tempoMedioHoras = apontamentos.length ? +(totalSegundos / apontamentos.length / 3600).toFixed(2) : 0;

  return { abertos, andamento, finalizados, tempoMedioHoras };
}

// Pie chart
export async function getPieData() {
  const chamados = await readAll("chamados");
  const grouped = chamados.reduce((acc, c) => {
    acc[c.status] = (acc[c.status] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(grouped).map(([name, value]) => ({ name, value }));
}

//  Line chart (últimos 7 dias)
export async function getLineData() {
    const chamados = await readAll("chamados");
    const hoje = new Date();
  
    const dias = [...Array(7)].map((_, i) => {
      const d = new Date(hoje);
      d.setDate(hoje.getDate() - i);
      return d.toISOString().slice(0, 10); // yyyy-mm-dd
    }).reverse();
  
    const dataMap = dias.reduce((acc, dia) => ({ ...acc, [dia]: 0 }), {});
  
    chamados.forEach(c => {
      if (!c.criado_em) return;
      // Converte Date para string yyyy-mm-dd
      const dia = new Date(c.criado_em).toISOString().slice(0, 10);
      if (dia in dataMap) dataMap[dia]++;
    });
  
    return Object.entries(dataMap).map(([date, value]) => ({ date, value }));
  }
  
//  Recent chamados
export async function getRecentRows(limit = 10) {
  const chamados = await readAll("chamados");
  const usuarios = await readAll("usuarios");

  return chamados
    .sort((a, b) => new Date(b.criado_em) - new Date(a.criado_em))
    .slice(0, limit)
    .map(c => ({
      id: c.id,
      protocolo: c.id,
      titulo: c.titulo,
      status: c.status,
      dataAbertura: c.criado_em,
      usuario: usuarios.find(u => u.id === c.usuario_id)?.nome || "-",
      tecnico: usuarios.find(u => u.id === c.tecnico_id)?.nome || "-"
    }));
}
