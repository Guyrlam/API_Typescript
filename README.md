# API Typescript

Projeto criado para a construção de uma API que gerência grupos e seus participantes com o uso do Typescript.

## Instalação

No diretório de sua preferência, clone este [repositório](https://github.com/Guyrlam/API_Typescript) e instale as dependências do projeto.

```bash
# Alterar diretório
cd "diretório de sua preferência"

# Clonar repositorio
git clone https://github.com/Guyrlam/API_Typescript.git

# Instalar dependências
npm install
```

## Como usar a API?

Primeiramente, execute o comando abaixo para buildar e rodar a aplicação em http://localhost:3000/

```bash
npm start
```

Feito isso utilize as rotas abaixo para gerênciar as equipes e usuários

- *GET* “/users/me” - Ver seu próprio usuário
- *GET* “/users/” - Ver todos os usuários
- *GET* “/users/:user_id” - Ver determinado usuário
- *GET* “/teams/” - Ver todas as equipes
- *GET* “/teams/:team” - Ver determinada equipe
- *POST* “/users/” - Criar um novo usuário
- *POST* “/team/” - Criar uma nova equipe
- *PATCH* “/users/:user_id” - Atualizar usuário
- *PATCH* “/team/:team_id” - Atualizar equipe
- *POST* “/team/:team_id/member/:user_id” - Adicionar membro na equipe
- *DELETE* “/team/:team_id/member/:user_id” - Retirar membro da equipe
- *DELETE* “/users/:user_id” - Deletar usuário 
- *DELETE* “/team/:team_id” - Deletar equipe 


## Desenvolvimento

Execute o comando abaixo para atualizar a a API enquanto desenvolve novas funcionalidades:

```bash
npm run dev
```

*Caso deseje contribur com o projeto, crie uma nova branch e abra uma Pull Request.*

## License

[MIT](https://choosealicense.com/licenses/mit/)