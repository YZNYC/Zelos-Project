import express from 'express';
import passport from '../config/ldap.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/jwt.js';
import { create, read } from '../config/database.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// POST /login
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  try {
   
    passport.authenticate('ldapauth', { session: false }, async (err, ldapUser, info) => {
      if (err) return res.status(500).json({ error: 'Erro interno no LDAP' });

      if (ldapUser) {
        // Usuário LDAP autenticado
        const numeroUsuario = ldapUser.sAMAccountName;
        const nome = ldapUser.name;

        // Salva no banco caso não exista
        const existingUser = await read('usuarios', 'numeroUsuario = ?', [numeroUsuario]);
        if (!existingUser) {
          await create('usuarios', { numeroUsuario, nome, senha: null }); // senha null pq LDAP
          console.log(`Novo usuário LDAP salvo no MySQL: ${numeroUsuario}`);
        }

        // Cria token
        const payload = { id: numeroUsuario, tipo: 'ldap', username: numeroUsuario, displayName: nome };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        return res.json({
          message: 'Autenticado via LDAP',
          token,
          user: { username: numeroUsuario, displayName: nome, email: ldapUser.mail }
        });
      }

      // 2 Se não foi LDAP, tenta no banco
      const userDB = await read('usuarios', 'numeroUsuario = ?', [username]);

      if (!userDB) return res.status(401).json({ error: 'Usuário ou senha inválidos' });

      // Compara senha com bcrypt
      const senhaValida = await bcrypt.compare(password, userDB.senha);
      if (!senhaValida) return res.status(401).json({ error: 'Usuário ou senha inválidos' });

      // Cria token
      const payload = { id: userDB.id, tipo: 'db', username: userDB.numeroUsuario, displayName: userDB.nome };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

      return res.json({
        message: 'Autenticado via banco',
        token,
        user: { username: userDB.numeroUsuario, displayName: userDB.nome, email: userDB.email }
      });
    })(req, res, next);

  } catch (error) {
    console.error('Erro inesperado no login:', error);
    res.status(500).json({ error: 'Erro inesperado no servidor' });
  }
});

export default router;
