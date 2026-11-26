# NexusFrame

**NexusFrame** é um catálogo web de filmes e séries que permite pesquisar títulos, consultar informações como pôster, avaliação e elenco, filtrar resultados e manter uma lista pessoal de títulos salvos. O projeto foi desenvolvido como Projeto Integrador da disciplina **Programação para Web II**, com HTML, CSS, JavaScript, integração com a API do TMDB e uma Supabase Edge Function para intermediar as consultas.

## Funcionalidades

- Pesquisa de filmes e séries.
- Exibição de informações dos títulos, incluindo pôster, avaliação e elenco.
- Filtro por tipo de conteúdo.
- Lista pessoal com operações CRUD (adicionar, consultar, atualizar e remover títulos, conforme as ações disponíveis na interface).
- Persistência da lista pessoal no navegador por meio do `localStorage`.
- Validação do termo de pesquisa, com feedback próximo ao campo e foco no campo em caso de entrada inválida.
- Tratamento de estados de pesquisa e de falhas de consulta.
- Interface responsiva, adaptada a diferentes tamanhos de tela.

## Tecnologias

- HTML5
- CSS3
- JavaScript (ES6+), manipulação do DOM e recursos nativos
- TMDB (The Movie Database) API
- Supabase Edge Functions
- `localStorage`

## Arquitetura

O frontend não acessa diretamente o token privado do TMDB. As solicitações de pesquisa são encaminhadas para uma Edge Function no Supabase, que realiza as consultas à API do TMDB e devolve os dados necessários à interface.

```text
Navegador (HTML, CSS e JavaScript)
          |
          | solicitação de pesquisa
          v
Supabase Edge Function: movie-search
          |
          | token privado armazenado como Secret
          v
TMDB API
          |
          v
Dados normalizados retornam ao frontend
```

A lista pessoal é mantida no navegador, por meio do `localStorage`; o projeto não utiliza banco de dados para essa lista.

### Segurança

- O token privado de leitura do TMDB é mantido como Secret no ambiente Supabase e não deve ser colocado no código do frontend ou no repositório.
- O frontend utiliza os parâmetros públicos de configuração necessários para acessar a Edge Function, não o token privado do TMDB.
- A Edge Function valida os parâmetros de pesquisa e trata as consultas e respostas.
- Dados recebidos de fontes externas são tratados no frontend, evitando inserção de conteúdo textual externo como HTML executável.

> Não publique tokens, secrets, credenciais ou arquivos de configuração com valores sensíveis no repositório.

## Como executar

### Requisitos

- Navegador moderno.
- Conexão com a internet.
- Edge Function `movie-search` implantada e configurada no Supabase.
- Configuração frontend com URL do projeto Supabase e chave pública apropriada.

### Configuração

1. Clone ou baixe o repositório do NexusFrame.
2. Verifique se os arquivos frontend estão organizados e se o `index.html` está no local esperado.
3. Configure no frontend a URL do Supabase e a chave pública necessária para invocar a Edge Function, conforme a configuração adotada pelo projeto.
4. No Supabase, configure o Secret `TMDB_READ_ACCESS_TOKEN` com o token de leitura do TMDB.
5. Implante a Edge Function `movie-search` no projeto Supabase.
6. Execute o frontend por meio de um servidor local estático (por exemplo, Live Server, se utilizado no ambiente de desenvolvimento) ou pelo método de publicação adotado.
7. Abra o NexusFrame no navegador e teste uma pesquisa.

### Observações

- O frontend precisa de conexão com a internet para consultar a Edge Function e a API externa.
- A pesquisa depende da disponibilidade e da configuração correta da Edge Function, do Supabase e do TMDB.
- Os títulos salvos são armazenados localmente no navegador. Eles não são sincronizados entre dispositivos ou navegadores.
- Ao limpar os dados do navegador, a lista armazenada em `localStorage` pode ser perdida.

## Integrantes e responsabilidades

| Integrante | Responsabilidade principal |
|---|---|
| **Gabriel Thenorio Bianchi** | Estrutura HTML e organização semântica da interface. |
| **Pedro da Silva Gomes** | Estilização CSS, layout e apresentação responsiva. |
| **Mauricio Lacasasanta dos Santos Muniz** | JavaScript e manipulação do DOM, eventos e comportamento da interface. |
| **Rhyan Carlos de Cavalho Crepaldi** | Integração com a API TMDB e desenvolvimento/configuração da Supabase Edge Function. |
| **Luan Frank de Carvalho Crepaldi** | CRUD da lista pessoal, testes e validações do funcionamento. |

> A divisão acima registra as frentes principais de responsabilidade. Todos os integrantes devem conhecer o funcionamento geral do projeto e estar preparados para explicar ou modificar partes do código durante a arguição.

## Testes realizados

Ao longo do desenvolvimento, foram realizados testes de funcionamento e revisão, incluindo:

- Pesquisa de filmes e séries.
- Exibição e fallback de pôsteres.
- Exibição de nomes do elenco.
- Operações da lista pessoal e persistência após recarregar a página.
- Filtros e comportamento da interface.
- Responsividade, incluindo inspeção em modo móvel pelo DevTools.
- Fluxo de pesquisa de ponta a ponta.
- Validação do termo de pesquisa e apresentação de feedback localizado.
- Formatação e arredondamento de avaliações.

Os testes acima representam verificações relatadas durante o desenvolvimento; não constituem garantia de funcionamento em todos os dispositivos, navegadores ou condições de rede.

## Documentação complementar

- [`IA.md`](IA.md) — diário de uso de Inteligência Artificial durante o desenvolvimento.

## Projeto acadêmico

Projeto Integrador da disciplina **Programação para Web II**, do curso de Ciência da Computação, desenvolvido no segundo semestre de 2026.
