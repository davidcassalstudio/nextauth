import { hash } from "bcryptjs";
import mongoose from "mongoose";
import { connectToDB } from "@/lib/utils";
import User from "@/models/user";

export const handler = async (req, res) => {
  connectToDB().catch((err) => res.json(err));

  if (req.method === "POST") {
    if (!req.body) return res.status(400).json({ error: "Faltam dados" });

    const { username, nome, email, senha } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(409).json({ error: "Email já existe" });
    } else {
      if (senha.lenght < 6)
        return res.status(409).json({ error: "Senha muito curta" });

      const criptSenha = await hash(senha, 20);

      User.create(
        { username, nome, email, senha: criptSenha },
        (error, data) => {
          if (error && error instanceof mongoose.Error.ValidationError) {
            for (let field in error.errors) {
              const msg = error.errors[field].message;
              return res.status(409).json({ error: msg });
            }
          }

          const user = {
            _id: data._id,
            username: data.username,
            nome: data.nome,
            email: data.email,
          };

          return res.status(201).json({
            success: true,
            user,
          });
        },
      );
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
};
