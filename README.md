# LivroRealm - Aplicação CRUD de Livros
___Projeto Full Stack___

Bem-vindo ao LivroRealm, uma aplicação de CRUD (Create, Read, Update, Delete) que permite aos usuários gerenciar livros que eles gostam. Nesta aplicação, os usuários podem adicionar informações sobre livros, incluindo título, autor, descrição, imagem da capa e outras informações relevantes. Eles também podem visualizar, atualizar e excluir os livros que foram adicionados anteriormente.

### __Demonstração__

<center>
<div style="background-color: white; display: inline-block; padding: 10px;">
  <img src="app/images/mobile.png" alt="mobile" style="width: 150px;" />
  <img src="app/images/macbook.png" alt="macbook" style="width: 500px;" />
</div>
</center>

- [___Veja o projeto em ação!___]() 🎬

> Para o deploy do backend e frontend fora utilizado o [Render](https://render.com/)

## Tecnologias Utilizadas
- Backend: O backend da aplicação é desenvolvido em JavaScript e usa a estrutura Express.js para criar uma API RESTful. O banco de dados utilizado é o [MongoDB](https://www.mongodb.com/atlas/database) para armazenar as informações dos livros. Além disso, são utilizadas as seguintes bibliotecas:

  - bcrypt: Usado para encriptar senhas antes de armazená-las no banco de dados, garantindo a segurança dos dados sensíveis.
  - jsonwebtoken: Utilizado para criar e verificar tokens de autenticação, permitindo a proteção das rotas da aplicação e verificação de acesso autorizado.
- Frontend: O frontend é construído em React, uma biblioteca JavaScript popular para a criação de interfaces de usuário interativas. A aplicação utiliza as seguintes bibliotecas:

  - axios: Utilizado para fazer requisições HTTP para o backend e gerenciar as respostas.
  - react-router-dom: Utilizado para gerenciar a navegação entre diferentes páginas/componentes da aplicação.
  - react-icons: Fornece um conjunto de ícones para uso na interface.
  - react-modal: Usado para criar modais interativos na aplicação.
  - react-toastify: Utilizado para exibir mensagens de notificação ao usuário.
  - sass: Usado para escrever estilos CSS de forma mais organizada e eficiente.

## Funcionalidades
A BookRealm oferece as seguintes funcionalidades:

- Autenticação e Autorização: A aplicação requer autenticação para acessar suas funcionalidades. Os usuários podem fazer login com suas credenciais existentes ou criar uma nova conta. O uso de tokens JWT e senhas encriptadas garante a segurança das informações e do acesso.

- Adicionar Livro: Os usuários podem adicionar novos livros com informações detalhadas, incluindo título, autor, descrição, imagem da capa e outras informações relevantes.

- Visualizar Livro: Os usuários podem visualizar os detalhes de um livro específico, incluindo todas as informações fornecidas durante a adição.

- Atualizar Livro: Os usuários têm a opção de editar as informações de um livro existente, como título, autor, descrição e imagem da capa.

- Excluir Livro: Os usuários podem excluir um livro da lista.

## Instalação e Uso

Siga estas etapas para instalar e executar o projeto:

1.  Clone o repositório:
```
git clone git@github.com:ricardokuhlkamp/books-real-app.git
cd books-real-app
```
2.  Configurar o Backend:

Navegue até a pasta backend:
```
cd backend
```
- Instale as dependências:
```
npm install
```
- Crie um arquivo .env na pasta backend e configure as variáveis de ambiente necessárias, como as configurações do banco de dados MongoDB e a chave secreta do JWT.

3.  Iniciar o Backend:
- Execute o seguinte comando para iniciar o servidor backend em modo de desenvolvimento:
```
npm run dev
```
4.  Configurar o Frontend:

Navegue até a pasta frontend:
```
cd ../frontend
```
- Instale as dependências:
```
npm install
```
5.  Iniciar o Frontend:
- Execute o seguinte comando para iniciar o servidor de desenvolvimento do React:
```
npm start
```
6.  Acessar a Aplicação:
- Abra seu navegador e acesse a aplicação em: http://localhost:3000.

## Observações
Certifique-se de que o backend esteja em execução antes de iniciar o frontend, pois o frontend depende das APIs fornecidas pelo backend para funcionar corretamente.

Lembre-se também de atualizar as URLs das variáveis de ambiente de acordo com o ambiente em que o projeto está sendo executado (desenvolvimento, produção, etc.).

## Contato
Se tiver alguma dúvida ou sugestão, sinta-se à vontade para entrar em contato comigo:

E-mail: <ric.kds@hotmail.com>

GitHub: [github.com/ricardokuhlkamp](https://github.com/ricardokuhlkamp)

Linkedin: [www.linkedin.com/in/ricardo-kühlkamp-dev](www.linkedin.com/in/ricardo-kühlkamp-dev)


