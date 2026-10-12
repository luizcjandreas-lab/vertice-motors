/**
 * ============================================================================
 *  VÉRTICE MOTORS — ARQUIVO CENTRAL DE CONTEÚDO
 * ============================================================================
 *
 *  Tudo o que aparece no site (nome, logo, cores, contatos, imagens, veículos
 *  e textos) é editado AQUI. Os componentes apenas leem este arquivo.
 *
 *  Como usar:
 *  - Troque os valores entre aspas mantendo a estrutura.
 *  - Imagens podem ser URLs completas (https://...) ou arquivos colocados na
 *    pasta /public (ex.: '/fotos/hilux.jpg').
 *  - Procure por "TROCAR" para encontrar tudo o que é provisório.
 *
 *  Todas as informações abaixo são DEMONSTRATIVAS.
 * ============================================================================
 */

export const siteData = {
  /* --------------------------------------------------------------------------
   * MARCA
   * ------------------------------------------------------------------------ */
  brand: {
    name: 'Vértice Motors', // TROCAR: nome da concessionária
    wordmark: { main: 'VÉRTICE', sub: 'MOTORS' }, // logo em texto (usada quando não há arquivo de logo)
    logo: {
      // TROCAR LOGO: coloque o arquivo em /public (ex.: /logo.svg) e informe o caminho.
      // Deixe vazio ('') para usar a logo em texto acima.
      src: '',
      alt: 'Vértice Motors',
      height: 34, // altura da logo em pixels no cabeçalho
    },
    legalName: 'Vértice Motors Comércio de Veículos Ltda.', // TROCAR: razão social
    cnpj: '00.000.000/0000-00', // TROCAR: CNPJ
  },

  /* --------------------------------------------------------------------------
   * CORES (aplicadas no site inteiro)
   * ------------------------------------------------------------------------ */
  theme: {
    primary: '#A3141C', // TROCAR: cor principal (botões, detalhes, destaques)
    primaryBright: '#D42A33', // variação mais clara (passar o mouse e foco)
    // Versão dourada: primary '#9C7A45' e primaryBright '#CDAA6E'
    background: '#000000', // fundo principal (preto)
    surface: '#15171A', // grafite dos cards e painéis
    text: '#EDF0F3', // branco gelo dos textos
  },

  /* --------------------------------------------------------------------------
   * SEO (título da aba e descrição para o Google)
   * ------------------------------------------------------------------------ */
  seo: {
    title: 'Vértice Motors | Concessionária multimarcas',
    description:
      'Veículos selecionados, atendimento personalizado e condições sob medida para compra, venda, troca e financiamento.',
  },

  /* --------------------------------------------------------------------------
   * CONTATO E ENDEREÇO
   * ------------------------------------------------------------------------ */
  contact: {
    whatsapp: {
      number: '5500900000000', // TROCAR: 55 + DDD + número, só dígitos
      display: '(00) 90000-0000', // TROCAR: como o número aparece no site
    },
    phone: {
      number: '+550000000000', // TROCAR: usado no link de ligação
      display: '(00) 0000-0000', // TROCAR
    },
    email: 'contato@seudominio.com.br', // TROCAR
    instagram: {
      handle: '@verticemotors', // TROCAR
      url: 'https://www.instagram.com/', // TROCAR: link do perfil
    },
    address: {
      // TROCAR: endereço
      street: 'Av. Exemplo, 1000',
      district: 'Bairro Demonstrativo',
      city: 'Cidade',
      state: 'UF',
      zip: '00000-000',
    },
    // Link do botão "Criar rota". Deixe vazio para gerar automaticamente pelo endereço.
    routeUrl: '',
    // Google Maps: abra o endereço no Google Maps > Compartilhar > Incorporar um mapa,
    // copie SOMENTE o link que está dentro de src="..." e cole aqui.
    mapEmbedUrl: '',
    hours: [
      // TROCAR: horários
      { days: 'Segunda a sexta', time: '9h às 18h' },
      { days: 'Sábado', time: '9h às 14h' },
      { days: 'Domingo e feriados', time: 'Fechado' },
    ],
  },

  /* --------------------------------------------------------------------------
   * REDES SOCIAIS (ícones disponíveis: instagram, facebook, youtube, tiktok)
   * ------------------------------------------------------------------------ */
  social: [
    { name: 'Instagram', icon: 'instagram', url: 'https://www.instagram.com/' }, // TROCAR
    { name: 'Facebook', icon: 'facebook', url: 'https://www.facebook.com/' }, // TROCAR
    { name: 'YouTube', icon: 'youtube', url: 'https://www.youtube.com/' }, // TROCAR
  ],

  /* --------------------------------------------------------------------------
   * MENSAGENS AUTOMÁTICAS DO WHATSAPP
   * Variáveis disponíveis: {loja} {veiculo} {preco} {entrada} {prazo} {parcela}
   * Cada veículo também pode ter sua própria mensagem (campo whatsappMessage).
   * ------------------------------------------------------------------------ */
  whatsappMessages: {
    general: 'Olá! Vim pelo site da {loja} e gostaria de atendimento.',
    consultant: 'Olá! Gostaria de falar com um consultor da {loja}.',
    vehicleInterest: 'Olá, tenho interesse no {veiculo}. Ele ainda está disponível?',
    featured:
      'Olá, quero o {veiculo} que está em destaque no site. Simulei entrada de {entrada} e {prazo}x de {parcela}. Podemos conversar?',
    visit: 'Olá! Gostaria de agendar uma visita à {loja}.',
    notFound: 'Olá! Não encontrei no site o veículo que procuro. Podem me ajudar a encontrar?',
    evaluation:
      'Olá! Quero avaliar meu veículo para venda ou troca.\n\nNome: {nome}\nVeículo: {marca} {modelo} {ano}\nQuilometragem: {km} km\nObservações: {mensagem}',
  },

  /* --------------------------------------------------------------------------
   * SIMULAÇÃO DE FINANCIAMENTO (valores ilustrativos)
   * ------------------------------------------------------------------------ */
  financing: {
    monthlyRate: 0.0149, // TROCAR: taxa mensal usada na simulação (1,49% a.m.)
    terms: [24, 36, 48, 60], // prazos em meses
    defaultTerm: 48,
    defaultDownPayment: 0.4, // entrada padrão (40%)
    minDownPayment: 0.2,
    maxDownPayment: 0.7,
    disclaimer:
      'Simulação ilustrativa com taxa demonstrativa de 1,49% a.m. Valores sujeitos a análise de crédito e alteração sem aviso prévio.',
  },

  /* --------------------------------------------------------------------------
   * IMAGENS GERAIS
   * Imagens provisórias do Unsplash (uso gratuito). Substitua por fotos reais.
   * ------------------------------------------------------------------------ */
  images: {
    // TROCAR ESTA IMAGEM: foto principal (topo do site)
    hero: {
      src: 'https://images.unsplash.com/photo-1628519592419-bf288f08cef5',
      alt: 'Esportivo preto fosco em rua molhada à noite',
      position: '60% 55%',
    },
    // TROCAR ESTA IMAGEM: foto da estrutura / showroom
    structure: {
      src: 'https://images.unsplash.com/photo-1692406069831-0bb7ea297645',
      alt: 'Showroom com veículos expostos',
      position: 'center',
    },
    // TROCAR ESTA IMAGEM: foto de detalhe da loja
    structureDetail: {
      src: 'https://images.unsplash.com/photo-1565376901308-37344a4b06ea',
      alt: 'Detalhe de um veículo no piso do showroom',
      position: 'center',
    },
    // TROCAR ESTA IMAGEM: foto da seção "Venda ou troca"
    sellTrade: {
      src: 'https://images.unsplash.com/photo-1653565217811-85b41bcd1edb',
      alt: 'Mão segurando a chave de um carro',
      position: 'center',
    },
  },

  /* --------------------------------------------------------------------------
   * MENU
   * ------------------------------------------------------------------------ */
  nav: [
    { label: 'Estoque', href: '#estoque' },
    { label: 'Destaque', href: '#destaque' },
    { label: 'Venda ou troca', href: '#venda-troca' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Contato', href: '#contato' },
  ],
  header: {
    cta: 'Falar no WhatsApp',
    menuOpen: 'Abrir menu',
    menuClose: 'Fechar menu',
  },

  /* --------------------------------------------------------------------------
   * ANIMAÇÃO DE ABERTURA
   * ------------------------------------------------------------------------ */
  intro: {
    title: 'VÉRTICE MOTORS',
    phrase: 'O seu próximo destino começa aqui',
    skip: 'Pular introdução',
  },

  /* --------------------------------------------------------------------------
   * TOPO (HERO)
   * ------------------------------------------------------------------------ */
  hero: {
    title: 'Seu próximo carro está mais perto do que você imagina.',
    text: 'Veículos selecionados, atendimento personalizado e as melhores condições para você.',
    primaryCta: 'Explorar veículos',
    secondaryCta: 'Falar com um consultor',
    scrollHint: 'Role para explorar',
    services: ['Compra', 'Venda', 'Troca', 'Financiamento'],
  },

  /* --------------------------------------------------------------------------
   * ESTOQUE
   * ------------------------------------------------------------------------ */
  inventory: {
    title: 'Estoque em destaque',
    text: 'Carros escolhidos um a um, com procedência verificada e prontos para a próxima estrada.',
    notice: 'Estoque demonstrativo: veículos, preços e condições são ilustrativos.',
    installmentNote: '* Parcela estimada com entrada de 40% e taxa demonstrativa.',
    filtersButton: 'Filtrar estoque',
    filters: {
      brand: 'Marca',
      model: 'Modelo',
      price: 'Faixa de preço',
      year: 'Ano',
      transmission: 'Câmbio',
      any: 'Todas',
      anyModel: 'Todos',
      allTransmissions: 'Todos',
      clear: 'Limpar filtros',
      yearFrom: '{ano} ou mais novo',
    },
    priceRanges: [
      { id: 'ate-300', label: 'Até R$ 300 mil', min: 0, max: 300000 },
      { id: '300-500', label: 'R$ 300 mil a 500 mil', min: 300000, max: 500000 },
      { id: '500-700', label: 'R$ 500 mil a 700 mil', min: 500000, max: 700000 },
      { id: 'acima-700', label: 'Acima de R$ 700 mil', min: 700000, max: Infinity },
    ],
    resultsOne: '1 veículo encontrado',
    resultsMany: '{n} veículos encontrados',
    emptyTitle: 'Nenhum veículo com esses filtros.',
    emptyText: 'Remova um filtro ou peça ao nosso time para encontrar o modelo que você procura.',
    emptyCta: 'Pedir pelo WhatsApp',
    details: 'Ver detalhes',
    interest: 'Tenho interesse',
    installmentLabel: 'ou entrada + {prazo}x de {parcela}*',
    labels: {
      year: 'Ano',
      km: 'Quilometragem',
      transmission: 'Câmbio',
      fuel: 'Combustível',
      color: 'Cor',
      engine: 'Motor',
      power: 'Potência',
      doors: 'Portas',
    },
  },

  /* --------------------------------------------------------------------------
   * VEÍCULOS
   * Para adicionar um veículo, copie um bloco { ... } inteiro e altere os dados.
   * "year" (número) é usado no filtro; "yearLabel" é o texto exibido.
   * ------------------------------------------------------------------------ */
  vehicles: [
    {
      id: 'porsche-911-carrera-t',
      brand: 'Porsche',
      model: '911',
      version: 'Carrera T 3.0 Biturbo',
      year: 2023,
      yearLabel: '2022/2023',
      km: 9800,
      transmission: 'Manual',
      fuel: 'Gasolina',
      price: 899900,
      color: 'Preto',
      engine: '3.0 boxer biturbo',
      power: '385 cv',
      doors: 2,
      tag: 'Câmbio manual',
      // TROCAR ESTA IMAGEM (a primeira foto é a capa do card)
      images: [
        {
          src: 'https://images.unsplash.com/photo-1608506436795-af65d01305bf',
          alt: 'Porsche 911 preto estacionado em garagem',
        },
      ],
      features: [
        'Câmbio manual de 7 marchas',
        'Pacote Sport Chrono',
        'Escapamento esportivo',
        'Bancos esportivos em couro',
        'Faróis full LED',
        'Revisões em concessionária',
      ],
      description:
        'Texto demonstrativo. Configuração voltada a quem gosta de dirigir: câmbio manual, ajuste de suspensão mais firme e acabamento interno com detalhes exclusivos.',
    },
    {
      id: 'mercedes-amg-gt-s',
      brand: 'Mercedes-Benz',
      model: 'AMG GT',
      version: 'S 4.0 V8 Biturbo',
      year: 2019,
      yearLabel: '2019/2019',
      km: 21300,
      transmission: 'Automatizado',
      fuel: 'Gasolina',
      price: 799900,
      color: 'Preto fosco',
      engine: '4.0 V8 biturbo',
      power: '522 cv',
      doors: 2,
      tag: 'Destaque',
      // TROCAR ESTA IMAGEM
      images: [
        {
          src: 'https://images.unsplash.com/photo-1617814076231-2c58846db944',
          alt: 'Mercedes-AMG GT preto em uma rua',
        },
        {
          src: 'https://images.unsplash.com/photo-1617814065893-00757125efab',
          alt: 'Mercedes-AMG GT preto fosco estacionado em um cais',
        },
      ],
      features: [
        'Câmbio de dupla embreagem com 7 marchas',
        'Escapamento AMG Performance',
        'Bancos AMG em couro',
        'Teto panorâmico',
        'Sistema de som Burmester',
        'Manual e chave reserva',
      ],
      description:
        'Texto demonstrativo. Gran turismo de motor dianteiro central e tração traseira, com acabamento em preto fosco e histórico de revisões completo.',
    },
    {
      id: 'bmw-m3-competition',
      brand: 'BMW',
      model: 'M3',
      version: 'Competition 3.0 Biturbo',
      year: 2022,
      yearLabel: '2022/2022',
      km: 15600,
      transmission: 'Automático',
      fuel: 'Gasolina',
      price: 619900,
      color: 'Preto',
      engine: '3.0 seis cilindros biturbo',
      power: '510 cv',
      doors: 4,
      tag: '',
      // TROCAR ESTA IMAGEM
      images: [
        {
          src: 'https://images.unsplash.com/photo-1588911146469-befbc6e2145a',
          alt: 'BMW M3 preta em uma rua à noite',
        },
      ],
      features: [
        'Câmbio automático de 8 marchas',
        'Bancos M Carbon',
        'Head-up display',
        'Sistema de som Harman Kardon',
        'Assistente de estacionamento',
        'Garantia de fábrica vigente',
      ],
      description:
        'Texto demonstrativo. Sedã de alto desempenho com uso diário confortável, quatro portas e pacote completo de tecnologia.',
    },
    {
      id: 'audi-a4-prestige-plus',
      brand: 'Audi',
      model: 'A4',
      version: '2.0 TFSI Prestige Plus',
      year: 2023,
      yearLabel: '2022/2023',
      km: 34800,
      transmission: 'Automatizado',
      fuel: 'Gasolina',
      price: 239900,
      color: 'Preto',
      engine: '2.0 turbo',
      power: '204 cv',
      doors: 4,
      tag: '',
      // TROCAR ESTA IMAGEM
      images: [
        {
          src: 'https://images.unsplash.com/photo-1621252792374-2b79e3fcf295',
          alt: 'Audi A4 preto em uma estrada durante o dia',
        },
      ],
      features: [
        'Painel digital Virtual Cockpit',
        'Teto solar',
        'Bancos em couro com ajuste elétrico',
        'Faróis full LED',
        'Câmera de ré',
        'Único dono',
      ],
      description:
        'Texto demonstrativo. Sedã executivo com rodagem equilibrada, consumo eficiente e interior silencioso para o dia a dia.',
    },
    {
      id: 'jeep-wrangler-rubicon',
      brand: 'Jeep',
      model: 'Wrangler',
      version: 'Rubicon 2.0 Turbo',
      year: 2022,
      yearLabel: '2021/2022',
      km: 41200,
      transmission: 'Automático',
      fuel: 'Gasolina',
      price: 389900,
      color: 'Preto',
      engine: '2.0 turbo',
      power: '272 cv',
      doors: 4,
      tag: '4x4',
      // TROCAR ESTA IMAGEM
      images: [
        {
          src: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e',
          alt: 'Jeep Wrangler preto',
        },
      ],
      features: [
        'Tração 4x4 com reduzida',
        'Bloqueio de diferencial',
        'Capota rígida removível',
        'Central multimídia com GPS',
        'Pneus de uso misto',
        'Manual e chave reserva',
      ],
      description:
        'Texto demonstrativo. Utilitário preparado para trilhas e estrada, com capota removível e sistema de tração completo.',
    },
    {
      id: 'chevrolet-silverado-high-country',
      brand: 'Chevrolet',
      model: 'Silverado',
      version: 'High Country 5.3 V8',
      year: 2024,
      yearLabel: '2023/2024',
      km: 18700,
      transmission: 'Automático',
      fuel: 'Gasolina',
      price: 489900,
      color: 'Preto',
      engine: '5.3 V8',
      power: '355 cv',
      doors: 4,
      tag: '',
      // TROCAR ESTA IMAGEM
      images: [
        {
          src: 'https://images.unsplash.com/photo-1612057473166-af2affdb92ad',
          alt: 'Picape Chevrolet preta de cabine dupla em terreno de areia',
        },
        {
          src: 'https://images.unsplash.com/photo-1612057473117-3e16246121e6',
          alt: 'Picape Chevrolet preta de cabine dupla vista de lado',
        },
      ],
      features: [
        'Câmbio automático de 10 marchas',
        'Tração 4x4',
        'Bancos em couro com ventilação',
        'Teto solar',
        'Câmeras 360°',
        'Capota marítima',
      ],
      description:
        'Texto demonstrativo. Picape grande com cabine ampla, caçamba protegida e conforto de SUV para longas viagens.',
    },
  ],

  /* --------------------------------------------------------------------------
   * VEÍCULO EM DESTAQUE
   * vehicleId deve ser igual ao "id" de um veículo da lista acima.
   * ------------------------------------------------------------------------ */
  featured: {
    vehicleId: 'mercedes-amg-gt-s',
    label: 'Veículo em destaque',
    title: 'Mercedes-AMG GT S', // nome exibido em destaque (deixe vazio para usar marca + modelo)
    // TROCAR ESTA IMAGEM: foto grande da seção de destaque (formato horizontal)
    image: {
      src: 'https://images.unsplash.com/photo-1617814065893-00757125efab',
      alt: 'Mercedes-AMG GT preto fosco estacionado em um cais',
      position: 'center 60%',
    },
    text: 'Um gran turismo para quem quer desempenho de pista com conforto para viajar. Unidade revisada, com manual, chave reserva e laudo cautelar aprovado. (Texto demonstrativo)',
    // Medidas mostradas nas linhas técnicas ao redor da foto
    dimensions: { length: 'Comprimento 4.546 mm', height: 'Altura 1.287 mm' },
    specs: [
      { label: 'Potência', value: '522', unit: 'cv' },
      { label: '0 a 100 km/h', value: '3,8', unit: 's' },
      { label: 'Velocidade máxima', value: '310', unit: 'km/h' },
      { label: 'Quilometragem', value: '21.300', unit: 'km' },
    ],
    highlights: [
      'Motor 4.0 V8 biturbo',
      'Câmbio de dupla embreagem',
      'Escapamento AMG Performance',
      'Revisões em concessionária',
    ],
    priceLabel: 'Valor',
    simulationTitle: 'Simule a parcela',
    downPaymentLabel: 'Entrada',
    termLabel: 'Prazo',
    installmentLabel: 'Parcela estimada',
    cta: 'Quero este veículo',
    details: 'Ver ficha completa',
  },

  /* --------------------------------------------------------------------------
   * VENDA OU TROCA
   * ------------------------------------------------------------------------ */
  sellTrade: {
    title: 'Seu carro pode fazer parte do próximo negócio.',
    text: 'Conte qual é o seu veículo. A equipe avalia, apresenta uma proposta clara e, se quiser, usa o valor como entrada no próximo carro.',
    steps: [
      { title: 'Envie os dados', text: 'Preencha o formulário com as informações e fotos do carro.' },
      { title: 'Receba o contato', text: 'Um consultor retorna pelo WhatsApp para alinhar detalhes.' },
      { title: 'Avaliação presencial', text: 'Vistoria rápida na loja e proposta final na hora.' },
    ],
    notice:
      'Formulário demonstrativo. Nesta versão os dados não são enviados; a integração com WhatsApp, e-mail ou CRM será feita na versão final.',
    fields: {
      name: 'Nome',
      whatsapp: 'WhatsApp',
      brand: 'Marca',
      model: 'Modelo',
      year: 'Ano',
      km: 'Quilometragem',
      message: 'Mensagem',
      messagePlaceholder: 'Estado de conservação, opcionais, se pretende trocar ou vender…',
      photos: 'Fotos do veículo',
      photosHint: 'Arraste as fotos aqui ou toque para escolher. Até 8 imagens.',
      photosDemo: 'Demonstração: as fotos ficam apenas no seu navegador e não são enviadas.',
      removePhoto: 'Remover foto',
    },
    errors: {
      name: 'Informe seu nome.',
      whatsapp: 'Informe um WhatsApp com DDD.',
      brand: 'Informe a marca.',
      model: 'Informe o modelo.',
      year: 'Informe um ano válido, com 4 dígitos.',
    },
    submit: 'Solicitar avaliação',
    submitting: 'Enviando…',
    successTitle: 'Solicitação registrada na demonstração',
    successText:
      'Este formulário ainda não envia dados. Para agilizar, envie as mesmas informações direto pelo WhatsApp.',
    successWhatsapp: 'Enviar pelo WhatsApp',
    successReset: 'Preencher novamente',
  },

  /* --------------------------------------------------------------------------
   * SOBRE A CONCESSIONÁRIA (texto institucional provisório)
   * ------------------------------------------------------------------------ */
  about: {
    title: 'Uma loja feita para quem escolhe com calma.',
    notice: 'Texto institucional provisório',
    paragraphs: [
      'Este espaço apresenta a história da concessionária, a forma de trabalhar e o que torna a experiência de compra diferente. Substitua este texto por informações reais da empresa.',
      'Sugestão de conteúdo: como os veículos são escolhidos, como funciona a vistoria, o que o cliente recebe na entrega e como o time acompanha o pós-venda.',
    ],
    differentials: [
      {
        icon: 'shield',
        title: 'Veículos selecionados',
        text: 'Cada carro passa por vistoria e checagem de procedência antes de entrar no estoque.',
      },
      {
        icon: 'eye',
        title: 'Atendimento transparente',
        text: 'Histórico, laudos e condições apresentados antes de qualquer decisão.',
      },
      {
        icon: 'sliders',
        title: 'Condições personalizadas',
        text: 'Entrada, troca e prazo ajustados ao momento de cada cliente.',
      },
    ],
    cta: 'Agendar uma visita',
  },

  /* --------------------------------------------------------------------------
   * DEPOIMENTOS (EXEMPLOS — substituir por avaliações reais)
   * ------------------------------------------------------------------------ */
  testimonials: {
    title: 'Depoimentos de clientes',
    notice:
      'Exemplos de layout. Os depoimentos abaixo são fictícios e serão substituídos por avaliações reais de clientes.',
    badge: 'Exemplo',
    items: [
      {
        quote:
          'Fui atendido do primeiro contato à entrega sem pressa e sem pressão. Recebi o histórico do carro antes de fechar.',
        author: 'Nome do cliente',
        detail: 'Comprou um sedã',
      },
      {
        quote: 'Deixei meu carro na troca e a avaliação foi explicada item por item. Saí com o novo no mesmo dia.',
        author: 'Nome do cliente',
        detail: 'Fez uma troca',
      },
      {
        quote:
          'Montaram uma condição de financiamento que coube no meu orçamento, com tudo claro desde a primeira simulação.',
        author: 'Nome do cliente',
        detail: 'Financiou um SUV',
      },
    ],
  },

  /* --------------------------------------------------------------------------
   * CHAMADA ANTES DO CONTATO
   * ------------------------------------------------------------------------ */
  ctaBand: {
    title: 'Encontrou o carro certo? Vamos conversar.',
    text: 'Um consultor responde pelo WhatsApp com fotos, vídeos e condições do veículo.',
    primary: 'Falar com um consultor',
    secondary: 'Ver estoque',
  },

  /* --------------------------------------------------------------------------
   * LOCALIZAÇÃO E CONTATO
   * ------------------------------------------------------------------------ */
  contactSection: {
    title: 'Venha conhecer a loja.',
    text: 'Agende um horário para ver o carro de perto e fazer um test drive.',
    addressLabel: 'Endereço',
    hoursLabel: 'Horário de atendimento',
    channelsLabel: 'Canais',
    mapPlaceholderTitle: 'Área reservada para o Google Maps',
    mapPlaceholderText: 'O mapa interativo aparece aqui após configurar o endereço real.',
    routeCta: 'Criar rota',
    whatsappCta: 'Chamar no WhatsApp',
  },

  /* --------------------------------------------------------------------------
   * RODAPÉ
   * ------------------------------------------------------------------------ */
  footer: {
    text: 'Concessionária multimarcas. Compra, venda, troca e financiamento de veículos selecionados.',
    quickLinksTitle: 'Navegação',
    contactTitle: 'Contato',
    socialTitle: 'Redes sociais',
    privacy: 'Política de privacidade',
    rights: 'Todos os direitos reservados.',
    demoNote: 'Site demonstrativo com informações e imagens provisórias.',
  },

  /* --------------------------------------------------------------------------
   * POLÍTICA DE PRIVACIDADE (texto provisório — revisar com o jurídico)
   * ------------------------------------------------------------------------ */
  privacy: {
    title: 'Política de privacidade',
    paragraphs: [
      'Texto provisório. Esta política deve ser redigida pela empresa, de acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).',
      'Sugestão de tópicos: quais dados são coletados nos formulários e no WhatsApp, para que são usados, por quanto tempo são guardados, com quem podem ser compartilhados e como o titular pode pedir acesso, correção ou exclusão.',
      'Informe também o contato do encarregado de dados (DPO) e a data da última atualização.',
    ],
    close: 'Fechar',
  },

  /* --------------------------------------------------------------------------
   * TEXTOS GERAIS
   * ------------------------------------------------------------------------ */
  ui: {
    skipToContent: 'Pular para o conteúdo',
    close: 'Fechar',
    imageUnavailable: 'Imagem indisponível',
    demoInfo: 'Informações e imagens demonstrativas.',
    whatsappFloat: 'Conversar no WhatsApp',
    previousImage: 'Foto anterior',
    nextImage: 'Próxima foto',
    photoOf: 'Foto {n} de {total}',
  },
}

export default siteData
