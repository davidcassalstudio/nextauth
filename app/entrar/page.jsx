export default function Entrar() {
  return (
    <>
      <h1>Entrar</h1>

      <form>
        <input type="email" name="email" id="email" placeholder="Seu email" />
        <input
          type="password"
          name="senha"
          id="senha"
          placeholder="Sua senha"
        />
        <button type="submit">Entrar</button>
      </form>
    </>
  );
}
