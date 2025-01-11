# Integrantes
* André Franco Ranieri 
* Cesar Hideki Imai
* João Victor Dallapé Madeira
* David Varão Lima Bentes Pessoa

IP da instância: 52.45.15.19

# Documentação

### Pré requisitos para rodar a aplicação localmente
* npm
* node
* Jest (para executar testes)

## Como rodar a aplicação localmente
### Passo 1)
Execute o comando `npm install @testing-library/jest-dom @testing-library/react @testing-library/user-event @chatscope/chat-ui-kit-react -D cors express` para instalar as dependências e bibliotecas necessárias

### Passo 2) (Opcional)
Execute o comando `npm test` para verificar se os testes unitários declarados em `Login.test.js` estão sendo executados corretamente

### Passo 3)
Execute o comando `npm start` para inciar a aplicação no `localhost:3000`
Abra um novo terminal e digite `node proxy/server.js` para ativar o proxy na porta 5500

## Arquivos
### index.js
Os arquivos que serão de fato úteis estão localizados na pasta `src`. O arquivo `index.js` será onde colocaremos todo o "HTML" da página dentro do `render()`. Neste caso, como estamos, por enquanto, trabalhando somente com a tela principal do chat, chamei o componente `<MainScreen/>` do arquivo `MainScreen.js`. 

### MainsScreen.js
Dentro deste componente é onde são colocados o ícone do menu hambúrguer (à direita), o título "SamsAI" e a foto de perfil (à esquerda) no topo da tela. Além disso são aplicadas estilizações no interior do componente para estilizar seu código "HTML" e é chamado o componente `<Chat/>` do arquivo `Chat.js` que contém o componente relativo a conversa com as mensagens do usuário e do bot (Também criei o componente `<BemVindo/>` para ser exibido antes do usuário enviar sua primeira mensagem, como no Gemini, mas não o usaremos enquanto a integração não estiver pronta. Não alterem o código comentado).

### index.css
Este é um CSS global, importado no `index.js`. Os valores que estão nos atributos são herdados por **TODOS** os elementos dentro de `render()`, ou seja tudo. A não ser que esses atributos sejam sobrescritos. Sendo assim, ele é útil para definir a fonte Inter e a cor de fundo da página como padrão, por exemplo.

### Chat.js
Para entender melhor o que foi escrito, recomendo assistir a este <a href = "https://www.youtube.com/watch?v=Lag9Pj_33hM">vídeo</a>. No vídeo é feita uma integração com a API do ChatGPT, embora em nosso caso ela será feita com o LangFlow. Para estilização novamente, apliquei ela dentro do componentes. Porém, como estou chamando outros componentes pela biblioteca `@chatscope/chat-ui-kit-react` para construir a interface do Chat, tive de sobrescrever o CSS de tags HTML internas destes componentes. Para isso, estou usando o arquivo `Chat.css`. Assim foi possível tirar os balões de fala das cores azul e branca e transformá-los em vinho e no tom de branco desejado como no protótipo.

### LangflowClient.js
Este arquivo contém a classe `LangFlowClient` é usado para estabelecer uma conexão com o Front-end e o back-end (langflow). É aqui em que são enviadas requisições HTTP do tipo POST para o servidor.

### Login.js Login.css Login.test.js
Esses arquivos são relacionados à tela de Login, então não precisamos nos preocupar com isso por enquanto, apenas mantém como está.

### Pasta assets
Dentro desta pasta estão contidas todas as imagens que são usadas na aplicação. Se for necessário adicionar uma imagem, coloque-a aqui.

### Pasta proxy (server.js)
Para evitar o erro do CORS, já que estamos fazendo uma requisição de um domínio diferente do langflow, foi necessário criar um proxy, que roda na porta 5500.

## Atualizando a página no servidor web da AWS
Para atualizar a página na instância EC2 da AWS basta dar um commit no github.


