# Projeto Accounts Transactions 💸:dollar:

Aplicação web construída contendo informações de usuários, contas e transações, em que é possível visualizar o usuário, criar um novo usuário com uma nova conta, visualizar o saldo, visualizar histórico de transações, filtrar e realizar novas transações.

* Construída com TypeScript, HTML, React, Context API, Hooks, Tailwind, Node.js, Express, Sequelize com Postgres e Docker.
* Utilizando as práticas do REST
* Aplicada Arquitetura de Software, com as camadas de Modelo, de Serviço e de Controladores
* Utilizando princípios SOLID e Programação Orientada a Objetos

### Instruções

- Para rodar o repositório localmente, realize o clone do projeto e utilize os comandos a seguir para inicializar o Docker, instalar as dependências e configurar o banco de dados:

```
Para clonar o projeto:
git clone git@github.com:DaniellaZuccolotto/transactions-accounts.git

```
Para rodar a aplicação dockerizada, instalar as dependências e iniciar as aplicações:
# Na pasta “front-end”:
```
npm install // para instalar as dependências
```

# Na pasta “back-end”:
```
npm install  // para instalar as dependências
```

# Na pasta “raiz” do projeto:
```
npm run compose:up // para subir o docker-compose
npm run back:acess // para acessar o container do backend
npm run db:reset // para criar as tabelas e popular no banco de dados
```

Para parar a aplicação dockerizada:
# Na pasta “raiz” do projeto:
```
npm run compose:down // para parar os containers
```

### A aplicação já tem alguns usuários criados:

#### Users
| Usuário | Senha | |
|---|---|---
| `Felipe da Silva` | Gui12345 |
|---|---|---|
| `Daniela dos Santos` | Dani1234 | 
|---|---|---|
| `Guilherme de Souza` | Gui12345 | 

### Endpoints do back-end
<a href='https://github.com/DaniellaZuccolotto/transactions-accounts/tree/main/back-end'>README do Back</a>



