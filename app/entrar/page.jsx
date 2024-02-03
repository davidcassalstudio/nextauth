"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Entrar() {
  const [data, setData] = useState({
    email: "",
    senha: "",
  });

  const [submitError, setSubmitError] = useState("");
  const router = useRouter();

  const handleEntrar = async (e) => {
    e.preventDefault();

    if (!data.email || !data.senha) {
      setSubmitError("Todos os campos são obrigatórios");
    }

    console.log(data.email, data.senha);

    try {
      const res = await signIn("credentials", {
        email: data.email,
        senha: data.senha,
        redirect: false,
      });
      if (res.error) {
        setSubmitError("Credenciais inválidas");
        return;
      } else {
        router.push("/");
      }
    } catch (error) {
      setSubmitError("Erro no login");
    }
  };

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h1>Entrar</h1>

      <form onSubmit={handleEntrar}>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Seu email"
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="senha"
          id="senha"
          placeholder="Sua senha"
          onChange={handleInputChange}
        />
        <button type="submit">Entrar</button>

        {submitError && <span>{submitError}</span>}
      </form>
    </>
  );
}
