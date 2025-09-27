import { getCounters, getPieData, getLineData, getRecentRows } from "../models/modelDashboard.js";

export const getDashboardCounters = async (req, res) => {
  try {
    const { tecnicoId, usuarioId } = req.query;
    const data = await getCounters(tecnicoId, usuarioId);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar contadores do dashboard" });
  }
};

export const getDashboardPie = async (req, res) => {
  try {
    const { tecnicoId, usuarioId } = req.query;
    const data = await getPieData(tecnicoId, usuarioId);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar dados do pie chart" });
  }
};

export const getDashboardLine = async (req, res) => {
  try {
    const { tecnicoId, usuarioId } = req.query;
    const data = await getLineData(tecnicoId, usuarioId);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar dados do gráfico line" });
  }
};

export const getDashboardRecent = async (req, res) => {
  try {
    const { tecnicoId, usuarioId } = req.query;
    const data = await getRecentRows(tecnicoId, usuarioId);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar chamados recentes" });
  }
};
