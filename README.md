
# UNO | Challenge

Parabéns, se você chegou até aqui significa que você está participando do processo seletivo de uma das melhores empresas de tecnologia do mercado!

## Como será o desafio técnico?

Nesse repositório já temos um projeto pré-desenvolvido com as tecnologias que mais utilizamos na UNO, das quais são: 
[JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[NodeJs](https://nodejs.org/pt-br/docs)
[Graphql](https://graphql.org/learn/)
[React](https://pt-br.legacy.reactjs.org/docs/getting-started.html)

O projeto resume-se em um TODO LIST (Lista de tarefas), onde o usuário poderá `adicionar`, `editar`, `remover`, e `filtrar` os itens de sua lista de tarefa.

Hoje o projeto já está adicionando itens na lista e buscando os itens que estão salvos. Com isso já demos um exemplo de como você pode seguir.

Como fizemos uma estrutura simples com dados `mocados`, deverá ser feita uma manipulação de arrays, seguindo os requisitos que iremos pedir abaixo.

## Requisitos obrigatórios

 1. Deverá ser desenvolvido uma forma de editar os itens que já estão na lista.
 2. Deverá ser desenvolvido uma forma de remover os itens que estão na lista.
 3. Criar uma validação para não poder adicionar itens com o mesmo nome.
 4. Criar validação para não adicionar item com nome em branco / vazio.
 5. Poder filtrar os itens por nome.
 6. Todo método desenvolvido deverá ter documentação, explicando o que o mesmo está fazendo.

Lembrando que deverá seguir o padrão já pré-estabelecido no projeto na qual utiliza as chamadas para o backend com graphql.

## Requisitos opcionais

 1. Ajustar CSS e design para deixar a aplicação mais atraente.
 2. Criar outras ações que não foram pedidas acima.

## Como rodar o projeto?

Você deverá entrar dentro da pasta `frontend` e rodar o comando `yarn` ou `npm install`. (Lembre se de instalar o [Nodejs](https://nodejs.org/en/download)) em seu computador.

Após ter instalado as dependências com o comando acima, você deverá rodar o comando `yarn start` ainda dentro da pasta frontend, isso irá fazer com que seu frontend suba em `http://localhost:3000`.

Para a pasta serverless deverá ser feito os mesmos passos acima descritos, porém o backend estará rodando `http://localhost:4000/graphql`

## Environments Variables
  
Na pasta do frontend crie o arquivo .env caso não existir com o seguinte conteúdo abaixo.
##### **`.env`**
```
REACT_APP_GRAPHQL_URI=http://localhost:4000/graphql
```
Esse projeto deverá ser feito um fork dele, que já irá aparecer em seu github para que você nos envie e possamos baixar para analisar o código desenvolvido. 

Lembre-se de deixar seu repositório público.

Documentação do Projeto: Lista de Tarefas com Funcionalidades desenvolvida

1. Resumo Executivo
Este projeto é uma aplicação web de lista de tarefas que permite ao usuário adicionar, visualizar, editar e gerenciar suas tarefas diárias. Além das funcionalidades básicas de adicionar e listar tarefas, o projeto foi expandido para incluir funções avançadas, como marcar tarefas como concluídas, adicionar notas a cada tarefa, atribuir níveis de importância com cores específicas e alertas personalizados usando SweetAlert (Swal).

2. Introdução
A lista de tarefas é uma ferramenta essencial para organização pessoal. Neste projeto, uma lista simples foi transformada em uma aplicação completa com diversas funcionalidades adicionais que melhoram a experiência do usuário, garantindo maior controle sobre suas tarefas diárias.

Objetivos:
Permitir ao usuário adicionar, listar, editar e excluir tarefas.
Implementar funções de marcação de tarefas como concluídas.
Adicionar prioridade visual às tarefas com cores específicas para diferentes níveis de importância.
Garantir uma experiência de usuário intuitiva e responsiva com melhorias visuais e de interação.
3. Escopo do Projeto
Inclusões:
Adicionar, listar, editar e excluir tarefas.
Marcar tarefas como concluídas via checkbox.
Atribuir prioridades (Urgente, Importante, Não Importante) com cores associadas.
Adicionar notas a cada tarefa.
Validação de inputs para evitar inserção de tarefas em branco ou duplicadas.
Alerta personalizado antes de excluir tarefas usando SweetAlert.
Filtro de tarefas por nome.
Exclusões:
Funcionalidades de login, integração com banco de dados ou sincronização na nuvem.
Não possui exportação de lista de tarefas.
4. Requisitos
Requisitos Funcionais:
Adicionar Tarefa: O usuário pode adicionar uma nova tarefa preenchendo o campo de input e pressionando o botão "Adicionar". O sistema valida para garantir que o campo não esteja em branco e que a tarefa não seja duplicada.
Listar Tarefas: Exibição de todas as tarefas cadastradas em uma lista.
Marcar como Concluída: O usuário pode marcar uma tarefa como concluída usando um checkbox. Quando marcada, a tarefa muda de cor para verde.
Atribuir Prioridade: O usuário pode selecionar o nível de importância (Urgente, Importante, Não Importante) através de um select dropdown. A tarefa será destacada com as cores correspondentes:
Urgente: Vermelho
Importante: Laranja
Não Importante: Amarelo
Notas em Tarefas: O usuário pode adicionar notas descritivas para cada tarefa.
Editar Tarefa: O usuário pode modificar o nome da tarefa e suas notas.
Deletar Tarefa: A tarefa pode ser excluída, com um alerta de confirmação em SweetAlert.
Filtro por Nome: O usuário pode pesquisar tarefas pelo nome em um campo de filtro.
Requisitos Não Funcionais:
Interface amigável e responsiva: O design do aplicativo foi ajustado usando CSS para garantir boa usabilidade em diferentes dispositivos.
Alertas com SweetAlert: Todos os alertas e confirmações são exibidos de forma visualmente agradável usando o SweetAlert.
Validação de Input: Não permite adicionar tarefas em branco ou duplicadas.
5. Arquitetura do Sistema
Front-end: HTML5, CSS3 e JavaScript.
Bibliotecas e Ferramentas Utilizadas:
SweetAlert: Para exibir alertas personalizados.
CSS Customizado: Para definir o estilo e cores de prioridades, tarefas concluídas e outros elementos visuais.
Fluxo Básico:
O usuário insere uma tarefa no campo de input e clica em "Adicionar".
A tarefa é validada e inserida na lista, com opção de adicionar uma nota e definir sua prioridade.
O usuário pode marcar a tarefa como concluída, o que altera a cor da tarefa para verde.
O usuário pode editar ou deletar a tarefa, com alertas para confirmação ao excluir.
O filtro por nome permite localizar tarefas específicas.
Diagrama Simplificado:
plaintext
Copiar código
[Adicionar Tarefa] --> [Validação] --> [Exibir na Lista]
[Checkbox Concluir] --> [Alterar Cor para Verde]
[Select Prioridade] --> [Aplicar Cor: Vermelho, Laranja, Amarelo]
[Deletar Tarefa] --> [Confirmar com SweetAlert] --> [Excluir da Lista]
[Editar Tarefa] --> [Atualizar Valores]
[Filtrar Tarefas] --> [Exibir Resultados]
6. Desenvolvimento e Implementação
Ferramentas Utilizadas:
HTML/CSS: Estrutura e design da aplicação.
JavaScript: Controle da lógica das funcionalidades (adicionar, editar, deletar, concluir, etc.).
SweetAlert (Swal): Utilizado para implementar alertas customizados.
Passo a Passo:
Modifiquei o CSS para aplicar cores específicas de acordo com a prioridade da tarefa e para destacar tarefas concluídas.
Adicionei funções JavaScript para gerenciar o status de conclusão, editar e excluir tarefas, com validação de input.
Implementei o uso do SweetAlert para confirmar exclusões de tarefas.
7. Testes
Testes Realizados:
Validação de Inputs: Testado para garantir que tarefas em branco ou duplicadas não sejam aceitas.
Funcionalidade de Checkbox: Verificado se a tarefa muda para a cor verde ao ser marcada como concluída.
Select de Prioridade: Testado para garantir que a cor correta seja aplicada ao selecionar diferentes níveis de importância.
Edição e Exclusão: Verificado se as funções de editar e excluir funcionam corretamente com alertas Swal.
Filtro por Nome: Testado para verificar se as tarefas são filtradas corretamente pelo nome.
Ferramentas de Teste:
Testes manuais no navegador (Chrome, Firefox) para verificar comportamento responsivo e correto funcionamento das funções.
8. Manutenção
Atualizações: O código foi escrito de forma modular para facilitar futuras adições de funcionalidades, como integração com banco de dados ou APIs.
Monitoramento: O código pode ser monitorado e atualizado conforme feedback do usuário.
Comentários no Código: Foram incluídos comentários para facilitar a leitura e manutenção do código.
9. Referências Técnicas
SweetAlert Documentação
Documentação de CSS
Guia de JavaScript
