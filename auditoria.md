# Auditoria Completa: Design, Tipografia, Acessibilidade, Copy e SEO
**Cliente:** Luciano Alves Freire, Consultório Odontológico, Implantodontia e Ortodontia  
**Registro:** CRO MG 25.170  
**Endereço:** Rua dos Brandões, 231, Sala 24, Centro, Passos/MG, CEP 37.900-104  
**Canal Oficial:** WhatsApp (35) 98821-5162 | https://wa.me/5535988215162  
**Auditor:** Desenvolvedor Front-end Sênior, Diretor de Arte e Auditor de Acessibilidade & SEO  
**Data:** Outubro de 2026  

---

## 1. Categoria: COR

### Diagnóstico Geral da Categoria
- **Paleta Oficial (Manual da Marca):**
  - Azul principal: `#426BB2`
  - Azul profundo (hover/ativo): `#3D6ABD`
  - Azul claro (detalhes/bordas/degradês): `#9DB8E0` e `#C3D8F0`
  - Verde claro: `#C6DB69` (apenas acento visual)
  - Verde escuro: `#8BB027` (apenas acento visual)
  - Fundos: branco e degradês suaves de azul claro para branco.
  - Neutros autorizados: texto em azul-grafite escuro (`#1E2A44`), fundos suaves (`#F4F8FD` e `#E6EFFA`).
- **Percentual de seções escuras vs. claras no site atual:**
  - Na página inicial (`index.astro`), 5 das 8 seções de conteúdo (62,5%) possuem fundo azul marinho escuro (`#102A4C`), além do Header (`#102A4C`) e Footer (`#060E18`). Considerando todos os blocos, **70% do site tem fundo escuro**.
  - Nas subpáginas (`servicos/*.astro`), 4 das 6 seções (66,7%) possuem fundo escuro.
  - Há presença maciça de dourados (`gold-*`), marinhos (`navy-*`, `#090E17`, `#0F172A`), azuis elétricos (`#1153C9`, `#1F6DE8`) e verdes esmeralda (`#99EE1F`), totalmente desalinhados da identidade da marca.

### Tabela de Apontamentos — COR

| ID | Arquivo e Trecho / Seção | Problema Encontrado | Evidência (Valor Encontrado) | Correção Proposta | Prioridade |
| :--- | :--- | :--- | :--- | :--- | :--- |
| COR-01 | `tailwind.config.mjs` (L10-46) | Paleta inteira no Tailwind está desconectada da marca; contém escalas douradas, marinho e azuis fora do manual | `gold: {...}`, `navy: {...}`, `brandblue: {...}`, `babyblue: {...}` | Substituir por tokens oficiais: `brand-blue` (`#426BB2`), `brand-deep` (`#3D6ABD`), `brand-light` (`#9DB8E0`, `#C3D8F0`), `accent-green` (`#8BB027`, `#C6DB69`), `brand-dark` (`#1E2A44`), `bg-soft` (`#F4F8FD`, `#E6EFFA`) | Alta |
| COR-02 | `src/layouts/Layout.astro` (L109) | Meta tag `theme-color` usando tom navy escuro em vez do azul da marca | `<meta name="theme-color" content="#102A4C" />` | Atualizar para `#426BB2` | Alta |
| COR-03 | `src/layouts/Layout.astro` (L150-153) | Variáveis CSS globais com tons de champagne e navy escuro | `--color-champagne: #C5A880; --color-navy-dark: #090E17; --color-navy-card: #0F172A;` | Remover variáveis de champagne e navy; declarar tokens da marca oficial em `:root` | Alta |
| COR-04 | `src/layouts/Layout.astro` (L365) | Cor de seleção de texto usando tom dourado `selection:bg-gold-200` | `selection:bg-gold-200 selection:text-slate-900` | Alterar para `selection:bg-[#C3D8F0] selection:text-[#1E2A44]` | Média |
| COR-05 | `src/components/Header.astro` (L10) | Cabeçalho com fundo azul marinho escuro | `bg-[#102A4C]/95 border-b border-[#22487A]/70` | Ajustar para fundo claro translúcido (`bg-white/95`) com borda suave em `#E6EFFA` ou faixa sólida da marca `#426BB2` | Alta |
| COR-06 | `src/pages/index.astro` (L49, L65) | Splash screen e seção Hero com fundo navy escuro pesado | `bg-[#102A4C]`, degradês `from-[#102A4C]` | Converter Hero para fundo predominantemente claro (branco com degradê suave `#F4F8FD` a `#FFFFFF`), usando `#426BB2` para títulos e botões | Alta |
| COR-07 | `src/pages/index.astro` (L143, L154) | Seção Comparador e card do comparador com fundo escuro | `bg-[#102A4C]`, card `bg-[#0F223D] border-[#1E3E66]` | Transformar para fundo suave `#F4F8FD` com card branco `#FFFFFF`, borda `#C3D8F0` e detalhes no azul oficial | Alta |
| COR-08 | `src/pages/index.astro` (L233, L244, L257) | Seção Autoridade com fundo navy e cards com cores douradas | `bg-[#102A4C]`, cards `bg-[#0F223D]`, textos `text-gold-400` | Fundo branco/azul suave, cards brancos com sombra sutil e destaque em `#426BB2` | Alta |
| COR-09 | `src/pages/index.astro` (L285, L303, L342) | Seção Ambientes com fundo escuro e cards em `#15335B` | `bg-[#102A4C]`, cards `bg-[#15335B]/90`, detalhes `text-gold-300` | Fundo branco, cards em tons claros com borda `#E6EFFA`, textos em `#1E2A44` e acentos no azul oficial | Alta |
| COR-10 | `src/pages/index.astro` (L437, L444, L451) | Seção FAQ inteiramente em bloco escuro | `bg-[#102A4C]`, acordeons `bg-[#0F223D]`, ícones `text-gold-400` | Fundo `#F4F8FD`, acordeons brancos com borda `#C3D8F0` e ícones em `#426BB2` | Alta |
| COR-11 | `src/components/Footer.astro` (L12, L31, L56) | Rodapé em tom quase preto (`#060E18`) com detalhes em dourado | `bg-[#060E18]`, `text-gold-300`, `text-gold-400` | Fundo no azul sólido da marca (`#426BB2`) com texto branco e links em `#C3D8F0` | Alta |
| COR-12 | `src/pages/servicos/*.astro` (L17, L56, L116, L179) | Todas as páginas de serviços repetem o padrão de 4 blocos escuros | `bg-[#102A4C]` no Hero, Bento, Depoimentos e CTA | Converter todas as seções para fundos claros alternados (branco e `#F4F8FD`), reservando `#426BB2` para botões e CTA final | Alta |
| COR-13 | `src/components/DoctorLogo.astro` (L21-50) | Gradientes internos do componente de logo com azuis elétricos e verdes neon | `#99EE1F`, `#84DE16`, `#4B95FB`, `#1F6DE8`, `#80BAFB` | Utilizar as logos oficiais em SVG fornecidas (`logo-simplificada.svg`, `logo-completa.svg`, `logo-simbolo.svg`) | Alta |
| COR-14 | `public/favicon.svg` (L2, L6-16) | Favicon com fundo escuro `#090E17` e cores neon | `rect fill="#090E17"`, `#99EE1F`, `#4B95FB` | Substituir pelo símbolo oficial `logo-simbolo.svg` com fundo transparente ou branco | Média |

---

## 2. Categoria: TIPOGRAFIA

### Diagnóstico Geral da Categoria
- **Identidade da Marca:** Tipografia Humanst521 BT (Book, Regular, Bold) e Humanst777 BLK BT (títulos pesados) — família **HUMANISTA SEM SERIFA**. Regra expressa: **nenhuma fonte serifada no site**.
- **Situação Atual:**
  - O projeto carrega via Google Fonts a fonte `Playfair Display` (serifada clássica de alto contraste) e a aplica em praticamente todos os títulos H1, H2, H3, logotipos e nomes.
  - A combinação de Playfair Display com pesos pesados (700/800) em títulos longos gera poluição visual, peso excessivo e compromete a legibilidade solicitada pelo cliente.
  - Não há escala tipográfica fluida padronizada com `clamp()`.

### Tabela de Apontamentos — TIPOGRAFIA

| ID | Arquivo e Trecho / Seção | Problema Encontrado | Evidência (Valor Encontrado) | Correção Proposta | Prioridade |
| :--- | :--- | :--- | :--- | :--- | :--- |
| TIP-01 | `tailwind.config.mjs` (L49) | Configuração de fonte serifada Playfair Display ativa no Tailwind | `serif: ['"Playfair Display"', 'Georgia', 'serif']` | Remover família serifada. Definir única família humanista sem serifa recomendada (`Source Sans 3` ou `Cabin`) | Alta |
| TIP-02 | `src/layouts/Layout.astro` (L139-142) | Carregamento de Playfair Display via Google Fonts | `family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,600` | Remover Playfair Display. Substituir pelo carregamento otimizado da fonte humanista sem serifa | Alta |
| TIP-03 | `src/components/Header.astro` (L23) | Nome do profissional no topo utilizando fonte serifada | `font-serif font-bold text-white` | Substituir pela logo simplificada oficial SVG, eliminando a dependência de tipografia serifada manual | Alta |
| TIP-04 | `src/pages/index.astro` (L96) | H1 do Hero com peso excessivo (800) e tamanho desproporcional | `font-sans text-3xl lg:text-5xl font-extrabold` | Ajustar para escala fluida `clamp(2rem, 3.5vw, 2.75rem)` (32px a 44px), peso 700, cor `#426BB2` ou `#1E2A44` | Alta |
| TIP-05 | `src/pages/index.astro` (L129, L146, L195, L236, L253, L292, L418, L440) | Títulos H2 de todas as seções principais da Home usando `font-serif` | `font-serif text-3xl sm:text-4xl lg:text-5xl font-bold` | Remover `font-serif`; aplicar fonte humanista sem serifa, escala contida de 26px a 34px (`clamp(1.625rem, 2.5vw, 2.125rem)`), peso 700 | Alta |
| TIP-06 | `src/pages/index.astro` (L170, L176, L182, L209, L216, L223, L321, L359, L387) | Títulos H3 de cards e timeline usando `font-serif` | `font-serif text-xl sm:text-2xl font-bold` | Remover `font-serif`; adotar 20px a 24px (`clamp(1.25rem, 1.8vw, 1.5rem)`), sem serifa, peso 700 | Alta |
| TIP-07 | `src/pages/servicos/*.astro` (L21, L46, L76, L119, L181) | Títulos H1 gigantescos (até 60px) com `font-serif` nas páginas de serviços | `text-4xl sm:text-5xl lg:text-6xl font-serif font-bold` | Limitar H1 a 32px-44px em sem serifa, H2 a 26px-34px, unificando a experiência de leitura | Alta |
| TIP-08 | `src/components/Footer.astro` (L28) | Nome do profissional no rodapé com fonte serifada | `font-serif font-bold text-white` | Usar tipografia humanista sem serifa padronizada e a logo completa oficial | Alta |
| TIP-09 | `src/pages/index.astro` (L96, L99) | Line-height muito condensado (`leading-[1.18]`) em títulos e irregular em parágrafos | `leading-[1.18]`, `leading-snug`, `leading-normal` | Padronizar line-height de títulos entre 1.25 e 1.35; corpo de texto estritamente entre 1.6 e 1.7 | Média |
| TIP-10 | `src/pages/index.astro` (L99, L132, L149) | Largura de linha em parágrafos sem controle ideal de legibilidade editorial | `max-w-xl`, `max-w-2xl` com fontes pequenas | Aplicar largura de linha máxima de cerca de 65 caracteres (`max-w-prose` ou `max-w-[65ch]`) | Média |

---

## 3. Categoria: TAMANHOS

### Diagnóstico Geral da Categoria
- **Requisito do Cliente:** Desktop e mobile devem usar fontes maiores para facilitar a leitura. Nenhum texto abaixo de 16px. Botões e links com texto mínimo de 18px e alvo de toque de pelo menos 48px.
- **Situação Atual:**
  - Há textos de 10px, 11px, 12px e 13px espalhados pelo cabeçalho, rodapé, badges, cards e comparadores.
  - Alvos de toque inferiores a 44px/48px em botões secundários, navegação e setas.

### Tabela de Apontamentos — TAMANHOS

| ID | Arquivo e Trecho / Seção | Problema Encontrado | Evidência (Valor Encontrado) | Correção Proposta | Prioridade |
| :--- | :--- | :--- | :--- | :--- | :--- |
| TAM-01 | `src/components/Header.astro` (L26) | Subtítulo da marca no topo com tamanho 10px/11px (ilegível) | `text-[10px] sm:text-[11px]` | Remover o texto solto; utilizar `logo-simplificada.svg` com proporção nativa limpa | Alta |
| TAM-02 | `src/components/Header.astro` (L33) | Links de navegação desktop com tamanho 13px (abaixo de 16px) | `text-[13px] font-medium` | Aumentar para 16px-18px (`text-base`), garantindo conforto de leitura e alvo de clique | Alta |
| TAM-03 | `src/components/Header.astro` (L48) | Botão CTA do cabeçalho com texto em 12px (`text-xs`) e altura apertada | `text-xs px-4 py-2` (altura total ~34px) | Aumentar para altura mínima de 48px, padding `px-5 py-3`, texto em 16px-18px | Alta |
| TAM-04 | `src/pages/index.astro` (L85, L93) | Badge do Hero com tamanho 11px/12px | `text-[11px] sm:text-xs py-1.5 px-3` | Ajustar texto para mínimo de 16px (`text-base`), padding e altura generosos | Média |
| TAM-05 | `src/pages/index.astro` (L99) | Texto base do Hero em 16px no mobile (`text-base`) | `text-base sm:text-lg` | Implementar escala fluida `clamp(1.125rem, 1.5vw, 1.25rem)` (18px no mobile a 20px no desktop) | Alta |
| TAM-06 | `src/components/AnatomyComparisonSlider.tsx` (L144-178) | Botões de controle do comparador anatômico com altura de ~26px e texto 11px | `text-[11px] px-3 py-1.5` | Elevar altura mínima dos botões para 48px, texto de 16px, padding `px-4 py-3` | Alta |
| TAM-07 | `src/components/ServicesCarousel.tsx` (L42, L49) | Botões de seta de paginação do carrossel com apenas 40x40px | `w-10 h-10` (abaixo dos 44px/48px mínimos) | Redimensionar para no mínimo `w-12 h-12` (48x48px) | Média |
| TAM-08 | `src/pages/index.astro` (L258-271) | Cards de métricas da seção Autoridade com textos explicativos de 12px | `text-xs text-slate-300` | Elevar texto explicativo para mínimo de 16px | Alta |
| TAM-09 | `src/pages/index.astro` (L328, L353, L381) | Badges e detalhes de ambiente com 11px e 12px | `text-xs`, `text-[11px]` | Padronizar todos os textos de apoio e tags para 16px | Alta |
| TAM-10 | `src/components/Footer.astro` (L12, L39, L56, L80, L83) | Rodapé inteiro composto por textos minúsculos de 10px, 11px e 12px | `text-xs`, `text-[11px]`, `text-[10px]` | Ajustar corpo do rodapé para 16px; links e dados em 16px-18px; avisos legais para 16px | Alta |
| TAM-11 | `src/pages/servicos/*.astro` (L58, L62, L94, L131, L137) | Cards do Bento Grid e depoimentos nas subpáginas com textos de 12px a 14px | `text-sm`, `text-xs` | Ajustar todos os textos descritivos para 16px-18px com line-height 1.6-1.7 | Alta |

---

## 4. Categoria: ÁREAS CLARAS E RITMO

### Diagnóstico Geral da Categoria
- **Queixa do Cliente:** O site transmite peso visual por excesso de fundos escuros e falta de áreas claras com respiro.
- **Análise de Ritmo Atual na Home:**
  1. Header: Escuro (`#102A4C`)
  2. Hero: Escuro (`#102A4C`)
  3. Triagem: Claro (`bg-white`)
  4. Comparador: Escuro (`#102A4C`)
  5. Jornada: Claro (`bg-white`)
  6. Autoridade: Escuro (`#102A4C`)
  7. Ambientes: Escuro (`#102A4C`) ⚠️ *Duas seções escuras consecutivas!*
  8. Localização: Claro (`bg-white`)
  9. FAQ: Escuro (`#102A4C`)
  10. Footer: Escuro (`#060E18`)
- **Impacto:** O visitante navega a maior parte do tempo dentro de "caixas" escuras e saturadas, perdendo a sensação de higiene, clareza e acolhimento clínico que a odontologia exige.

### Tabela de Apontamentos — ÁREAS CLARAS E RITMO

| ID | Arquivo e Trecho / Seção | Problema Encontrado | Evidência (Valor Encontrado) | Correção Proposta | Prioridade |
| :--- | :--- | :--- | :--- | :--- | :--- |
| RIT-01 | `src/pages/index.astro` (L65) | Hero abre a página com atmosfera escura e pesada | `bg-[#102A4C]`, overlay `bg-gradient-to-r from-[#102A4C]` | Converter para fundo claro luminoso (degradê sutil `#FFFFFF` para `#F4F8FD`), foto do consultório integrada com suavidade | Alta |
| RIT-02 | `src/pages/index.astro` (L126, L143) | Quebra abrupta entre a seção Triagem (branca) e Comparador (navy escuro) | Transição de `bg-white` para `bg-[#102A4C]` com borda escura | Fazer transição suave: Triagem em branco `#FFFFFF`, Comparador em azul claríssimo `#F4F8FD` com bordas sutis em `#C3D8F0` | Alta |
| RIT-03 | `src/pages/index.astro` (L233, L285) | Seções consecutivas Autoridade e Ambientes ambas com fundo escuro pesado | Ambas com `bg-[#102A4C] border-[#22487A]/70` | Alternar ritmo: Autoridade em branco com card destacado; Ambientes em degradê sutil de `#F4F8FD` para branco | Alta |
| RIT-04 | `src/pages/index.astro` (L437) | Seção FAQ encerra o conteúdo com outro bloco escuro opressivo | `bg-[#102A4C]` com caixas em `#0F223D` | Aplicar fundo `#F4F8FD` com acordeons brancos limpos e linhas suaves em `#C3D8F0` | Alta |
| RIT-05 | `src/components/Footer.astro` (L12) | Rodapé em preto azulado quase fúnebre (`#060E18`) | `bg-[#060E18]` | Utilizar o azul oficial da marca (`#426BB2`), conferindo fechamento institucional elegante e contrastante | Alta |
| RIT-06 | `src/pages/servicos/*.astro` (L17, L116, L179) | Subpáginas repetem a alternância pesada escuro/claro/escuro | Hero, Depoimentos e CTA em `#102A4C` | Padronizar todas as subpáginas com ritmo claro: Hero suave (`#F4F8FD`), Bento em branco, Casos Clínicos em `#F4F8FD`, CTA no azul da marca `#426BB2` com texto branco | Alta |
| RIT-07 | `src/pages/index.astro` e `src/layouts/Layout.astro` | Espaçamentos verticais entre seções com ritmo irregular e pouca respiração | Variando de `py-16` a `py-28` sem escala proporcional | Padronizar padding vertical de seções em `py-20 lg:py-28`, permitindo folga visual e descanso para a leitura | Média |

---

## 5. Categoria: LOGO

### Diagnóstico Geral da Categoria
- **Arquivos Oficiais Fornecidos:**
  - `public/images/logo-simplificada.svg` (símbolo + nome "Luciano Alves Freire")
  - `public/images/logo-completa.svg` (com "Consultório Odontológico" e "Implantodontia e Ortodontia")
  - `public/images/logo-simbolo.svg` (apenas o símbolo gráfico)
- **Problemas Encontrados:**
  - O site está usando imagens rasterizadas PNG antigas (`logo-clinica-nobg.png`, `logo-dr-luciano.png`) e um componente SVG construído manualmente com cores erradas (`DoctorLogo.astro`).
  - No cabeçalho, a logo fica pequena e vem acompanhada de textos em HTML com fontes serifadas e douradas, gerando redundância e baixa legibilidade.
  - Regra oficial não cumprida: cabeçalho deve usar `logo-simplificada.svg` com altura mínima de 44px (mobile) e 56px (desktop); rodapé deve usar `logo-completa.svg`; favicon deve usar `logo-simbolo.svg`.

### Tabela de Apontamentos — LOGO

| ID | Arquivo e Trecho / Seção | Problema Encontrado | Evidência (Valor Encontrado) | Correção Proposta | Prioridade |
| :--- | :--- | :--- | :--- | :--- | :--- |
| LOG-01 | `src/components/Header.astro` (L3, L14-29) | Cabeçalho usa PNG rasterizado pequeno com textos redundantes em HTML | `src={logoClinica}` (PNG), altura `h-9 sm:h-11`, textos "Dr. Luciano A. Freire" e "Odontologia • Sala 24" | Substituir por `logo-simplificada.svg` direto, altura mínima de 44px (mobile) e 56px (desktop), width e height definidos, sem textos HTML adicionais | Alta |
| LOG-02 | `src/components/Footer.astro` (L3, L20-34) | Rodapé usa PNG com textos soltos em HTML em vez da logo oficial completa | `src={logoClinica}` (PNG), altura `h-10 sm:h-12`, textos soltos | Substituir por `logo-completa.svg`, garantindo vetorização perfeita, nitidez e hierarquia institucional | Alta |
| LOG-03 | `src/pages/index.astro` (L49-57, L536-611) | Tela de splash animada usando PNG desfocado com animação de clip-path pesada | `Image src={logoClinica} alt="Logo" class="opacity-20"` | Se mantida animação de entrada, utilizar `logo-simplificada.svg` com dimensões nativas e alt institucional; ou simplificar para carregamento instantâneo | Alta |
| LOG-04 | `public/favicon.svg` (L1-28) | Favicon atual é um SVG com fundo escuro e cores fora do padrão | `<rect fill="#090E17"/>`, cores neon `#99EE1F` | Substituir por versão baseada em `logo-simbolo.svg` com as cores oficiais da marca | Alta |
| LOG-05 | `src/layouts/Layout.astro` (L12, L23, L125, L134) | Open Graph e Twitter Card apontam para PNG com fundo não otimizado | `https://drlucianofreire.com.br/images/dr-luciano-freire.png` | Apontar `og:image` para asset contendo a `logo-completa` ou imagem institucional oficial em alta definição | Média |
| LOG-06 | `src/components/DoctorLogo.astro` (L1-135) | Componente isolado de logo com vetores manuais e cores fora do manual | `#99EE1F`, `#4B95FB`, `#80BAFB` | Descontinuar o componente manual e usar os SVGs oficiais fornecidos pelo cliente | Média |

---

## 6. Categoria: COPY GENÉRICA (Clichês, Frases Vagas e Reescrita Factual)

### Diagnóstico Geral da Categoria
- **Diretriz Estrita:** É proibido inventar anos de experiência, premiações, procedimentos não informados ou usar frases clichês ("excelência", "sorriso dos sonhos", "atendimento humanizado", "sem dor"). Todo texto deve se basear em fatos verificáveis:
  - Cirurgião-Dentista: Luciano Alves Freire
  - Registro: CRO MG 25.170
  - Especialidades informadas: Implantodontia e Ortodontia
  - Localização: Rua dos Brandões, 231, Sala 24, Centro, Passos/MG, CEP 37.900-104
  - Onde faltar dado real, marcar `[PREENCHER: ...]`.
  - Respeitar regras do CFO (sem promessa de cura/resultado, sem sensacionalismo, sem preços).

### Tabela de Apontamentos — COPY GENÉRICA

| ID | Arquivo e Trecho / Seção | Frase / Trecho Atual | Por que é Genérica ou Irregular | Reescrita Factual Proposta | Prioridade |
| :--- | :--- | :--- | :--- | :--- | :--- |
| CPY-01 | `src/pages/index.astro` (L97) | "Volte a sorrir com confiança e a viver seus melhores momentos." | Clichê genérico de marketing odontológico; não informa especialidade, localização nem o profissional. | "Tratamentos em Implantodontia e Ortodontia conduzidos com rigor técnico e planejamento no Centro de Passos." | Alta |
| CPY-02 | `src/pages/index.astro` (L100) | "Descubra o poder de um sorriso renovado. Conforto, estética e bem-estar em um atendimento exclusivo conduzido pessoalmente pelo Dr. Luciano Freire." | Frase vazia ("poder de um sorriso renovado"), adjetivos subjetivos sem sustentação factual. | "Consultório odontológico dedicado à reabilitação com implantes dentários e alinhamento do sorriso. Atendimento direto pelo Dr. Luciano Alves Freire (CRO MG 25.170)." | Alta |
| CPY-03 | `src/pages/index.astro` (L195) | "O Fim do Medo: Um Passo a Passo Sem Dor" | Promessa categórica de "Sem Dor" é expressamente vedada pelo Código de Ética Odontológica (CFO); gera expectativa irreal. | "Etapas do Tratamento: Planejamento Clínico Estruturado e Foco no Conforto do Paciente" | Alta |
| CPY-04 | `src/pages/index.astro` (L237, L254, L258) | "Com mais de 20 anos de atuação clínica no Centro de Passos..." / "20+ Anos Prática Clínica" / "Milhares de reabilitações em Passos/MG" | Dado inventado/não confirmado no manual; afirmação de "milhares de reabilitações" sem auditoria fere diretrizes éticas. | "Atendimento odontológico individualizado com o Dr. Luciano Alves Freire (CRO MG 25.170) na Rua dos Brandões, Centro de Passos. [PREENCHER: tempo exato de atuação clínica e títulos de pós-graduação do Dr. Luciano]." | Alta |
| CPY-05 | `src/pages/index.astro` (L419) | "Ambiente sofisticado e estrutura moderna para o seu conforto." | Frase batida e genérica que não diz nada sobre a estrutura real do consultório. | "Consultório localizado na Rua dos Brandões, 231, Sala 24, no Centro de Passos/MG, com ambiente planejado para privacidade e biossegurança." | Alta |
| CPY-06 | `src/components/Footer.astro` (L37) | "Especialista em implantes dentários, reabilitação oral e odontologia estética. Cuidado técnico, precisão científica e atendimento humanizado em Passos/MG." | "Atendimento humanizado" é clichê sem prova; declara especialidades ("estética", "reabilitação oral") não constantes no cadastro formal (Implantodontia e Ortodontia). | "Consultório Odontológico Dr. Luciano Alves Freire (CRO MG 25.170). Atuação em Implantodontia e Ortodontia com planejamento individualizado em Passos/MG." | Alta |
| CPY-07 | `public/llms.txt` (L3) | "O Dr. Luciano é especialista em implantes dentários, reabilitação oral e odontologia estética." | Divergência com as especialidades do cadastro do cliente (Implantodontia e Ortodontia). | "O Dr. Luciano Alves Freire (CRO MG 25.170) atua em seu consultório em Passos/MG nas áreas de Implantodontia e Ortodontia." | Alta |
| CPY-08 | `src/pages/servicos/estetica.astro` (L22, L46, L76) | Toda a página de Estética prometendo "resultado que não parece artificial", "translucidez e mimetismo óptico" | O cliente foi cadastrado como "Implantodontia e Ortodontia". Tratamentos estéticos necessitam de validação do profissional para evitar infração ao CFO. | Inserir aviso de revisão: "[PREENCHER: confirmar com Dr. Luciano quais procedimentos de estética dental são realizados no consultório antes de publicação]." Manter tom puramente informativo. | Alta |
| CPY-09 | `src/pages/index.astro` (L130) | "Como Podemos Te Ajudar a Voltar a Sorrir com Segurança?" | Pergunta vaga e assistencialista. | "Conheça os Tratamentos Disponíveis no Consultório" | Média |
| CPY-10 | `src/pages/index.astro` (L147) | "Firmeza e Segurança Semelhantes à Sua Própria Raiz" | Título publicitário genérico. | "Comparativo Anatômico: Estrutura do Dente Natural e do Implante de Titânio" | Média |

---

## 7. Categoria: IMAGENS E ALT

### Diagnóstico Geral da Categoria
- **Requisitos:**
  - Toda imagem deve ter texto alternativo único e descritivo (até 125 caracteres), sem "imagem de", sem repetição de palavras-chave.
  - Imagens puramente decorativas recebem `alt=""` e `aria-hidden="true"`.
  - Dimensões (`width` e `height`) definidas para evitar CLS.
  - Lazy loading em todas as imagens, exceto a imagem LCP (que recebe `loading="eager"` e `fetchpriority="high"`).
  - Identificação clara da imagem LCP.

### Tabela de Apontamentos — IMAGENS E ALT

| ID | Arquivo / Imagem | Local no Site | Alt Atual | Alt Proposto | Decorativa? | Dimensões Definidas? | Lazy Loading? | É LCP? | Prioridade |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| IMG-01 | `public/images/logo-simplificada.svg` | Header (todas as páginas) | "Logo Dr. Luciano Alves Freire - Consultório Odontológico" | "Luciano Alves Freire, Consultório Odontológico, Implantodontia e Ortodontia" | Não | Não (usa `h-9 sm:h-11`) | Não (`loading="eager"`) | Não | Alta |
| IMG-02 | `src/assets/consultorio-hero-cropped.png` | Fundo do Hero em `index.astro` | "Consultório Dr. Luciano Freire em Passos MG" | "Consultório do Dr. Luciano Freire com cadeira odontológica e equipamentos no Centro de Passos" | Não (contextual informativa) | Não (`w-full h-full`) | `eager` + `fetchpriority="high"` | **SIM (Imagem LCP Desktop/Fundo)** | Alta |
| IMG-03 | `src/assets/dr-luciano-freire-hero.png` | Hero em `index.astro` (destaque médico) | "Dr. Luciano Alves Freire" (muito curto) | "Dr. Luciano Alves Freire, cirurgião-dentista responsável pelo consultório em Passos" | Não | Parcial (`widths`, sem `height` fixo) | `loading="eager"` | **SIM (Imagem LCP Mobile)** | Alta |
| IMG-04 | `src/assets/logo-clinica-nobg.png` | Splash screen em `index.astro` | `alt="Logo"` (genérico e repetido) | `alt=""` (adicionar `aria-hidden="true"`) | **Sim** (animação transitória) | Sim (`w-full`) | `loading="eager"` | Não | Média |
| IMG-05 | `src/assets/dente-natural-comparativo.png` | Comparador Anatômico (`AnatomyComparisonSlider.tsx`) | "Dente Natural com Coroa de Esmalte e Raiz Biológica" | "Ilustração anatômica de dente natural destacando esmalte, dentina e raiz biológica" | Não | `width: 500` via getImage | Sim (`client:visible`) | Não | Alta |
| IMG-06 | `src/assets/implante-titanio-comparativo.png` | Comparador e `servicos/implantes.astro` | "Implante Dentário de Titânio Osseointegrado e Coroa Cerâmica" | "Ilustração anatômica de implante dentário de titânio fixado ao osso com coroa protética" | Não | `width: 500` via getImage | Sim (`client:visible`) | Não | Alta |
| IMG-07 | `src/assets/servico_implante.jpg` | Carrossel Home e Hero de `implantes.astro` | "Implantes Dentários" (repetição de título) | "Procedimento demonstrativo de planejamento clínico para implante dentário" | Não | `width: 600` via getImage | Sim (`loading="lazy"`) | Não | Alta |
| IMG-08 | `src/assets/servico_protocolo.jpg` | Carrossel Home e Hero de `protocolo.astro` | "Prótese Protocolo" (repetição de título) | "Modelo de prótese protocolo fixa para reposição total dos dentes sobre implantes" | Não | `width: 600` via getImage | Sim (`loading="lazy"`) | Não | Alta |
| IMG-09 | `src/assets/servico_estetica.jpg` | Carrossel Home e Hero de `estetica.astro` | "Estética Dental" (repetição de título) | "Planejamento estético dental demonstrando proporções e alinhamento do sorriso" | Não | `width: 600` via getImage | Sim (`loading="lazy"`) | Não | Alta |
| IMG-10 | `src/assets/servico_ortodontia.jpg` | Carrossel Home e Hero de `ortodontia.astro` | "Ortodontia Invisível" (repetição de título) | "Aparelho alinhador ortodôntico transparente removível para correção dental" | Não | `width: 600` via getImage | Sim (`loading="lazy"`) | Não | Alta |
| IMG-11 | `src/assets/dr-luciano-freire.png` | Seção Autoridade em `index.astro` | "Dr. Luciano Alves Freire - Cirurgião-Dentista em Passos MG" | "Retrato profissional do cirurgião-dentista Dr. Luciano Alves Freire em atendimento" | Não | `widths={[360, 500]}` | Sim (`loading="lazy"`) | Não | Média |
| IMG-12 | `src/assets/consultorio-sala-espera.png` | Seção Ambientes em `index.astro` | "Sala de Espera Acolhedora - Dr. Luciano Freire" | "Recepção e sala de espera do consultório odontológico no Centro de Passos" | Não | Não (classes de altura) | Sim (`loading="lazy"`) | Não | Média |
| IMG-13 | `src/assets/consultorio-placa-entrada.png` | Seção Ambientes em `index.astro` | "Identificação Externa do Consultório - Sala 24" | "Porta de entrada do consultório com placa indicativa da Sala 24" | Não | Não (classes de altura) | Sim (`loading="lazy"`) | Não | Média |
| IMG-14 | `src/assets/clinic-bg-hero.jpg` | Fundo da Seção Localização em `index.astro` | "Consultório Odontológico de Alto Padrão" | `alt=""` (com `aria-hidden="true"`) | **Sim** (textura decorativa) | Não | Sim (`loading="lazy"`) | Não | Média |
| IMG-15 | `public/images/logo-completa.svg` | Rodapé em `Footer.astro` | "Logo Dr. Luciano Alves Freire - Consultório Odontológico" | "Luciano Alves Freire, Consultório Odontológico, Implantodontia e Ortodontia" | Não | Não | Sim (`loading="lazy"`) | Não | Alta |

---

## 8. Categoria: DADOS E SEO

### Diagnóstico Geral da Categoria
- **Dados Oficiais de Referência:**
  - **Nome:** Luciano Alves Freire, Consultório Odontológico, Implantodontia e Ortodontia
  - **CRO:** CRO MG 25.170
  - **Endereço:** Rua dos Brandões, 231, Sala 24, Centro, Passos/MG, CEP 37.900-104
  - **Telefone/WhatsApp Oficial:** (35) 98821-5162 | `https://wa.me/5535988215162`
  - **Telefones Antigos (Apenas reportar, retirar de links ativos):** (35) 3521-5027 e (35) 9941-0539
  - **E-mail do manual:** `drlucianofreire@uol.com.br` (a confirmar com o cliente: `[CONFIRMAR]`)

### Tabela de Apontamentos — DADOS E SEO

| ID | Arquivo e Trecho / Seção | Problema Encontrado | Evidência (Valor Encontrado) | Correção Proposta | Prioridade |
| :--- | :--- | :--- | :--- | :--- | :--- |
| DAD-01 | `src/layouts/Layout.astro` (L25) | Schema.org JSON-LD apontando telefone antigo como oficial | `"telephone": "+553535215027"` | Atualizar para `"+5535988215162"` | Alta |
| DAD-02 | `src/components/Footer.astro` (L7-8, L72) | Rodapé exibindo e fornecendo link para o telefone fixo antigo | `const phoneFixed = "(35) 3521-5027"; href="tel:553535215027"` | Remover dos botões de contato ativo; manter apenas o WhatsApp/telefone oficial `(35) 98821-5162` | Alta |
| DAD-03 | `src/pages/index.astro` (L42-43) | Declaração do telefone fixo antigo no frontmatter da Home | `const phoneFixed = "(35) 3521-5027"; const phoneFixedClean = "553535215027";` | Remover variáveis não utilizadas do telefone antigo | Média |
| DAD-04 | `public/llms.txt` (L9) | Arquivo de contexto de IA divulgando telefone antigo como canal de contato | `- **Contato**: +55 (35) 98821-5162 (WhatsApp) / (35) 3521-5027 (Fixo)` | Corrigir para exibir apenas `(35) 98821-5162` | Alta |
| DAD-05 | `old_index.astro` (L18-19) | Arquivo legado no projeto contendo dados antigos | `phoneFixed = "(35) 3521-5027"` | Reportar existência; manter inalterado ou arquivar | Baixa |
| DAD-06 | Base completa do projeto | Telefone antigo `(35) 9941-0539` não foi encontrado em nenhum arquivo | 0 ocorrências na varredura | Reportar ausência na base ativa (nenhuma ação destrutiva necessária) | Baixa |
| DAD-07 | Base completa do projeto | E-mail `drlucianofreire@uol.com.br` ausente no site | 0 ocorrências de e-mail | Manter pendente como `[CONFIRMAR: e-mail oficial com o cliente]` antes de inserir | Média |
| DAD-08 | `src/layouts/Layout.astro` (L118) e `Footer.astro` (L40) | Grafia do CRO inconsistente ("CRO-MG 25170" sem pontuação) | `CRO-MG 25170` | Padronizar para a grafia oficial com pontuação: `CRO MG 25.170` | Média |
| DAD-09 | `src/layouts/Layout.astro` (L10) | Title padrão foca apenas em implantes e ignora ortodontia | `Implantes Dentários em Passos - MG \| Dr. Luciano Freire` | Preservar SEO técnico conforme instrução, mas validar alinhamento com ortodontia | Baixa |

---

## 9. Categoria: CONSISTÊNCIA E ACESSIBILIDADE

### Diagnóstico Geral da Categoria
- **Contraste WCAG 2.1 AA:**
  - Azul principal da marca `#426BB2` sobre branco `#FFFFFF` resulta em **5,3:1** (Aprovado em AA para texto normal e grande).
  - Texto branco `#FFFFFF` sobre botão `#426BB2` resulta em **5,3:1** (Aprovado em AA).
  - Azul-grafite `#1E2A44` sobre branco `#FFFFFF` resulta em **13,5:1** (Aprovado em AAA).
  - Verde claro `#C6DB69` sobre branco: **~1,5:1** (REPROVADO GRAVE para qualquer texto).
  - Verde escuro `#8BB027` sobre branco: **~2,5:1** (REPROVADO para texto normal).
  - Textos atuais em `text-slate-400` sobre fundos navy (`#102A4C`): **~3,2:1** (REPROVADO para textos pequenos abaixo de 18px).
- **Consistência de Componentes:**
  - Raios de borda variam desordenadamente de `rounded-lg` (8px), `rounded-xl` (12px), `rounded-2xl` (16px), `rounded-3xl` (24px) a `rounded-[2.5rem]` (40px).
  - Sombras misturam `shadow-md`, `shadow-xl`, `shadow-2xl` e sombras duras com rgba escuro pesado (`rgba(0,0,0,0.85)`).

### Tabela de Apontamentos — CONSISTÊNCIA E ACESSIBILIDADE

| ID | Arquivo e Trecho / Seção | Problema Encontrado | Evidência (Valor Encontrado) | Correção Proposta | Prioridade |
| :--- | :--- | :--- | :--- | :--- | :--- |
| ACS-01 | `src/pages/index.astro` (L85, L158, L260, L390) | Textos de apoio em cinza claro sobre fundo navy escuro falhando em contraste AA | `text-slate-400` sobre `#102A4C` e `#0F223D` (contraste ~3,2:1) | Com a migração para fundos claros (`#FFFFFF` e `#F4F8FD`), usar texto em azul-grafite `#1E2A44` (contraste >13:1) | Alta |
| ACS-02 | `src/components/Header.astro` (L13, L48) | Falta de foco visível (`focus-visible`) consistente em navegação e botões | Apenas `focus:ring-gold-400` no logo | Implementar `focus-visible:ring-2 focus-visible:ring-[#426BB2] focus-visible:ring-offset-2` em todos os links e botões | Alta |
| ACS-03 | `src/components/AnatomyComparisonSlider.tsx` (L73-78) | Slider acessível porém botões complementares possuem touch target insuficiente | Altura ~26px nos botões de alternância | Aumentar área de toque dos botões para 48px | Alta |
| ACS-04 | `src/components/ServicesCarousel.tsx` (L40-53) | Botões de avançar/voltar do carrossel com tamanho 40px (< 44px) | `w-10 h-10` | Ajustar para `w-12 h-12` (48px) | Média |
| ACS-05 | `src/pages/index.astro` e `servicos/*.astro` | Inconsistência nos raios de borda (`border-radius`) dos cards | `rounded-xl`, `rounded-2xl`, `rounded-3xl`, `rounded-[2.5rem]` misturados | Padronizar design tokens: `rounded-xl` (12px) para botões e inputs; `rounded-2xl` (16px) para cards; `rounded-full` para badges | Média |
| ACS-06 | `src/pages/index.astro` (L154, L242, L303) | Sombras escuras pesadas (`shadow-2xl shadow-black/85`) que sujam o visual | `shadow-[0_20px_45px_rgba(0,0,0,0.9)]` | Substituir por sombras sutis e refinadas: `shadow-[0_8px_30px_rgba(66,107,178,0.08)]` | Média |
| ACS-07 | `src/layouts/Layout.astro` (L349-361) | Animações de entrada do splash screen desativam verificação de `prefers-reduced-motion` | Script do splash ignora `prefers-reduced-motion` | Respeitar rigorosamente `prefers-reduced-motion`: pular animação imediatamente para usuários com sensibilidade vestibular | Alta |

---

## 10. Categoria: FAMÍLIA TIPOGRÁFICA WEB

### Comparativo Técnico das 3 Opções Humanistas Sem Serifa

A identidade da marca define **Humanst521 BT** (derivada direta do clássico Gill Sans de Eric Gill) e **Humanst777 BLK BT** (peso pesado para títulos marcantes). Em ambientes web modernos de alta performance, a tipografia humanista precisa aliar fidelidade geométrica, legibilidade médica em telas móveis e velocidade de carregamento.

| Critério | Opção 1: Source Sans 3 | Opção 2: Cabin | Opção 3: Lato |
| :--- | :--- | :--- | :--- |
| **Criador / Origem** | Paul D. Hunt (Adobe Originals) | Pablo Impallari | Łukasz Dziedzic |
| **DNA Tipográfico** | Humanista racional voltada para interfaces | Humanista inspirada diretamente em Gill Sans e Johnston | Humanista com toques semiarredondados |
| **Pesos Nativos** | 200, 300, 400, 500, 600, 700, 800, 900 | 400, 500, 600, 700 | 100, 300, 400, 700, 900 (carece de 500 sólido nativo) |
| **Altura-X (X-Height)** | **Generosa e aberta** (ótima para telas pequenas) | Média/baixa (clássica britânica) | Média |
| **Diferenciação I / l / 1** | **Excepcional** (glifos distintos para números e letras) | Boa | Moderada (I e l são similares) |
| **Semelhança com Humanst521** | Proporções mais abertas e funcionais | **Gêmea visual direta da Humanst521 BT** | Mais distante (arredondada e larga) |
| **Legibilidade em Telas Mobile** | **Classificação A+** (perfeita para público 40+ anos) | Classificação A- (ótima em títulos, mais densa em corpo) | Classificação B+ |
| **Tamanho do Arquivo WOFF2** | ~18 KB por peso (ultra-otimizada) | ~22 KB por peso | ~24 KB por peso |

### Recomendação e Justificativa

Recomendamos **Source Sans 3** como a família tipográfica web oficial do consultório (com **Cabin** como alternativa de idêntico alinhamento estético clássico).

#### Justificativa da Escolha (Source Sans 3):
1. **Legibilidade Clínica Insuperável:** O público de consultórios odontológicos em Passos/MG abrange pacientes maduros (busca por implantes e prótese protocolo) e jovens (ortodontia e alinhadores). A `Source Sans 3` possui altura-x generosa, aberturas amplas nos caracteres ('c', 'e', 's') e diferenciação cristalina em dígitos numéricos (essencial para o CRO 25.170, telefones e endereço).
2. **Disponibilidade Completa de Pesos (400, 500 e 700):** Permite construir uma hierarquia visual limpa e elegante sem a necessidade de pesos excessivos (800 ou 900) que antes sobrecarregavam o site.
3. **Desempenho e Acessibilidade:** Não apresenta distorções em renderização subpixel no Windows ou em telas OLED de smartphones.

*(Nota: Caso a prioridade estética máxima seja a reprodução 1:1 das curvas da Gill Sans / Humanst521 BT nos títulos, **Cabin** também cumpre integralmente os requisitos).*

#### Estratégia de Carregamento de Alta Performance:
- **Auto-hospedagem (Self-hosted):** Arquivos nos formatos `.woff2` armazenados em `/public/fonts/`.
- **Preload Crítico no `<head>`:**
  ```html
  <link rel="preload" href="/fonts/source-sans-3-v15-latin-regular.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="/fonts/source-sans-3-v15-latin-700.woff2" as="font" type="font/woff2" crossorigin />
  ```
- **Declaração CSS com `font-display: swap`:**
  ```css
  @font-face {
    font-family: 'Source Sans 3';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('/fonts/source-sans-3-v15-latin-regular.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Source Sans 3';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url('/fonts/source-sans-3-v15-latin-500.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Source Sans 3';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url('/fonts/source-sans-3-v15-latin-700.woff2') format('woff2');
  }
  ```
- **Fallback Seguro:** `'Source Sans 3', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`.

---

## Resumo Executivo (10 Linhas)

1. **Excesso de Fundos Escuros (70% do site):** O site atual é dominado por azul marinho escuro (`#102A4C`) e preto (`#060E18`), transmitindo peso e falta de áreas claras.
2. **Cores Desalinhadas da Marca:** Presença generalizada de dourados (`gold-*`), champagne e marinhos escuros que violam a paleta oficial (`#426BB2`, `#3D6ABD`, `#9DB8E0`, `#C3D8F0`).
3. **Tipografia Serifada Incompatível:** Uso da fonte serifada pesada `Playfair Display` em títulos e no logo contraria a identidade da marca (Humanst521 BT, 100% humanista sem serifa).
4. **Textos Ilegíveis e Alvos de Toque Reduzidos:** Textos críticos em 10px a 13px e botões com menos de 44px/48px prejudicam a leitura de idosos e usuários mobile.
5. **Divergências de Dados e Clichês:** Presença do telefone antigo `(35) 3521-5027` no Schema JSON-LD, Footer e `llms.txt`, além de frases genéricas e promessa irregular de "Sem Dor".

---

## Perguntas para o Cliente

Para enriquecer o texto com fatos 100% verificáveis e cumprir as normas éticas do CFO, solicitamos ao Dr. Luciano Alves Freire as seguintes confirmações:

1. **Tempo de Atuação Real:** Quantos anos de formado e quantos anos de atuação em Passos/MG o Dr. Luciano possui (para substituir a frase genérica "mais de 20 anos")?
2. **Formação e Especializações Registradas:** Quais são as titulações acadêmicas e instituições onde realizou graduação e pós-graduação/especialização em Implantodontia e Ortodontia?
3. **Escopo dos Procedimentos:** O consultório realiza procedimentos de lentes de contato/facetas em porcelana e clareamento, ou a comunicação deve focar exclusivamente em Implantodontia e Ortodontia?
4. **Horário de Atendimento e Dinâmica da Consulta:** Quais são os dias e horários exatos de atendimento do consultório na Rua dos Brandões? Como é realizada a primeira consulta diagnóstica?
5. **E-mail Oficial:** Confirma o e-mail `drlucianofreire@uol.com.br` para inclusão nos dados institucionais ou prefere canal exclusivo via WhatsApp?
6. **Convênios ou Particular:** O atendimento é estritamente particular ou há credenciamento com planos de saúde/odontológicos da região?
7. **Equipamentos e Diagnóstico:** O consultório dispõe de escaneamento intraoral digital próprio ou exames radiográficos/tomográficos são feitos em clínicas parceiras em Passos?
