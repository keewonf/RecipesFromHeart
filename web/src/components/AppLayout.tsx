import { Sidebar } from "./Sidebar";

export function AppLayout() {
  return (
    <div className="grid h-screen grid-cols-[minmax(220px,280px)_1fr] grid-rows-[auto_1fr]">
      <Sidebar className="row-span-2 border-r" />
      <header>
        <button>Notificações</button>
        <span>Imagem</span>
      </header>
      <main>
        <h1>Minhas receitas</h1>
        <div>
          <h2>Cupcake</h2>
          <p>Tempo: 1h10</p>
          <p>12 porções</p>
          <p>2 estrelas</p>
        </div>
      </main>
    </div>
  );
}
