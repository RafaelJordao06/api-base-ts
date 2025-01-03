# API Base em TS com Fastify

Esta é uma estrutura base para APIs REST construída com [Fastify](https://www.fastify.io/), com suporte para:

- Documentação automática usando [Swagger](https://swagger.io/).
- Validação e definição de schemas com [Zod](https://zod.dev/).
- Arquitetura em camadas: **rotas**, **controladores** e **serviços**.

---

## 🛠️ Funcionalidades

- Documentação interativa via Swagger.
- Validação de requisições e respostas com Zod.
- Arquitetura modular para fácil expansão.

---

## 🚀 Como começar

### 1. Clonar o repositório

`git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio`

### 2. Instalar dependências

Certifique-se de ter o Node.js instalado (versão 18 ou superior).

`npm install`

### 3. Executar o projeto

Execute o servidor em modo de desenvolvimento:

`npm run dev`

O servidor estará rodando em [http://localhost:4000](http://localhost:4000).  
A documentação Swagger estará disponível em [http://localhost:4000/docs](http://localhost:4000/docs).

---

## 🐳 Usando Docker

Este projeto possui duas configurações de `docker-compose` para diferentes propósitos:

1. **Ambiente de Desenvolvimento** (`docker-compose.dev.yml`):

   - Permite desenvolver localmente dentro de um container.
   - As alterações feitas no código são refletidas em tempo real no container sem necessidade de reconstrução.

2. **Ambiente de Produção** (`docker-compose.yml`):
   - Gera a imagem da aplicação com os arquivos transpilados em JavaScript (da pasta `dist`).
   - Ideal para implantações, garantindo um ambiente otimizado sem arquivos TypeScript.

---

### 🔧 Ambiente de Desenvolvimento

Para iniciar o ambiente de desenvolvimento:

1. Certifique-se de ter o Docker e Docker Compose instalados.
2. Execute o seguinte comando:

```sh
docker-compose -f docker-compose.dev.yml up --build
```

Isso irá:

- Criar um container usando os arquivos TypeScript para desenvolvimento.
- Montar o código local no container, permitindo que as alterações feitas sejam aplicadas automaticamente sem reconstruir a imagem.

Acesse a aplicação em [http://localhost:4000](http://localhost:4000).

---

### 🚀 Ambiente de Produção

Para iniciar o ambiente de produção:

1. Certifique-se de ter o Docker e Docker Compose instalados.
2. Execute o seguinte comando:

```sh
docker-compose up --build
```

Isso irá:

- Criar uma imagem de produção contendo apenas os arquivos JavaScript da pasta \`dist\`.
- Executar a aplicação em um container otimizado para produção.

Acesse a aplicação em [http://localhost:4000](http://localhost:4000).

---

## 🧑‍💻 Estrutura do Projeto

```
src/
├── app/
│   ├── routes/          # Define as rotas da aplicação
│   │   ├── index.ts     # Registra todas as rotas
│   │   ├── user.routes.ts # Exemplo de rota para "users"
├── controllers/         # Lida com a lógica de requisição/resposta
├── services/            # Contém a lógica de negócio
├── types/               # Define os tipos e interfaces
```

---

## ✨ Como criar uma nova rota

### 1. Criar uma nova rota

Crie um novo arquivo em \`src/app/routes\`. Exemplo: \`product.routes.ts\`.

```
import { FastifyInstance } from "fastify";
import z from "zod";

export default async function productRoutes(app: FastifyInstance) {
  app.get(
    "/",
    {
      schema: {
        tags: ["products"],
        description: "Get all products",
        response: {
          200: z.array(
            z.object({
              id: z.string().uuid(),
              name: z.string(),
              price: z.number(),
            })
          ),
        },
      },
    },
    async () => {
      return [
        { id: "1", name: "Product 1", price: 100 },
        { id: "2", name: "Product 2", price: 200 },
      ];
    }
  );

  app.post(
    "/",
    {
      schema: {
        tags: ["products"],
        description: "Create a new product",
        body: z.object({
          name: z.string(),
          price: z.number(),
        }),
        response: {
          201: z.object({
            id: z.string().uuid(),
            name: z.string(),
            price: z.number(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, price } = request.body;
      const newProduct = { id: "3", name, price };
      return reply.status(201).send(newProduct);
    }
  );
}
```

### 2. Registrar a nova rota

Edite o arquivo \`src/app/routes/index.ts\` para registrar a rota:

```
import { FastifyInstance } from "fastify";
import userRoutes from "./user.routes";
import productRoutes from "./product.routes";

export const routes = async (app: FastifyInstance) => {
  app.register(userRoutes, { prefix: "/users" });
  app.register(productRoutes, { prefix: "/products" });
};
```

---

## 📝 Documentação com Swagger

Cada rota pode ser documentada automaticamente pelo Swagger. Aqui estão os elementos principais do **schema** de uma rota:

- `tags`: Categoria da rota na interface do Swagger.
- `description`: Descrição do endpoint.
- `params`: Validação dos parâmetros da URL.
- `querystring`: Validação de parâmetros na query string.
- `body`: Validação do corpo da requisição.
- `response`: Validação e documentação das respostas.

Exemplo de documentação de um endpoint:

```
app.post(
  "/",
  {
    schema: {
      tags: ["products"],
      description: "Create a new product",
      body: z.object({
        name: z.string(),
        price: z.number(),
      }),
      response: {
        201: z.object({
          id: z.string().uuid(),
          name: z.string(),
          price: z.number(),
        }),
      },
    },
  },
  async (request, reply) => {
    const { name, price } = request.body;
    const newProduct = { id: "3", name, price };
    return reply.status(201).send(newProduct);
  }
);
```

---

## 🧪 Testando a API

Use ferramentas como [Postman](https://www.postman.com/) ou [Thunder Client](https://www.thunderclient.io/) para testar os endpoints.

1. Listar usuários:

   - **GET** \`http://localhost:4000/users\`

2. Criar usuário:
   - **POST** \`http://localhost:4000/users\`
   - **Body**:
     `json
 {
   "name": "John Doe",
   "email": "john.doe@example.com"
 }
 \`

---

## 📜 Licença

Este projeto é licenciado sob a [MIT License](LICENSE).
