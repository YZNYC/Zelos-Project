import { getCounters, getPieData, getLineData, getRecentRows } from "../models/modelDashboard.js";

export const getDashboardCounters = async (req, res) => {
  try {
    const data = await getCounters();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar contadores do dashboard" });
  }
};

export const getDashboardPie = async (req, res) => {
  try {
    const data = await getPieData();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar dados do pie chart" });
  }
};

export const getDashboardLine = async (req, res) => {
  try {
    const data = await getLineData();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar dados do line chart" });
  }
};

export const getDashboardRecent = async (req, res) => {
  try {
    const data = await getRecentRows();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar chamados recentes" });
  }
};
