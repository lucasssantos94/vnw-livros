## 📖 Livros Vai Na Web

Este projeto foi desenvolvido como parte do desafio final do módulo de Front-End do bootcamp FullStack oferecido pelo programa Vai Na Web. O objetivo principal é incentivar o acesso à leitura e aumentar a conscientização sobre a importância da doação de livros. Através de uma plataforma online, responsiva e intuitiva

[Figma do Projeto](https://www.figma.com/design/MDGn9uI2Ny5Y8sOJWnmfRp?fuid=820112181950221170&prev-plan-id=1302898378186818949&prev-plan-type=team&prev-selected-view=recentsAndSharing)

## 🚀 Tecnologias Utilizadas

- React com Vite - Framework e bundler para criação de SPA.

- Sass - Utilizado para estilização do projeto, facilitando a organização de estilos com pré-processamento.

- pnpm - gerenciador de pacotes

## 📚 Bibliotecas e Ferramentas

- [prop-types](https://github.com/facebook/prop-types) - Utilizado para tipagem e validação das props dos componentes React.

- [react-router-dom](https://reactrouter.com/) - Para gerenciamento de rotas e navegação.

- [react-hook-form](https://react-hook-form.com/) - Para gerenciamento e validação eficiente de formulários.

- [react-toastify](https://fkhadra.github.io/react-toastify/introduction) - Para exibição de notificações amigáveis e personalizáveis.

## 🛠️ Padronização do Código

Para manter o código consistente e padronizado, foram utilizadas as seguintes ferramentas:

- Prettier + ESLint - Para formatação automática e linting do código, garantindo que siga as melhores práticas.

- [Husky](https://typicode.github.io/husky/) - para automatizar tarefas.

- [Lint-staged](https://www.npmjs.com/package/lint-staged) - Para rodar lint e formatação no código antes de cada commit.

- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) - Padrão de commits para manter um histórico consistente.

- [Commitizen](https://commitizen-tools.github.io/commitizen/) - Ferramenta para facilitar a criação de commits seguindo o padrão de commit convencionais.

## ⚙️ Funcionalidades

Como ainda não há um back-end envolvido, utilizei uma abordagem simples para simular a integração com um banco de dados. A seguir estão as funcionalidades principais da aplicação:

### Adicionar Livros

- A função addBook permite que novos livros sejam adicionados à lista de forma dinâmica onde os dados dos livros são armazenados localmente, fornecendo informações como título, categoria, autor e URL da imagem de capa.

- Com isso, mesmo sem um banco de dados real, os usuários podem simular a inserção de novos títulos no sistema.

### Pesquisar livros cadastrados

- Criado uma rota de pesquisa que usa o useParams do react-router-dom e realiza o filtro na lista de livros.

- A pesquisa pode ser feita pelo título ou gênero do livro

## 📸 Screenshots

### 🖥️ Desktop

<img src="https://vnw-livros.vercel.app/screenshots/desktop.gif">

### 📲 Tablet

<img src="https://vnw-livros.vercel.app/screenshots/tablet.gif">

### 📱 Mobile

<img src="https://vnw-livros.vercel.app/screenshots/mobile.gif">

## 📦 Instalação e Execução

1. Clone o repositório:

```bash
git clone https://github.com/lucasssantos94/vnw-livros.git
```

2. Instale as dependecias:

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. Execute o projeto:

```bash
npm run build
# ou
yarn build
# ou
pnpm build
```
