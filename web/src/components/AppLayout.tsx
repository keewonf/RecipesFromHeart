import { Sidebar } from "./Sidebar";

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-light md:grid md:grid-cols-[minmax(150px,200px)_1fr] md:grid-rows-[auto_1fr]">
      <Sidebar className="w-full border-b p-3 md:row-span-2 md:w-auto md:border-b-0 md:border-r" />
      <header className="bg-surface-light p-3">
        <button>Notificações</button>
        <span>Imagem</span>
      </header>
      <main className="bg-surface-light p-3">
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
