# RecipesFromHeart 🍰

RecipesFromHeart é uma plataforma fullstack de compartilhamento de receitas onde usuários podem criar, editar e compartilhar receitas com a comunidade.

O projeto foi desenvolvido com foco em praticar conceitos reais de desenvolvimento fullstack, como autenticação JWT, APIs REST, upload de imagens, relacionamentos em banco de dados, gerenciamento de estado e integração entre frontend e backend.

## Sumário

- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias-utilizadas)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Rodando localmente](#-rodando-localmente)
- [Variáveis de ambiente](#-variáveis-de-ambiente)
- [Build & Deploy](#-build-e-deploy)
- [Troubleshooting](#-troubleshooting)
- [Contribuição](#-contribuição)
- [CONTRIBUTING](#contributing)
- [Licença](#-licença)

---

## ✨ Funcionalidades

### 🔐 Autenticação

* Cadastro e login de usuários
* Autenticação com JWT
* Persistência de sessão
* Rotas protegidas
* Logout automático em caso de token inválido/expirado

### 🍽 Receitas

* Criar receitas
* Editar receitas
* Deletar receitas
* Receitas públicas e privadas
* Controle de permissões por usuário
* Ingredientes organizados por posição
* Paginação
* Upload de imagens das receitas

### 👤 Usuário

* Atualização de perfil
* Alteração de senha com validação
* Upload de imagem de perfil

---

## 🛠 Tecnologias utilizadas

### Backend (`api/`)

* Node.js
* TypeScript
* Express
* Prisma ORM
* PostgreSQL
* JWT
* Zod
* bcrypt
* tsup

### Frontend (`web/`)

* React
* TypeScript
* Vite
* TailwindCSS
* Axios
* React Router
* Context API

---

## 🧱 Destaques da arquitetura

* API REST
* Validações com Zod
* Prisma Transactions para operações em múltiplas tabelas
* Axios Interceptors para autenticação automática
* Gerenciamento de sessão com Context API
* Separação de responsabilidades com controllers, hooks e services
* Tipagem forte com TypeScript

---

## 📁 Estrutura do projeto

```txt
api/
 ├── src/
 │    ├── controllers/
 │    ├── middlewares/
 │    ├── routes/
 │    ├── configs/
 │    ├── providers/
 │    └── utils/

web/
 ├── src/
 │    ├── components/
 +    ├── hooks/
 │    ├── pages/
 │    ├── contexts/
 │    ├── services/
 │    └── routes/
``` 

---

## 🚀 Rodando localmente

### Backend

```bash
cd api
npm install
npm run dev
```

### Frontend

```bash
cd web
npm install
npm run dev
```

---

## ⚙ Variáveis de ambiente

Veja os arquivos `.env.example` presentes em `api/` e `web/`.

---

## 📦 Scripts úteis

### Backend (`api/package.json`)

* `dev` → inicia servidor em desenvolvimento
* `build` → gera build da aplicação
* `start` → executa build em produção

### Frontend (`web/package.json`)

* `dev` → inicia ambiente de desenvolvimento
* `build` → gera build de produção
* `preview` → visualiza build localmente

---

## 🌐 Build e deploy

### Backend

Gerar build:

```bash
npm run build
```

Executar build gerada na pasta `dist/`.

### Frontend

Gerar build:

```bash
npm run build
```

O frontend pode ser hospedado em plataformas como Vercel, Netlify ou Render.

---

## 🔧 Troubleshooting

Problemas comuns e soluções rápidas:

- Erro de porta em uso: verifique `PORT` em `api/.env`.
- Uploads falhando (multer): confirme que `TMP_FOLDER` existe e que a conta de upload (Cloudinary) está configurada.
- Erros de sessão inválida: limpe `localStorage` e tente login novamente.

---

## 📌 Melhorias futuras

* Sistema de favoritos
* Busca e filtros
* Comentários e avaliações
* Testes automatizados
* Melhorias no CI/CD

---

## 🤝 Contribuição

Sinta-se à vontade para abrir issues ou sugerir melhorias.

---

## 👨‍💻 Autor

Lucas Moura

---

## Licença

Este repositório está com a licença MIT por padrão — adicione um arquivo `LICENSE` se desejar.

---

## Links úteis

- Documentação da API: [api/API.md](api/API.md)


