import { create, readAll, read, update, deleteRecord } from "../config/database.js";

// GET todos chamados
export const getChamados = async (req, res) => {
  try {
    // Busca todos os chamados
    const chamados = await readAll("chamados");

    // Se quiser, pode mapear para incluir tipo_nome e nomes de técnicos/usuários
    const resultados = await Promise.all(
      chamados.map(async (c) => {
        const tipo = c.tipo_id ? await read("pool", "id = ?", [c.tipo_id]) : [];
        const tecnico = c.tecnico_id ? await read("usuarios", "id = ?", [c.tecnico_id]) : [];
        const usuario = c.usuario_id ? await read("usuarios", "id = ?", [c.usuario_id]) : [];
        return {
          ...c,
          tipo_nome: tipo[0]?.titulo || null,
          tecnico_nome: tecnico[0]?.nome || null,
          usuario_nome: usuario[0]?.nome || null,
        };
      })
    );

    res.json(resultados);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar chamados" });
  }
};

// POST criar chamado
export const createChamado = async (req, res) => {
  try {
    const id = await create("chamados", req.body);
    const novoChamado = await read("chamados", "id = ?", [id]);

    // Inclui nomes relacionados
    const tipo = novoChamado[0].tipo_id ? await read("pool", "id = ?", [novoChamado[0].tipo_id]) : [];
    const tecnico = novoChamado[0].tecnico_id ? await read("usuarios", "id = ?", [novoChamado[0].tecnico_id]) : [];
    const usuario = novoChamado[0].usuario_id ? await read("usuarios", "id = ?", [novoChamado[0].usuario_id]) : [];

    res.json({
      ...novoChamado[0],
      tipo_nome: tipo[0]?.titulo || null,
      tecnico_nome: tecnico[0]?.nome || null,
      usuario_nome: usuario[0]?.nome || null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar chamado" });
  }
};

// PUT atualizar chamado
export const updateChamado = async (req, res) => {
  try {
    const { id } = req.params;
    await update("chamados", req.body, "id = ?", [id]);
    const atualizado = await read("chamados", "id = ?", [id]);

    const tipo = atualizado[0].tipo_id ? await read("pool", "id = ?", [atualizado[0].tipo_id]) : [];
    const tecnico = atualizado[0].tecnico_id ? await read("usuarios", "id = ?", [atualizado[0].tecnico_id]) : [];
    const usuario = atualizado[0].usuario_id ? await read("usuarios", "id = ?", [atualizado[0].usuario_id]) : [];

    res.json({
      ...atualizado[0],
      tipo_nome: tipo[0]?.titulo || null,
      tecnico_nome: tecnico[0]?.nome || null,
      usuario_nome: usuario[0]?.nome || null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar chamado" });
  }
};

// DELETE chamado
export const deleteChamado = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteRecord("chamados", "id = ?", [id]);
    res.json({ message: "Chamado deletado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao deletar chamado" });
  }
};

// GET técnicos
export const getTecnicos = async (req, res) => {
  try {
    const usuarios = await readAll("usuarios");
    const tecnicos = usuarios.filter((u) => u.funcao === "tecnico");
    res.json(tecnicos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar técnicos" });
  }
};
