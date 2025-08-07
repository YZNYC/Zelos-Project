import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/jwt.js';

const AuthMiddleware = (...tiposPermitidos) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ mensagem: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.usuario = decoded;

      if (!tiposPermitidos.includes(decoded.tipo)) {
        return res.status(403).json({ mensagem: 'Acesso negado: permissão insuficiente' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ mensagem: 'Token inválido ou expirado' });
    }
  };
};

export default AuthMiddleware;
