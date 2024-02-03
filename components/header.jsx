"use client"

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const Header = () => {
  const { data, status } = useSession();
  const isAuth = status === "authenticated";

  if (isAuth) {
    return (
      <p>Olá, {data?.user?.username} <button onClick={() => signOut()}>Sair</button></p>
    );
  };
  
  return (
    <header>
      <Link href="/">Home</Link>
      <Link href="/cadastrar">Cadastrar</Link>
      <Link href="/entrar">Entrar</Link>
      <Link href="/free">Free</Link>
      <Link href="/pro">pro</Link>
      <Link href="/perfil">Perfil</Link>
    </header>
  );
};
