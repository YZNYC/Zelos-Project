// app.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRotas from './routes/authRotas.js';
import dashboardRotas from "./routes/dashboardRoute.js";
import chamadosRotas from "./routes/ChamadoRoute.js";

dotenv.config();

const app = express();
const porta = process.env.PORT || 8080;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Rotas
app.use('/auth', authRotas);
app.use("/api/dashboard", dashboardRotas);
app.use("/api/chamados", chamadosRotas);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'online' });
});

// Tratamento de erros
process.on('unhandledRejection', (reason, promise) => {
  console.error('Rejeição não tratada em:', promise, 'motivo:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('Exceção não capturada:', err);
  process.exit(1);
});

// Inicializa servidor
const server = app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
}).on('error', (err) => {
  console.error('Erro ao iniciar:', err);
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Servidor encerrado');
  });
});
