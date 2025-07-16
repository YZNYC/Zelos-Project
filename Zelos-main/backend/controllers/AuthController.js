import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { db } from '../config/database.js';
import { JWT_SECRET } from '../config/jwt.js'; // Importar a chave secreta

export const loginController = async (req, res) => {
  const { cpf, senha, tipo } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE cpf = ? AND tipo ?', [cpf, tipo]);
    const usuario = rows[0];

    if (!usuario) {
      return res.status(404).json({ mensagem: `${tipo} não encontrado` });
    }

    // Verificar se a senha está correta (comparar a senha enviada com o hash armazenado)
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: 'Senha incorreta' });
    }

    // Gerar o token JWT
    const token = jwt.sign({ id: usuario.id, cpf: usuario.cpf, tipo });

    return res.status(200).json({
      message: `Login de ${tipo} efetuado com sucesso.`,
      token,
    });
  } catch (err) {
    console.error("Erro ao efetuar login:", err);
    return res.status(500).json({message: 'Erro interno ao efetuar login.'});
  }
};
