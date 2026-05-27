import { Link } from "react-router";
import { MessageCircle, Code2, ArrowUpRight } from "lucide-react";

import { RecipeList } from "../components/recipes/RecipeList";
import { useRecipes } from "../hooks/useRecipes";

export function Home() {
  const { recipes, loading } = useRecipes({ type: "community", perPage: 6 });

  return (
    <div className="px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <section className="rounded-[2rem] bg-[linear-gradient(180deg,#fff8f4_0%,#fffdfb_100%)] p-5 shadow-[0_10px_35px_rgba(41,27,26,0.10)] md:p-8">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
            <div className="rounded-3xl border border-surface-dark/10 bg-white/80 p-5 md:p-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-surface-dark md:text-sm">
                🍳 Recipes From Heart
              </p>

              <h1 className="max-w-2xl text-3xl font-bold leading-tight text-text-primary md:text-5xl">
                Recipes From Heart é um projeto que desenvolvi como forma de
                estudo e diversão, onde podemos compartilhar receitas que amamos
                fazer — não importa o que seja! (o ovo frito que compartilhei
                está aí de exemplo hehe 🍳)
              </h1>

              <p className="mt-5 text-base leading-8 text-text-secondary md:text-lg">
                Aqui você pode:
              </p>

              <ul className="mt-3 space-y-3 text-base leading-8 text-text-secondary md:text-lg">
                <li>compartilhar suas receitas,</li>
                <li>ver receitas da comunidade,</li>
                <li>e contribuir para o desenvolvimento do aplicativo!</li>
              </ul>

              <p className="mt-5 text-base leading-8 text-text-secondary md:text-lg">
                Sinta-se livre para dar ideias, relatar erros ou me mandar uma
                mensagem sobre qualquer coisa relacionada ao site 😊
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
              <article className="rounded-3xl border border-surface-dark/10 bg-white/85 p-5 md:p-7">
                <h2 className="text-2xl font-bold text-text-primary md:text-3xl">
                  ❓ Quer saber como usar?
                </h2>

                <p className="mt-4 text-base leading-8 text-text-secondary md:text-lg">
                  É simples! Você pode criar uma conta clicando em
                  “Registrar-se” e depois fazer login.
                </p>

                <p className="mt-4 text-base leading-8 text-text-secondary md:text-lg">
                  E não se preocupe em usar dados reais 😅 Se quiser criar uma
                  conta com o email bolinha@hotmail.com e senha 123456, está
                  mais do que recomendado hahaha.
                </p>

                <p className="mt-4 text-base leading-8 text-text-secondary md:text-lg">
                  Ou talvez você só queira ver as receitas da comunidade antes
                  de decidir criar sua própria conta. Nesse caso, você pode
                  simplesmente clicar em “Receitas da Comunidade” e ignorar o
                  login!
                </p>

                <p className="mt-4 text-base leading-8 text-text-secondary md:text-lg">
                  Mas fica o convite para criar sua conta e compartilhar sua
                  receita conosco ❤️
                </p>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/signup"
                    className="inline-flex h-12 w-full items-center justify-center rounded-2xl border border-surface-dark bg-surface-dark px-4 py-3 text-base font-semibold text-white transition-colors duration-200 hover:bg-text-primary sm:w-auto md:rounded-3xl md:text-xl"
                  >
                    Registrar-se
                  </Link>
                  <Link
                    to="/recipes/community"
                    className="inline-flex h-12 w-full items-center justify-center rounded-2xl border border-surface-dark px-4 py-3 text-base font-semibold text-surface-dark transition-colors duration-200 hover:bg-white/70 hover:text-text-primary sm:w-auto md:rounded-3xl md:text-xl"
                  >
                    Receitas da Comunidade
                  </Link>
                </div>
              </article>

              <article className="rounded-3xl border border-surface-dark/10 bg-white/85 p-5 md:p-7">
                <h2 className="text-2xl font-bold text-text-primary md:text-3xl">
                  🧭 Explicando cada parte do aplicativo
                </h2>

                <div className="mt-4 space-y-4 text-base leading-8 text-text-secondary md:text-lg">
                  <div>
                    <h3 className="font-bold text-text-primary">🏠 Início</h3>
                    <p>
                      Você está aqui! Estou usando essa aba mais para apresentar
                      a ideia do projeto.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-text-primary">
                      📖 Minhas receitas
                    </h3>
                    <p>
                      Aqui você consegue visualizar todas as receitas que criou!
                      <br />
                      🔒 Requer login.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-text-primary">
                      🌎 Receitas da comunidade
                    </h3>
                    <p>
                      Aqui você consegue ver receitas que outras pessoas criaram
                      (inclusive as suas 👀).
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-text-primary">
                      ⭐ Favoritos
                    </h3>
                    <p>
                      Essa parte ainda não está pronta, mas aqui você poderá
                      salvar receitas que viu e gostou muito!!!
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-text-primary">👤 Perfil</h3>
                    <p>
                      Aqui você consegue:
                      <br />
                      visualizar seu perfil,
                      <br />
                      mudar sua foto,
                      <br />
                      alterar seu nome de usuário,
                      <br />
                      visualizar suas receitas.
                      <br />
                      <br />
                      (Ainda estou trabalhando nessa parte também 😅)
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-text-primary">🚪 Sair</h3>
                    <p>Aqui você pode deslogar do aplicativo :(</p>
                  </div>
                </div>
              </article>
            </div>

            <article className="rounded-3xl border border-surface-dark/10 bg-white/85 p-5 md:p-7">
              <h2 className="text-2xl font-bold text-text-primary md:text-3xl">
                🍲 Quer criar sua própria receita?
              </h2>

              <div className="mt-4 space-y-4 text-base leading-8 text-text-secondary md:text-lg">
                <p>
                  Vá em “Minhas receitas”. Lá você encontrará um botão de “Nova
                  receita”.
                </p>

                <p>
                  Ao clicar nele, será aberto um formulário para preencher os
                  dados e adicionar uma fotinho da sua receita 📸
                </p>

                <p>
                  Alguns campos podem ficar vazios, então se você acredita que
                  sua receita não se encaixa em algum deles, não se obrigue a
                  preencher tudo!
                </p>

                <p>
                  Depois é só salvar sua receita ✨ Você poderá visualizá-la
                  logo após salvar e editar algo caso não tenha gostado.
                </p>
              </div>
            </article>

            <article className="rounded-3xl border border-surface-dark/10 bg-white/85 p-5 md:p-7">
              <h2 className="text-2xl font-bold text-text-primary md:text-3xl">
                👨‍💻 Sobre mim
              </h2>

              <div className="mt-4 space-y-4 text-base leading-8 text-text-secondary md:text-lg">
                <p>Lucas Fraga Maria de Moura</p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <a
                    href="https://wa.me/5551981893462"
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between rounded-2xl border border-surface-dark/10 bg-white px-4 py-3 text-text-primary transition-colors duration-200 hover:bg-surface-light"
                  >
                    <span className="flex items-center gap-3 font-semibold">
                      <MessageCircle size={18} className="text-surface-dark" />
                      WhatsApp
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="text-surface-dark transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>

                  <a
                    href="https://github.com/keewonf"
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between rounded-2xl border border-surface-dark/10 bg-white px-4 py-3 text-text-primary transition-colors duration-200 hover:bg-surface-light"
                  >
                    <span className="flex items-center gap-3 font-semibold">
                      <Code2 size={18} className="text-surface-dark" />
                      GitHub
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="text-surface-dark transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="rounded-[2rem] bg-surface-light p-5 shadow-[0_10px_35px_rgba(41,27,26,0.10)] md:p-8">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-surface-dark md:text-sm">
                Comunidade
              </p>
              <h2 className="mt-1 text-2xl font-bold text-text-primary md:text-3xl">
                Receitas em destaque
              </h2>
            </div>
            <Link
              className="text-sm font-bold text-surface-dark hover:text-text-primary md:text-base"
              to="/recipes/community"
            >
              Ver todas
            </Link>
          </div>

          <RecipeList recipes={recipes} loading={loading} />
        </section>
      </div>
    </div>
  );
}
