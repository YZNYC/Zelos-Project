const API_URL = 'http://localhost:5000'; // Porta do backend

export async function getChamados() {
  const res = await fetch(`${API_URL}/usuario/chamados`);
  return await res.json();
}

export async function criarChamado(data) {
  const res = await fetch(`${API_URL}/usuario/chamados`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await res.json();
}
