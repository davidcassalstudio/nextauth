import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/user";

export async function POST(req) {
  try {
    const { username, nome, email, senha } = await req.json();
    const exists = await User.findOne({ $or: [{ username }, { email }] });

    if (exists) {
      return NextResponse.json(
        { message: "Nome de usuário ou e-mail já existem" },
        { status: 500 },
      );
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    await connectToDB();
    await User.create({
      username,
      nome,
      email,
      senha: hashedPassword,
    });

    console.log("Username", username);
    console.log("Nome", nome);
    console.log("Email", email);
    console.log("Senha", senha);

    return NextResponse.json(
      { message: "Usuário registrado" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Ocorreu algum erro" },
      { status: 500 },
    );
  }
}
