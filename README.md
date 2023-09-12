# Piu Piu - Armando Assini

O presente projeto consiste no desenvolvimento das funções básicas de funcionamento do *Piu Piu*, um clone do Twitter criado pelo professor.

Todo o processo foi desenvolvido utilizando _ReactJS_.

## Começando

Para rodar o projeto é necessario clonar o repositório para seu computador e fazer as instalações mencionadas a seguir para rodá-lo em browser. Todos os browsers são suportados, porém é possível que ocorram leves diferenças de visualização dependendo do software e da versão do software utilizados.

### Instalação

Para realizar as instalações necessárias, siga o seguinte passo a passo:

Primeiramente clone o repositório para sua máquina, utilize o método de clone que preferir:

    https://git.raroacademy.com.br/armando.assini/atividade-avaliativa-8

Em seguida abra o repositório e utilize o seguinte comando para instalar as dependências do projeto:

    npm install

A partir destas instalações o projeto já estará funcional. Rodando o comando seguinte, um servidor irá abrir onde a aplicação estará rodando:

    npm run dev

No terminal será mostrado um link de onde pode ser visualizada a aplicação:

![http://localhost:5173](<./src/assets//LinkLocal.png>)

Clicando no link ou copiando a url para um navegador já será possível visualizar o trabalho.

## Visão Geral do Projeto

Para a realização do projeto foi fornecido um repositório contento todo o conteúdo utilizado na criação do *Piu Piu*, porém foram retiradas grande parte das funções que permitem o funcionamento do mesmo. A partir do repositório foram desenvolvidas as funções que permitiram o funcionamento do mesmo.

Também nos foi apresentada uma versão funcional do site, desenvolvido pelo professor, podendo ser utilizado para testes e comparações.

## Construção do Projeto

### Objetivo

Como mencionado o projeto foi todo realizado utilizando _ReactJS_.

O objetivo principal da prática foi habituar os alunos com a utilização de *contextos*, *react-router-DOM*, *react Query* além da utilização de todas as funcionalidades do *React*. 

### Desenvolvimento

Após clonar o repositório fornecido pelo professor, foi realizada uma varredura dos códigos e das telas para compreender o funcionamento do programa, para que em seguida fosse possível iniciar o desenvolvimento.

Por se tratar de um projeto relativamente grande, torna-se inviável a demonstração de cada passo do desenvolvimento, portanto serão dispostas as mudanças realizadas de forma ampla, e fica a cargo do leitor consultar o código caso julgue necessário.

#### Roteamento

O projeto foi desenvolvido com uma variedade de telas, inclusive utilizando layouts que permitiam a troca apenas de parte da visualização da tela durante a navegação. Portanto foi necessária a utilização de roteamento, como mencionado anteriormente, utilizando *react-router-DOM*.

Como é necessário realizar login para acessar o domínio, existem rotas públicas e privadas, essas foram separadas utilizando um contexto com informações de login, utilizados como autorização de acesso a cada rota.

#### Contexto

Como mencionado foi criado um contexto envolvendo as informações do usuário logado, dessa forma o acesso às informações pode ser realizada de qualquer ponto do código (desde que envolvidos pelo contexto). Dessa forma além de utilizar essas informações como autorização de acesso às rotas privadas, também foram utilizadas as informações do usuário em funções do tipo: *postar*, *like*, *editar perfil*.

#### Geral

Para o desenvolvimento das funções foram utilizados os conhecimentos préviamente desenvolvidos em sala de aula, desta vez focados em uso de *contexto* e *react Query*. Foi preciso atentar às propriedades dos componentes e elementos já existentes, para que os retornos das funções criadas fossem compatíveis. 


### Dificuldades Encontradas

Nesta atividade foram encontrados diversos desafios, começando pela interpretação de um código 'semi pronto'. Como se tratava de um código de onde foram retiradas funções, ficou a meu encargo, compreender como deveriam ser desenvolvidas as funções para que tivessem um comportamento já pensado e desenvolvido pelo professor. Além disso, boa parte do código envolvia técnicas recém estudadas e ainda não muito consolidadas em meu conhecimento, logo, a primeira dificuldade veio da compreensão do código.

Prosseguindo na atividade encontrei uma dificuldade em compreender a utilização do *local storage* em conjunto com o *contexto*, pois cada situação exigia um tipo de utilização e isso complicou um pouco o desenvolvimento, porém após alguns dias de estudo e apoio dos monitores, essas dúvidas foram sanadas.

Importante denotar que em várias situações percebi problemas de performance causadas pelo meu código, em algumas situações consegui resolvê-los, porém existem casos que não encontrei uma solução.

Finalmente é importante citar também que a quantidade de detalhes existentes em um código complexo, e que é possível ter uma utilização completa, inclusive com interação entre usuários me deixou um pouco preso. Inúmeras vezes foquei em pequenos detalhes, muitas vezes estéticos, que não fariam diferença na utilização do site, e isso me custou tempo que poderia ser utilizado em melhorias reais.

## Conclusão

Ao final do projeto foi possível implementar todas as funções solicitadas pelo professor. Foram utilizadas as tecnologias estudadas durante as semanas e o site está funcional.

Infelizmente podem ser notadas demoras em requisições e re-renderizações indevidas.

O código também não está muito limpo pois foi dado o foco inicial no funcionamento e infelizmente o tempo não permitiu uma revisão detalhada de tudo.

## Possíveis Melhoras

- Implementar *deletar piu*
- Implementar utilização de *embed* de vídeos nos pius;
- Implementar *perseguir.

## Autor

- **Armando Assini** - *arm.assini@gmail.com*

**Contribuições** - Professores, Monitores e Colegas de classe Turma React2 - Raro Academy.
