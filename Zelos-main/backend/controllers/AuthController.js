import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { read, create } from "../config/database.js"; // seu DB atual
import { JWT_SECRET } from "../config/jwt.js";
import model from "../models/modelUsuario.js"; // modelo usado no CadastroController
import passport from "passport";

// ==============================
// Cadastro de usuário (login local)
// ==============================
const registerController = async (req, res) => {
  try {
    const { nome, numeroUsuario, senha, funcao } = req.body;

    if (!nome || !numeroUsuario || !senha) {
      return res.status(400).json({ mensagem: "Preencha todos os campos obrigatórios" });
    }

    // Verifica se já existe
    const existingUser = await model.buscarUsuarioPorNumero(numeroUsuario);
    if (existingUser) {
      return res.status(409).json({ mensagem: "Número de usuário já cadastrado" });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    // Cria usuário local (usuario ou tecnico)
    const usuarioId = await model.criarUsuarioModel({
      nome,
      numeroUsuario,
      senha: hashedPassword,
      funcao: funcao || "usuario",
    });

    res.status(201).json({
      mensagem: "Usuário cadastrado com sucesso",
      user: {
        id: usuarioId,
        nome,
        numeroUsuario,
        funcao: funcao || "usuario",
      },
    });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    res.status(500).json({ mensagem: "Erro ao cadastrar usuário" });
  }
};

// ==============================
// Login local (banco de dados)
// ==============================
const loginLocalController = async (req, res) => {
  try {
    const { numeroUsuario, senha } = req.body;

    if (!numeroUsuario || !senha) {
      return res.status(400).json({ mensagem: "Preencha todos os campos" });
    }

    // Busca usuário pelo modelo
    const usuario = await model.buscarUsuarioPorNumero(numeroUsuario);

    if (!usuario || !usuario.senha) {
      return res.status(401).json({ mensagem: "Credenciais inválidas" });
    }

    // Compara senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ mensagem: "Credenciais inválidas" });
    }

    const token = jwt.sign(
      { id: usuario.id, funcao: usuario.funcao },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      mensagem: "Login realizado com sucesso",
      token,
      user: {
        id: usuario.id,
        numeroUsuario: usuario.numeroUsuario,
        nome: usuario.nome,
        funcao: usuario.funcao,
      },
    });
  } catch (error) {
    console.error("Erro no login local:", error);
    res.status(500).json({ mensagem: "Erro ao processar login" });
  }
};

// ==============================
// Login LDAP (todos são admin)
// ==============================
const loginLDAPController = (req, res, next) => {
  passport.authenticate("ldapauth", { session: false }, async (err, ldapUser) => {
    if (err) {
      console.error("Erro no LDAP:", err);
      return res.status(500).json({ mensagem: "Erro ao autenticar no LDAP" });
    }

    if (!ldapUser) {
      return res.status(401).json({ mensagem: "Credenciais inválidas" });
    }

    try {
      const numeroUsuario = ldapUser.sAMAccountName;
      const nome = ldapUser.name;

      // Verifica se já existe no banco
      let usuario = await model.buscarUsuarioPorNumero(numeroUsuario);

      if (!usuario) {
        // Cria novo usuário LDAP como admin
        const usuarioId = await model.criarUsuarioModel({ numeroUsuario, nome, funcao: "admin" });
        usuario = { id: usuarioId, numeroUsuario, nome, funcao: "admin" };
      } else if (!usuario.funcao) {
        // Caso exista mas não tenha função definida, define como admin
        usuario.funcao = "admin";
      }

      const token = jwt.sign(
        { id: usuario.id, funcao: usuario.funcao },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({
        mensagem: "Login LDAP realizado com sucesso",
        token,
        user: {
          id: usuario.id,
          numeroUsuario: usuario.numeroUsuario,
          nome: usuario.nome,
          funcao: usuario.funcao,
        },
      });
    } catch (error) {
      console.error("Erro geral no login LDAP:", error);
      res.status(500).json({ mensagem: "Erro ao processar login LDAP" });
    }
  })(req, res, next);
};

export { registerController, loginLocalController, loginLDAPController };
