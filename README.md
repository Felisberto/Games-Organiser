# Catálogo de Jogos

Aplicação web para catalogar e acompanhar os jogos que você joga. Mostra capa, nota, gêneros, dificuldade, tempo jogado, status e datas de início/fim de cada jogo, com estatísticas por ano e gráficos detalhados.

## Pré-requisitos

- **Node.js** versão 18 ou superior — baixe em https://nodejs.org (a versão LTS é recomendada)
- **npm** — vem instalado junto com o Node.js

Para conferir se estão instalados, abra o terminal (Prompt de Comando, PowerShell ou Terminal do Mac/Linux) e digite:

```bash
node -v
npm -v
```

Se aparecer um número de versão em cada um, está tudo certo.

## Como executar o projeto no seu PC

1. **Baixe os arquivos do projeto** para uma pasta no seu computador.

2. Abra o terminal e entre na pasta do projeto:

```bash
cd caminho/para/a/pasta/do/projeto
```

3. **Instale as dependências** (só precisa fazer isso uma vez):

```bash
npm install
```

4. **Inicie o servidor de desenvolvimento**:

```bash
npm run dev
```

5. Abra o navegador no endereço que aparece no terminal, normalmente:

```
http://localhost:5173
```

Pronto! O site vai estar rodando no seu computador. Qualquer alteração nos arquivos recarrega a página automaticamente.

## Como gerar a versão final (build)

Se quiser gerar os arquivos otimizados para publicar online:

```bash
npm run build
```

Os arquivos ficam na pasta `dist/`. Para visualizar essa versão localmente:

```bash
npm run preview
```

## Como adicionar ou editar jogos

Todos os jogos estão no arquivo `src/data/games.ts`. Cada jogo é um objeto com a seguinte estrutura:

```ts
{
  title: 'Nome do Jogo',
  studio: 'Estúdio',
  cover: 'https://link-da-imagem.jpg',
  releaseDate: '2024-02-25',          // data de lançamento (ano-mês-dia)
  startDate: '2024-03-01',            // quando você começou a jogar
  endDate: '2024-03-20',              // quando terminou (opcional)
  hoursPlayed: 45,                    // horas jogadas
  rating: 9.5,                        // sua nota (0 a 15, onde 15 = "Perpétuo")
  status: 'completed',                // status do jogo
  difficulty: 'dificil',              // nível de dificuldade
  genres: ['RPG', 'Ação'],            // gêneros
  platforms: [                        // onde comprar/jogar
    { name: 'Steam', url: 'https://...' }
  ],
  recommendedBy: ['Amigo1'],          // quem recomendou (opcional)
  topRank: 1,                         // posição no Top 10 (opcional)
}
```

### Status disponíveis

`playing` · `completed` · `abandoned` · `wishlist` · `backlog`

### Dificuldades disponíveis

`muito-facil` · `facil` · `medio` · `dificil` · `muito-dificil` · `repetitivo` · `grinding` · `relaxante` · `estrategico` · `caotico`

## Tecnologias usadas

- **React** — biblioteca para construção da interface
- **TypeScript** — tipagem estática para JavaScript
- **Vite** — ferramenta de build e servidor de desenvolvimento
- **Tailwind CSS** — estilização
- **Lucide React** — ícones
