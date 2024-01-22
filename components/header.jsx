import Link from "next/link";

export const Header = () => {
  return (
    <header>
      <Link href="/">Home</Link>
      <Link href="/cadastrar">Cadastrar</Link>
      <Link href="/entrar">Entrar</Link>
      <Link href="/free">Free</Link>
      <Link href="/pro">pro</Link>
      <Link href="/perfil">Perfil</Link>
      <button>Sair</button>
    </header>
  );
};
