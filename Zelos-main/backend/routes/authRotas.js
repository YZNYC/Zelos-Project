import express from 'express';
import passport from '../config/ldap.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/jwt.js';
import { create, read } from '../config/database.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', (req, res, next) => {
  passport.authenticate('ldapauth', { session: false }, async (err, user, info) => {
    try {
      if (err) {
        console.error('Erro na autenticação LDAP:', err);
        return res.status(500).json({ error: 'Erro interno no servidor' });
      }

      if (!user) {
        console.warn('Falha na autenticação:', info?.message || 'Credenciais inválidas');
        return res.status(401).json({ error: info?.message || 'Autenticação falhou' });
      }

      const numeroUsuario = user.sAMAccountName;
      const nome = user.name;

      try {

        const existingUser = await read('usuarios', 'numeroUsuario = ?', [numeroUsuario]);

        if (!existingUser) {
          const userId = await create('usuarios', { numeroUsuario, nome });
          console.log(`Novo usuário LDAP salvo no MySQL: ${numeroUsuario} (ID: ${userId})`);
        } else {
          console.log(`Usuário LDAP já existe no MySQL: ${numeroUsuario}`);
        }
      } catch (dbError) {
        console.error('Erro ao salvar usuário no MySQL:', dbError);
      }

      const payload = {
        id: numeroUsuario,
        tipo: 'usuario_ldap',
        username: numeroUsuario,
        displayName: nome
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

      console.log('Usuário autenticado LDAP:', numeroUsuario);

      return res.json({
        message: 'Autenticado com sucesso',
        token,
        user: {
          username: numeroUsuario,
          displayName: nome,
          email: user.mail
        }
      });
    } catch (error) {
      console.error('Erro inesperado no login:', error);
      res.status(500).json({ error: 'Erro inesperado no servidor' });
    }
  })(req, res, next);
});

router.get('/perfil', AuthMiddleware('usuario_ldap'), (req, res) => {
  res.json({
    mensagem: 'Acesso permitido à rota protegida',
    usuario: req.usuario
  });
});

export default router;
