import express from 'express';
import passport from '../config/ldap.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/jwt.js';
import AuthMiddleware from '../middlewares/authMiddleware.js'; 

const router = express.Router();

router.post('/login', (req, res, next) => {
  passport.authenticate('ldapauth', { session: false }, (err, user, info) => {
    try {
      if (err) {
        console.error('Erro na autenticação:', err);
        return res.status(500).json({ error: 'Erro interno no servidor' });
      }
      
      if (!user) {
        console.warn('Falha na autenticação:', info?.message || 'Credenciais inválidas');
        return res.status(401).json({ error: info?.message || 'Autenticação falhou' });
      }

      const payload = {
        id: user.uid || user.sAMAccountName || user.username,
        tipo: 'usuario_ldap',
        username: user.sAMAccountName || user.username,
        displayName: user.displayName
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

      console.log('Usuário autenticado:', user.sAMAccountName || user.username);

      return res.json({ 
        message: 'Autenticado com sucesso', 
        token,
        user: {
          username: payload.username,
          displayName: payload.displayName,
          email: user.mail
        }
      });

    } catch (error) {
      console.error('Erro inesperado:', error);
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
