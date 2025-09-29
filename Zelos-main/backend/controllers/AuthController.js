import jwt from "jsonwebtoken";
import passport from "passport";
import { read, create } from "../config/database.js";
import { JWT_SECRET } from "../config/jwt.js";

const loginController = (req, res, next) => {
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

      let usuario = await read("usuarios", `numeroUsuario = '${numeroUsuario}'`);

      if (!usuario) {
        try {
          await create("usuarios", {
            numeroUsuario,
            nome,
          });

          console.log(`Novo usuário adicionado ao banco: ${numeroUsuario} - ${nome}`);

          usuario = await read("usuarios", `numeroUsuario = '${numeroUsuario}'`);
        } catch (dbError) {
          console.error("Erro ao salvar usuário no banco:", dbError);
          return res.status(500).json({ mensagem: "Erro ao salvar usuário no banco" });
        }
      }

      const token = jwt.sign(
        { id: usuario.id, funcao: usuario.funcao || "usuario" },
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
          funcao: usuario.funcao || "usuario",
        },
      });
    } catch (error) {
      console.error("Erro geral no login:", error);
      res.status(500).json({ mensagem: "Erro ao processar login" });
    }
  })(req, res, next);
};

export { loginController };