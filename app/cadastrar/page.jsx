"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

export default function Cadastrar() {
  const [data, setData] = useState({
    username: "",
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const [submitError, setSubmitError] = useState("");
  const router = useRouter();

  const handleCadastro = async (e) => {
    e.preventDefault();

    if (
      !data.username ||
      !data.nome ||
      !data.email ||
      !data.senha ||
      !data.confirmarSenha
    ) {
      setSubmitError("Todos os campos são obrigatórios");
      // return;
    }

    if (data.senha.length < 6) {
      setSubmitError("A senha deve ter pelo menos 6 caracteres");
      // return;
    }

    if (data.senha !== data.confirmarSenha) {
      setSubmitError("As senhas devem ser iguais");
      // return;
    }

    try {
      const apiResponse = await axios.post("/api/cadastro", data);

      if (apiResponse?.data?.success) {
        router.push("/login");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data?.error;
        setSubmitError(errorMsg);
      }
    }
  };

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h1>Cadastrar</h1>

      <form onSubmit={handleCadastro}>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Seu email"
          value={data.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="nome"
          id="nome"
          placeholder="Seu nome"
          value={data.nome}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Seu nome de usuário"
          value={data.username}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="senha"
          id="senha"
          placeholder="Sua senha"
          value={data.senha}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="confirmarSenha"
          id="confirmarSenha"
          placeholder="Repita sua senha"
          value={data.confirmarSenha}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Cadastrar</button>

        {submitError && <span>{submitError}</span>}
      </form>
    </>
  );
}
