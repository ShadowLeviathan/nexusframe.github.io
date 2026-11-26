# Diário de uso de Inteligência Artificial — NexusFrame

Este documento registra usos relevantes de ferramentas de Inteligência Artificial no desenvolvimento do NexusFrame, incluindo apoio à investigação de problemas, compreensão de código, revisão, implementação pontual e validação.

O registro busca distinguir sugestões da IA, decisões tomadas pelo grupo e verificações realizadas. As entradas devem ser complementadas pelos integrantes quando houver usos relevantes que ainda não estejam documentados.

> **Nota de transparência:** este diário foi consolidado a partir do histórico de desenvolvimento disponível na conversa de acompanhamento do NexusFrame. O diário individual de Mauricio mencionado para esta consolidação não estava acessível entre os arquivos disponíveis no momento da elaboração. Portanto, não atribuí a ele prompts, datas ou decisões específicas que não pude verificar. A entrada correspondente deve ser conferida e complementada com o diário original antes da publicação, se necessário.

---

## Contexto geral de utilização

A IA foi utilizada como apoio ao desenvolvimento e à aprendizagem, principalmente para:

- Explicar conceitos e trechos de código.
- Orientar investigações de erros sem substituir indiscriminadamente o código existente.
- Sugerir alterações pontuais e discutir suas implicações.
- Ajudar na revisão dos requisitos e na organização dos testes.
- Apoiar a análise de segurança da integração com a API externa.
- Orientar ajustes de validação, acessibilidade e apresentação da interface.

As sugestões foram discutidas, aplicadas de forma pontual quando consideradas adequadas e verificadas por meio de testes. A intenção foi preservar a estrutura e as decisões do projeto, evitando reescritas desnecessárias.

---

## Registro de utilização

### Desenvolvimento e integração com API — acompanhamento do projeto

**Ferramenta:** ChatGPT  
**Autor(es):** integrantes envolvidos nas etapas de desenvolvimento e acompanhamento  
**Contexto:** construção e evolução do NexusFrame, catálogo de filmes e séries com consulta ao TMDB por meio de Supabase Edge Function.

**Solicitações e temas abordados:**

- Orientação para escolha e integração de API de catálogo de filmes.
- Discussão sobre a mudança da API inicialmente escolhida para o TMDB, após limitações de dados, com aprovação do professor relatada pelo grupo.
- Explicação sobre o papel da Edge Function na comunicação entre frontend e TMDB.
- Discussão sobre proteção do token privado, evitando expô-lo no JavaScript do frontend.
- Orientação sobre a organização das consultas e retorno dos dados para o frontend.

**Contribuições incorporadas e decisões do projeto:**

- Utilização do TMDB como fonte de dados.
- Intermediação das consultas por uma Edge Function no Supabase.
- Armazenamento do token privado do TMDB como Secret no Supabase.
- Manutenção do frontend separado da camada que utiliza o token privado.

**Verificação:** o grupo acompanhou a implementação e realizou testes de pesquisa e integração durante o desenvolvimento.

---

### Implementação de pôsteres e elenco — acompanhamento do projeto

**Ferramenta:** ChatGPT  
**Autor(es):** integrantes envolvidos na implementação e testes  
**Contexto:** evolução dos dados exibidos nos cards de resultados.

**Solicitações e temas abordados:**

- Orientação sobre o retorno de caminhos de pôsteres e sua exibição no frontend.
- Discussão sobre tratamento de imagens e fallback.
- Orientação sobre a consulta de créditos de filmes e séries e apresentação dos nomes do elenco.

**Contribuições incorporadas e decisões do projeto:**

- Inclusão do caminho do pôster no conjunto de dados retornado pela Edge Function.
- Utilização da URL de imagens do TMDB no frontend.
- Implementação de fallback para imagens indisponíveis.
- Consulta de créditos para filmes e séries, com apresentação de até cinco nomes no card.
- Uso de consultas em paralelo para créditos, com tratamento individual de falhas.

**Verificação:** foram relatados testes de nomes, exibição de pôsteres, responsividade e funcionamento integrado.

---

### Revisão de requisitos e objetos nativos JavaScript — 25/11/2026

**Ferramenta:** ChatGPT  
**Autor:** integrante responsável pelo acompanhamento da revisão  
**Contexto:** revisão dos requisitos finais do projeto e identificação de ajustes pontuais.

**Solicitação (síntese):** revisar os requisitos da rubrica, identificar lacunas e orientar alterações pequenas, sem reescrever o projeto ou introduzir funcionalidades extras.

**Contribuição da IA:** apontamento de uma lacuna no uso de objeto nativo `Math` no requisito R8, relacionada à formatação da avaliação.

**Alteração adotada:** aplicação de `Math.round(rating * 10) / 10` para arredondar a avaliação para uma casa decimal, antes da formatação localizada.

**Verificação:** o grupo testou valores no Console do navegador e confirmou o comportamento do arredondamento e a apresentação das avaliações na interface.

---

### Validação de pesquisa e feedback acessível — 25/11/2026

**Ferramenta:** ChatGPT  
**Autor:** integrante responsável pelo acompanhamento da revisão  
**Contexto:** atendimento ao requisito R9 da rubrica.

**Solicitação (síntese):** orientar a implementação de feedback de validação localizado junto ao campo de pesquisa, preservando a lógica de pesquisa já existente e evitando alterações desnecessárias.

**Contribuições sugeridas:**

- Associar o campo de pesquisa à mensagem de validação com `aria-describedby`.
- Criar um elemento dedicado à mensagem e utilizar `role="alert"`.
- Referenciar o elemento de mensagem no objeto central de referências DOM.
- Exibir a mensagem quando o termo não respeitar os limites de tamanho.
- Manter o foco no campo em caso de entrada inválida.
- Limpar a mensagem após a validação de um termo válido.
- Aplicar estilo visual à mensagem por meio da classe CSS `.field-error`.

**Decisões e implementação:** as alterações foram aplicadas em etapas pequenas no HTML, JavaScript e CSS, preservando o fluxo existente de pesquisa.

**Verificação:** o grupo confirmou o funcionamento da validação, do foco, da mensagem localizada, da limpeza do erro e da apresentação visual. A cor inicialmente não apareceu no navegador principal por causa do cache; o comportamento foi confirmado após teste em guia anônima.

---

### Consolidação da documentação — 25/11/2026

**Ferramenta:** ChatGPT  
**Autor:** integrante responsável pela consolidação dos documentos  
**Contexto:** elaboração do README.md e consolidação do IA.md de acordo com os requisitos de entrega.

**Solicitação (síntese):** organizar a descrição do projeto, arquitetura, funcionalidades, execução, responsabilidades dos integrantes e histórico de uso de IA, com base no projeto e no histórico de acompanhamento.

**Contribuição:** estruturação e redação inicial dos documentos Markdown, com organização das informações e sinalização de pontos que precisam de confirmação.

**Verificação necessária:** os integrantes devem revisar os documentos, confirmar a divisão de responsabilidades, conferir os procedimentos de execução e completar o diário com usos relevantes de IA não cobertos pelo histórico consultado.

---

## Uso consciente e validação

O grupo deve manter a responsabilidade sobre o código e a documentação. Sugestões de IA não devem ser aceitas sem compreensão, verificação e capacidade de explicar seu funcionamento.

Este diário é um registro de apoio e deve refletir o uso real de ferramentas durante o desenvolvimento, inclusive sugestões rejeitadas ou modificadas quando houver registro dessas decisões.
