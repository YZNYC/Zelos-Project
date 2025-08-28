import { readAll } from "../config/database.js";

// Contadores (cards)
export async function getCounters() {
  const chamados = await readAll("chamados");
  const apontamentos = await readAll("apontamentos");

  const abertos = chamados.filter(c => c.status === "pendente").length;
  const andamento = chamados.filter(c => c.status === "em andamento").length;
  const finalizados = chamados.filter(c => c.status === "concluido").length;

  const totalSegundos = apontamentos.reduce((acc, ap) => acc + (ap.duracao || 0), 0);
  const tempoMedioHoras = apontamentos.length ? +(totalSegundos / apontamentos.length / 3600).toFixed(2) : 0;

  return { abertos, andamento, finalizados, tempoMedioHoras };
}

// Pie chart: Chamados por tipo
export async function getPieData() {
  const chamados = await readAll("chamados");
  const pools = await readAll("pool");

  // Inicializa o contador com todos os tipos
  const grouped = pools.reduce((acc, p) => {
    acc[p.titulo] = 0;
    return acc;
  }, {});

  // Conta os chamados por tipo_id válido
  chamados.forEach(c => {
    const tipo = pools.find(p => p.id === c.tipo_id);
    if (tipo) grouped[tipo.titulo]++;
  });

  // Retorna somente tipos com contagem > 0
  return Object.entries(grouped)
    .filter(([_, value]) => value > 0)
    .map(([name, value]) => ({ name, value }));
}

// Line chart (últimos 7 dias) com status abertos, andamento e finalizados
export async function getLineData() {
  const chamados = await readAll("chamados");

  const hoje = new Date();
  const dias = [...Array(7)].map((_, i) => {
    const d = new Date(hoje);
    d.setDate(hoje.getDate() - i);
    return d.toISOString().slice(0, 10);
  }).reverse();

  const dataMap = dias.reduce((acc, dia) => {
    acc[dia] = { abertos: 0, andamento: 0, finalizados: 0 };
    return acc;
  }, {});

  chamados.forEach(c => {
    if (!c.criado_em) return;
    const dia = new Date(c.criado_em).toISOString().slice(0, 10);
    if (dataMap[dia]) {
      if (c.status === "pendente") dataMap[dia].abertos++;
      else if (c.status === "em andamento") dataMap[dia].andamento++;
      else if (c.status === "concluido") dataMap[dia].finalizados++;
    }
  });

  return Object.entries(dataMap).map(([date, counts]) => ({
    date,
    ...counts
  }));
}

// Chamados recentes
export async function getRecentRows(limit = 10) {
  const chamados = await readAll("chamados");
  const usuarios = await readAll("usuarios");
  const pools = await readAll("pool");

  return chamados
    .sort((a, b) => new Date(b.criado_em) - new Date(a.criado_em))
    .slice(0, limit)
    .map(c => {
      const d = new Date(c.criado_em);
      const dataFormatada = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

      return {
        id: c.id,
        protocolo: c.id,
        titulo: c.titulo,
        status: c.status,
        dataAbertura: dataFormatada,
        usuario: usuarios.find(u => u.id === c.usuario_id)?.nome || "-",
        tecnico: usuarios.find(u => u.id === c.tecnico_id)?.nome || "-",
        tipo: pools.find(p => p.id === c.tipo_id)?.titulo || "-"
      };
    });
}
