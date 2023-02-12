Neste projeto desenvolvi uma aplicação de registro de gastos em diferentes moedas com campos de descrição, valor, forma de pagamento e categoria de gasto (alimentação, trabalho, lazer, ...). Ao inserir os gastos, é renderizado o valor total convertido para real e as informações são renderizadas em uma tabela e os valores também convertidos para real. A aplicação tambpem conta com uma tela de login que redireciona para a aplicação em si.

Assim, na aplicação, o usuário pode:

**1- Adicionar, remover e editar um gasto;**

**2- Visualizar uma tabela com os gastos;**

**3- Visualizar o total de gastos convertidos;**

A aplicação é um projeto React utilizando:
- Um store Redux 
- Reducers no Redux 
- Actions assíncronas no Redux
- Dispatchers no Redux 
- Conexão do Redux aos componentes React

Para a busca e conversão das moedas, a aplicação consome os dados da API ***awesomeapi API de Cotações***, acessando o endpoint: https://economia.awesomeapi.com.br/json/all

Documentação da API disponível em : https://docs.awesomeapi.com.br/api-de-moedas

Para rodar a aplicação, dê o comando **npm install** para instalar as dependências e **npm start** para subir a aplicação.

**Testes**
Foram implementados testes unitários e de integração com cobertura mínima de 90% de cada componente. Para isso utilizei a biblioteca React Testing Library. Para verificar o percentual de cobertura de testes, rode o comando ***npm run test-coverage***

