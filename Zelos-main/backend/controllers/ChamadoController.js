import { create, readAll, read, update, deleteRecord } from "../config/database.js";

// GET todos os chamados
export const getChamados = async (req, res) => {
  try {
    const chamados = await readAll("chamados");

    const resultados = await Promise.all(
      chamados.map(async (c) => {
        const tipo = c.tipo_id ? await read("pool", "id = ?", [c.tipo_id]) : [];
        const tecnico = c.tecnico_id ? await read("usuarios", "id = ?", [c.tecnico_id]) : [];
        const usuario = c.usuario_id ? await read("usuarios", "id = ?", [c.usuario_id]) : [];

        return {
          id: c.id,
          titulo: c.titulo,
          descricao: c.descricao,
          status: c.status,
          tipo_id: c.tipo_id,
          tecnico_id: c.tecnico_id,
          usuario_id: c.usuario_id,
          tipo_nome: tipo[0]?.titulo || "-",
          tecnico_nome: tecnico[0]?.nome || "-",
          usuario_nome: usuario[0]?.nome || "-",
          criado_em: c.criado_em ? new Date(c.criado_em).toISOString() : null,
          atualizado_em: c.atualizado_em ? new Date(c.atualizado_em).toISOString() : null,
        };
      })
    );

    resultados.sort((a, b) => new Date(b.criado_em) - new Date(a.criado_em));

    res.json(resultados);
  } catch (err) {
    console.error("Erro ao buscar chamados:", err);
    res.status(500).json({ error: "Erro ao buscar chamados" });
  }
};

// POST criar chamado
export const createChamado = async (req, res) => {
  try {
    const data = {
      titulo: req.body.titulo,
      descricao: req.body.descricao,
      tipo_id: req.body.tipo_id || null,
      tecnico_id: req.body.tecnico_id || null,
      usuario_id: req.body.usuario_id || null,
      status: req.body.status || "pendente",
    };

    const id = await create("chamados", data);
    const novoChamado = await read("chamados", "id = ?", [id]);

    const tipo = novoChamado.tipo_id ? await read("pool", "id = ?", [novoChamado.tipo_id]) : [];
    const tecnico = novoChamado.tecnico_id ? await read("usuarios", "id = ?", [novoChamado.tecnico_id]) : [];
    const usuario = novoChamado.usuario_id ? await read("usuarios", "id = ?", [novoChamado.usuario_id]) : [];

    res.json({
      ...novoChamado,
      tipo_nome: tipo[0]?.titulo || null,
      tecnico_nome: tecnico[0]?.nome || null,
      usuario_nome: usuario[0]?.nome || null,
    });
  } catch (err) {
    console.error("Erro ao criar chamado:", err);
    res.status(500).json({ error: "Erro ao criar chamado" });
  }
};

// PUT atualizar chamado
export const updateChamado = async (req, res) => {
  try {
    const { id } = req.params;

    const data = {};
    ["titulo", "descricao", "tipo_id", "tecnico_id", "usuario_id", "status"].forEach(col => {
      if (req.body[col] !== undefined) data[col] = req.body[col];
    });

    await update("chamados", data, "id = ?", [id]);
    const atualizado = await read("chamados", "id = ?", [id]);

    if (!atualizado) return res.status(404).json({ error: "Chamado não encontrado" });

    const tipo = atualizado.tipo_id ? await read("pool", "id = ?", [atualizado.tipo_id]) : [];
    const tecnico = atualizado.tecnico_id ? await read("usuarios", "id = ?", [atualizado.tecnico_id]) : [];
    const usuario = atualizado.usuario_id ? await read("usuarios", "id = ?", [atualizado.usuario_id]) : [];

    res.json({
      ...atualizado,
      tipo_nome: tipo[0]?.titulo || null,
      tecnico_nome: tecnico[0]?.nome || null,
      usuario_nome: usuario[0]?.nome || null,
    });
  } catch (err) {
    console.error("Erro ao atualizar chamado:", err);
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
    console.error("Erro ao deletar chamado:", err);
    res.status(500).json({ error: "Erro ao deletar chamado" });
  }
};

// GET técnicos
export const getTecnicos = async (req, res) => {
  try {
    const usuarios = await readAll("usuarios");
    const tecnicos = usuarios.filter(u => u.funcao === "tecnico");
    res.json(tecnicos);
  } catch (err) {
    console.error("Erro ao buscar técnicos:", err);
    res.status(500).json({ error: "Erro ao buscar técnicos" });
  }
};

// GET tipos (pool)
export const getTipos = async (req, res) => {
  try {
    const tipos = await readAll("pool");
    res.json(tipos);
  } catch (err) {
    console.error("Erro ao buscar tipos:", err);
    res.status(500).json({ error: "Erro ao buscar tipos" });
  }
};