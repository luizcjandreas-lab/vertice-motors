# Vértice Motors — site demonstrativo

Site de concessionária multimarcas feito com **React + Vite**, **Tailwind CSS 4**, **Framer Motion** e **Lucide Icons**.
Todo o conteúdo é provisório e fica em um único arquivo: **`src/data/siteData.js`**.

---

## Como rodar

Requisito: [Node.js](https://nodejs.org) 20 ou mais recente.

```bash
npm install
npm run dev      # abre em http://localhost:5173
```

Para publicar:

```bash
npm run build    # gera a pasta dist/
```

### GitHub Pages (já configurado)

Cada envio para a branch `main` dispara o arquivo `.github/workflows/deploy.yml`, que instala, compila e publica o site
em `https://<usuário>.github.io/vertice-motors/`. Para editar pelo próprio GitHub: abra `src/data/siteData.js`, clique no
lápis, altere e salve (Commit changes). Em cerca de 1 a 2 minutos o link é atualizado.

### Outras hospedagens

A pasta `dist/` pode ser enviada para Vercel, Netlify, Cloudflare Pages, Hostinger ou qualquer hospedagem de arquivos
estáticos. Na Vercel e na Netlify basta importar o projeto: o comando de build é `npm run build` e a pasta de saída é
`dist`.

---

## Onde trocar cada coisa

Quase tudo se resolve em **um arquivo só**: `src/data/siteData.js`. Procure por `TROCAR` para achar os itens
provisórios.

| O que trocar | Onde | Campo |
| --- | --- | --- |
| **1. Logo** | `src/data/siteData.js` | `brand.logo.src` — coloque o arquivo (ex.: `logo.svg`) na pasta `public/` e escreva `'/logo.svg'`. Vazio = logo em texto (`brand.wordmark`). O ícone da aba fica em `public/favicon.svg`. |
| **2. Cores** | `src/data/siteData.js` | `theme.primary` (cor principal) e `theme.primaryBright` (variação clara). Também: `background`, `surface`, `text`. Há uma sugestão dourada comentada. |
| **3. WhatsApp** | `src/data/siteData.js` | `contact.whatsapp.number` (55 + DDD + número, só dígitos) e `contact.whatsapp.display`. As mensagens automáticas ficam em `whatsappMessages`. |
| **4. Imagens** | `src/data/siteData.js` | `images.hero`, `images.structure`, `images.structureDetail`, `images.sellTrade`, `featured.image` e `vehicles[].images`. |
| **5. Veículos** | `src/data/siteData.js` | Lista `vehicles`. Para adicionar, copie um bloco `{ ... }` inteiro. O destaque usa `featured.vehicleId`. |
| **6. Textos** | `src/data/siteData.js` | Blocos `hero`, `inventory`, `featured`, `sellTrade`, `about`, `testimonials`, `ctaBand`, `contactSection`, `footer`, `privacy` e `ui`. Título da aba: `seo`. |
| **7. Endereço** | `src/data/siteData.js` | `contact.address`, `contact.hours` e `contact.mapEmbedUrl` (mapa). |

### Detalhes úteis

**Imagens**
- As fotos atuais são provisórias do Unsplash (uso gratuito). Troque por fotos reais da loja e dos carros.
- Pode usar link completo (`https://...`) ou arquivo próprio em `public/` (ex.: `public/fotos/hilux.jpg` →
  `'/fotos/hilux.jpg'`).
- Para os cards, prefira fotos horizontais na proporção 4:3 com pelo menos 1200 px de largura. Para o topo e o destaque,
  fotos horizontais largas (2000 px ou mais).
- Se uma imagem não carregar, o site mostra automaticamente um quadro com o contorno de um carro no lugar.
- `position` (ex.: `'center 60%'`) ajusta o enquadramento da foto.

**Veículos**
- `year` é um número usado no filtro; `yearLabel` é o texto exibido (ex.: `'2022/2023'`).
- `price` e `km` são números sem pontos (ex.: `239900`).
- `transmission` alimenta o filtro de câmbio automaticamente (use sempre a mesma grafia).
- `whatsappMessage` (opcional) cria uma mensagem própria para aquele carro.

**Mapa (Google Maps)**
1. Abra o endereço no Google Maps.
2. Compartilhar → Incorporar um mapa → copie o código.
3. Cole em `contact.mapEmbedUrl` **apenas o link** que está dentro de `src="..."`.

Enquanto estiver vazio, aparece uma área reservada com o endereço.

**Simulação de financiamento**
Taxa, prazos e entrada padrão ficam em `financing`. Os valores são ilustrativos e o aviso aparece junto da simulação.

**Formulário de venda ou troca**
É demonstrativo: não envia dados. O ponto de integração está marcado em `src/components/SellTrade.jsx`, na função
`onSubmit` (comentário `DEMONSTRAÇÃO`). Até lá, a tela de confirmação oferece enviar os dados pelo WhatsApp.

**Fonte**
A fonte é a Archivo (Google Fonts), carregada em `index.html`.

---

## Estrutura

```
src/
├── data/siteData.js          ← todo o conteúdo editável
├── App.jsx                   ← ordem das seções
├── index.css                 ← tokens visuais e estilos base
├── components/
│   ├── Intro.jsx             ← animação de abertura (1x por sessão)
│   ├── Header.jsx            ← cabeçalho fixo e menu do celular
│   ├── Hero.jsx              ← primeira seção
│   ├── inventory/            ← estoque, filtros, cards e detalhes
│   ├── FeaturedVehicle.jsx   ← veículo em destaque e simulação
│   ├── SellTrade.jsx         ← formulário de venda ou troca
│   ├── About.jsx             ← sobre a concessionária
│   ├── Testimonials.jsx      ← depoimentos (exemplos)
│   ├── CtaBand.jsx           ← chamada para o WhatsApp
│   ├── Contact.jsx           ← localização e contato
│   ├── Footer.jsx            ← rodapé
│   └── WhatsAppFloat.jsx     ← botão flutuante
├── hooks/                    ← rolagem, aparelho, janelas acessíveis
└── lib/                      ← formatação, links do WhatsApp, imagens
```

## Comportamentos incluídos

- Introdução de cerca de 2,5 s em SVG (sem vídeo e sem áudio), exibida uma vez por sessão (`sessionStorage`), com botão
  "Pular introdução" e tecla Esc. Aparelhos mais fracos ou com economia de dados recebem uma versão mais curta.
- Com "reduzir movimento" ativado no aparelho, a introdução não aparece e as animações de deslocamento são desligadas.
- Cards com zoom, reflexo e revelação dos botões: por mouse no computador; por toque e ao passar pelo centro da tela no
  celular; por teclado (Tab) em qualquer aparelho.
- Imagens com carregamento preguiçoso, versões menores para o celular e substituto elegante se falharem.
- Mensagens de WhatsApp diferentes para cada veículo, para o destaque (com a simulação escolhida), para o formulário e
  para os botões gerais.
