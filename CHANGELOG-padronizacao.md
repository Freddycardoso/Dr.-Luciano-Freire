# CHANGELOG: Padronização Visual, Acessibilidade e Identidade da Marca

**Projeto:** Website Oficial do Consultório Odontológico Dr. Luciano Alves Freire  
**Responsável Técnico:** Front-End Senior, Direção de Arte e Auditoria de Acessibilidade & SEO  
**Data:** 11/10/2026  
**Localização:** Passos / MG  
**Registro Profissional:** Cirurgião-Dentista • CRO MG 25.170  

---

## 1. Resumo Executivo da Intervenção

O redesign e a padronização do website foram executados para sanar integralmente os apontamentos e insatisfações do cliente com a versão anterior do site, que apresentava:
1. **Fundo excessivamente escuro e opressivo** (`#102A4C`, `#0A192F`, azul escuro maciço em todas as seções).
2. **Tipografia serifada inadequada** (`Playfair Display`), que conferia um aspecto pesado, datado e distante da identidade clean da odontologia contemporânea.
3. **Cores fora do manual da marca**, como dourado champanhe artificial e azuis de saturação não prevista.
4. **Logotipo congestionado no cabeçalho**, acompanhado de textos HTML redundantes ao lado da marca.
5. **Textos com fontes diminutas (< 16px) e botões táteis abaixo de 48px**, prejudicando a acessibilidade de pacientes no celular.
6. **Alegações incompatíveis com as normas do CFO** (como promessas de "sem dor").

Todas as alterações foram realizadas preservando rigorosamente o ecossistema técnico existente (Astro + Tailwind CSS), a estrutura de SEO técnico (meta tags, Schema.org JSON-LD, sitemap, robots, llms.txt) e mantendo a integridade do código sem dependências redundantes.

---

## 2. Sistema de Cores e Tokens Oficiais do Manual da Marca

Foi implementada uma paleta harmônica baseada em superfícies claras e arejadas, com o azul e o verde da marca atuando com elegância e alto contraste (WCAG 2.1 AA):

| Token / Variável | Código Hexadecimal | Finalidade no Design System | Contraste / Validação de Acessibilidade |
| :--- | :--- | :--- | :--- |
| `brand-blue` | `#426BB2` | Azul oficial da marca; títulos principais (H1), botões de estado ativo, ícones chave e bordas focais. | 5.2:1 em fundo branco (Aprovado AA para texto normal e grande). |
| `brand-deep` | `#3D6ABD` | Variação para estados de hover e transições interativas. | 5.5:1 em fundo branco (Aprovado AA). |
| `brand-light` | `#9DB8E0` | Azul claro para linhas divisórias sutis, orbes de fundo e realces decorativos. | Uso restrito a elementos gráficos e divisores (nunca texto sobre branco). |
| `brand-pale` | `#C3D8F0` | Azul pálido para bordas de cards, linhas de timeline e fundos de badges. | Uso restrito a bordas e superfícies suaves. |
| `brand-dark` | `#1E2A44` | Neutro escuro institucional para títulos de cards (H2, H3), textos de ênfase e corpo. | 13.8:1 em fundo branco (Aprovado AAA). |
| `accent-green` | `#8BB027` | Verde oficial do símbolo; dots indicadores, marcadores de status e acentos gráficos. | 2.5:1 sobre branco — **Proibido para texto**; usado exclusivamente em ícones e bullets gráficos. |
| `accent-lime` | `#C6DB69` | Verde claro complementar para gradientes de realce. | Uso gráfico decorativo. |
| `surface` | `#FFFFFF` | Branco puro para fundo de cards principais e seções de respiro visual. | Superfície primária da nova identidade. |
| `surface-subtle` | `#F4F8FD` | Superfície suave para alternância rítmica entre seções (Hero, Comparador, Autoridade, FAQ). | Garante contraste elegante e elimina a sensação de "site escuro". |
| `surface-soft` | `#E6EFFA` | Superfície para pílulas de badges, tags de autoridade e estados secundários. | Contraste superior a 11:1 com `brand-dark`. |
| `whatsapp` | `#25D366` | Verde oficial do WhatsApp para ações diretas de agendamento e botão flutuante. | Botões com texto em `#0A192F` / `slate-950` (> 9:1, Aprovado AAA). |

---

## 3. Tipografia: Eliminação de Serifa e Adoção da Source Sans 3

Conforme diretriz do cliente, a família serifada `Playfair Display` foi **completamente expurgada** de todo o código-fonte (0 ocorrências em todo o projeto).

- **Família Tipográfica Única:** **Source Sans 3** (Humanist Sans-Serif moderna, altamente legível em telas médicas e celulares).
- **Pesos Carregados:** 400 (Regular para corpo), 500/600 (Semibold para interfaces e botões), 700 (Bold para títulos e autoridade).
- **Escala de Texto Fluida (Fluid Clamp):**
  - **Títulos H1:** `clamp(2rem, 4vw + 1rem, 2.75rem)` (32px a 44px), peso 700, cor `#426BB2`.
  - **Títulos H2:** `clamp(1.625rem, 3vw + 0.5rem, 2.125rem)` (26px a 34px), peso 700, cor `#1E2A44`.
  - **Títulos H3:** `clamp(1.25rem, 2vw + 0.25rem, 1.5rem)` (20px a 24px), peso 700.
  - **Texto Corrido / Parágrafos:** `clamp(1.125rem, 0.5vw + 1rem, 1.25rem)` (18px a 20px), altura de linha 1.6 a 1.7, largura máxima de leitura limitada a `65ch`.
  - **Tamanho Mínimo Absoluto:** **Nenhum texto do site possui tamanho inferior a 16px** (inclusive legendas, cards, rodapé e botões).

---

## 4. Header, Footer e Logotipos Institucionais

### Header (`src/components/Header.astro`)
- **Fundo:** Convertido de azul escuro maciço para branco puro com leve transparência vítrea (`bg-white/95 backdrop-blur-md border-b border-brand-pale`).
- **Logotipo:** Substituído o logo genérico pelo arquivo oficial `public/images/logo-simplificada.svg`.
  - Altura exata: `44px` no celular e `56px` no desktop.
  - Link direto para a página inicial (`/`).
  - **Eliminação de poluição visual:** Removido o texto em HTML que ficava ao lado do logo ("Dr. Luciano Alves Freire / Cirurgião-Dentista"), permitindo que o logo oficial respire sozinho.
- **Menu de Navegação:** Links em tom `brand-dark` (`#1E2A44`), tamanho `16px`, com indicador hover em azul oficial.
- **Botão CTA WhatsApp:** Altura tátil >= `48px`, texto em `18px`, com foco visível.

### Footer (`src/components/Footer.astro`)
- **Fundo:** Sólido e elegante em Brand Blue (`#426BB2`), contrastando com texto em branco (`#FFFFFF`).
- **Logotipo:** Inserção do logotipo completo `public/images/logo-completa.svg` dentro de um card branco protetor com cantos arredondados, garantindo legibilidade perfeita de todos os elementos gráficos e da tipografia institucional.
- **Dados Padronizados:**
  - Telefone / WhatsApp: (35) 98821-5162
  - E-mail confirmado: drlucianofreire@uol.com.br
  - Endereço: Rua dos Brandões, 231, Sala 24, Centro, Passos/MG, CEP 37.900-104
  - Horário: Segunda a sexta-feira, das 13h30 às 18h30 (mediante agendamento prévio)
  - Registro Ético: Cirurgião-Dentista • CRO MG 25.170

---

## 5. Telefonia e Comunicação: Relatório de Telefones

Em estrita obediência às orientações do projeto:
- **Telefone Oficial de Atendimento e WhatsApp:** `(35) 98821-5162` (link: `https://wa.me/5535988215162`). Este é agora o **único número ativo** em botões, links `tel:`, Schema.org e rodapé.
- **Telefone Fixo Antigo `(35) 3521-5027`:**
  - **Relatório de Remoção:** O número foi desvinculado de todos os botões de ação e links ativos para evitar que pacientes liguem para um canal secundário/inativo.
  - **Histórico:** Registrado formalmente neste changelog e no documento de auditoria para conhecimento do cliente.
- **Telefone Antigo `(35) 9941-0539`:**
  - Foi auditado em todo o repositório e **não constava** no código ativo.
- **E-mail do Consultório:** `drlucianofreire@uol.com.br` integrado ao Schema.org, rodapé e `llms.txt`.

---

## 6. Acessibilidade e Experiência do Paciente (WCAG 2.1 AA)

1. **Alvos de Toque (Touch Targets):**
   - Todos os botões interativos do site (WhatsApp no Hero, navegação do carrossel de serviços, abas rápidas do comparador anatômico, acordeão do FAQ e botão flutuante) possuem área mínima de clique de **48x48px**.
2. **Textos Alternativos (Alt Text):**
   - 100% das imagens possuem textos alternativos descritivos e contextualizados com a cidade de Passos/MG e o número do CRO, catalogados no arquivo `alt-text.md`.
3. **Imagens LCP e Desempenho:**
   - Imagens prioritárias do Hero (`consultorio-hero-cropped.png` e `dr-luciano-freire-hero.png`) com `loading="eager"` e `fetchpriority="high"`. Demais imagens com `loading="lazy"` e dimensões declaradas para prevenção de Cumulative Layout Shift (CLS).
4. **Foco e Teclado:**
   - Indicadores visíveis de foco (`focus:ring-2 focus:ring-brand-blue`) em todos os elementos interativos.

---

## 7. Conformidade Ética com o CFO (Conselho Federal de Odontologia)

Foram corrigidos e alinhados todos os textos que feriam o Código de Ética Odontológica:
- **Promessas de "Sem Dor":**
  - Anterior: *"O Fim do Medo: Um Passo a Passo Sem Dor"*, *"Cirurgia Guiada e Sem Dor"*.
  - **Atualizado para:** *"Etapas do Tratamento: Planejamento Seguro e Foco no Conforto"*, *"Procedimento Guiado com Máximo Cuidado e Anestesia Moderna"*.
- **Experiência Clínica Factual:**
  - Fatos confirmados em áudio pelo próprio Dr. Luciano: **mais de 21 anos de prática clínica** ininterrupta no Centro de Passos. Substituído o antigo número genérico *"20+ anos / milhares de reabilitações"*.
- **Exames Radiológicos e Tomografia 3D:**
  - Ajustado para deixar claro que os exames diagnósticos de imagem de alta complexidade são realizados em parceria com centros radiológicos especializados de Passos.

---

## 8. Subpáginas de Serviços Padronizadas

As 4 páginas de especialidades em `src/pages/servicos/` foram reformuladas do design escuro para o design system claro e fluido:

1. **`estetica.astro` (Estética Dental e Clareamento):**
   - Hero com fundo claro, H1 em `#426BB2`, descrição de facetas e lentes em cerâmica pura.
   - Bento grid e diferenciais técnicos em cartões brancos/suaves.
   - Depoimentos reais de pacientes do Google com estrelas em tom azul da marca.
2. **`implantes.astro` (Implantes Dentários):**
   - Hero claro, explicação biomecânica sobre osseointegração e fixação no osso maxilar/mandibular.
   - Remoção do fundo escuro `#102A4C` que envolvia a imagem do implante.
   - Botões de agendamento no WhatsApp com área de toque ampliada.
3. **`protocolo.astro` (Prótese Protocolo Fixo):**
   - Foco na substituição da dentadura móvel por dentes 100% fixos sobre implantes.
   - Destaque ao benefício do céu da boca desimpedido e restauração do suporte dos lábios e bochechas.
4. **`ortodontia.astro` (Ortodontia e Alinhadores Transparentes):**
   - Comunicação clara sobre a discrição dos alinhadores, facilidade de higiene bucal e previsibilidade digital.
   - Depoimentos de pacientes e CTA final para agendamento.

---

## 9. Arquivos Criados e Atualizados

- `tailwind.config.mjs`: Inclusão dos tokens oficiais `brand` (`blue`, `deep`, `light`, `pale`, `dark`), `accent` (`green`, `lime`), `surface` (`DEFAULT`, `subtle`, `soft`), sombras suaves `card` e fontes `Source Sans 3`.
- `src/layouts/Layout.astro`: Schema.org JSON-LD atualizado, meta tags, Google Fonts Source Sans 3, classes fluidas e regras de acessibilidade.
- `src/components/Header.astro`: Cabeçalho claro, `logo-simplificada.svg`, navegação acessível e CTA destacado.
- `src/components/Footer.astro`: Rodapé sólido em Brand Blue com `logo-completa.svg`, contatos unificados e aviso legal.
- `src/components/AnatomyComparisonSlider.tsx`: Comparador anatômico em superfície clara, divisor em Brand Blue, alças de toque com 48px e botões de atalho ampliados.
- `src/components/ServicesCarousel.tsx`: Carrossel com botões de 48px, tipografia Source Sans 3 e cards brancos com sombra sutil.
- `src/components/PatientSituationNavigator.tsx`: Navegador clínico atualizado para a paleta de superfícies claras e botões acessíveis.
- `src/components/SurgicalPathwayTimeline.tsx`: Remoção completa de fontes serifadas.
- `src/pages/index.astro`: Página inicial reconstruída em estética clara e sofisticada, com fotos reais do consultório, H1 fluido, etapas do tratamento éticas e FAQ acessível.
- `src/pages/servicos/estetica.astro`: Subpágina em design system claro.
- `src/pages/servicos/implantes.astro`: Subpágina em design system claro.
- `src/pages/servicos/protocolo.astro`: Subpágina em design system claro.
- `src/pages/servicos/ortodontia.astro`: Subpágina em design system claro.
- `public/llms.txt`: Atualizado com CRO MG 25.170, >21 anos de prática, telefone e e-mail oficiais.
- `public/favicon.svg`: Sincronizado com o símbolo oficial `logo-simbolo.svg`.
- `alt-text.md`: Tabela descritiva de acessibilidade de todas as 25 imagens do projeto.
- `auditoria.md`: Relatório da Fase 1 com diagnóstico prévio dos 10 pilares.
- `CHANGELOG-padronizacao.md`: Este relatório completo de consolidação da Fase 2.

---

## 10. Recomendações e Próximos Passos Sugeridos ao Dr. Luciano

1. **Google Perfil de Empresa (Google Meu Negócio):**
   - Garantir que o telefone de exibição pública seja unicamente o celular/WhatsApp `(35) 98821-5162`.
   - Adicionar as fotos do consultório (sala clínica, recepção e fachada) em alta resolução diretamente na ficha do Google.
2. **Fotografia Institucional Complementar:**
   - Para enriquecer ainda mais os cards de casos clínicos, recomenda-se realizar sessões fotográficas profissionais de macrofotografia dental e de interações reais do Dr. Luciano com pacientes (com termo de consentimento prévio para divulgação).
3. **Monitoramento de Agendamentos:**
   - Acompanhar as conversões vindas dos botões com mensagem pré-configurada no WhatsApp para aferir qual serviço gera maior demanda imediata em Passos e região.

---

## 11. Relatório de Conferência da Fase 3

### 11.1 Validação de Compilação (Build Test)
- **Comando:** `pnpm run build`
- **Resultado:** Executado com êxito (Código de Saída: `0`).
- **Rotas Estáticas Geradas:**
  - `src/pages/index.astro` ➔ `/index.html`
  - `src/pages/servicos/estetica.astro` ➔ `/servicos/estetica/index.html`
  - `src/pages/servicos/implantes.astro` ➔ `/servicos/implantes/index.html`
  - `src/pages/servicos/ortodontia.astro` ➔ `/servicos/ortodontia/index.html`
  - `src/pages/servicos/protocolo.astro` ➔ `/servicos/protocolo/index.html`
- **Otimização de Imagens:** 28 variantes WebP otimizadas com Sharp sem qualquer falha de cache ou carregamento.

---

### 11.2 Matriz de Conferência de Regras Críticas

| Item de Verificação | Requisito Exigido | Status | Evidência Técnica |
| :--- | :--- | :--- | :--- |
| **Paleta de Cores** | Apenas cores do manual oficial (#426BB2, #3D6ABD, #9DB8E0, #C3D8F0, #1E2A44, #8BB027, #C6DB69, brancos). Fim dos fundos escuros maciços (#102A4C / #0A192F). | **100% Conforme** | 0 ocorrências de `#102A4C`, `#0A192F` ou `navy-` nas páginas ativas. Superfícies brancas e suaves (`#FFFFFF`, `#F4F8FD`, `#E6EFFA`). |
| **Tipografia Sem Serifa** | Expurgar 100% de fontes serifadas (`Playfair Display`). Padronizar em `Source Sans 3`. | **100% Conforme** | 0 ocorrências de `font-serif` ou `Playfair` em todo o diretório `src/`. Google Fonts configurado exclusivamente com `Source Sans 3`. |
| **Tamanho Mínimo de Texto** | Nenhum texto com tamanho inferior a 16px (1rem). | **100% Conforme** | Escala de `tailwind.config.mjs` mapeou `xs` e `sm` para `1rem` (16px). Todas as classes nas páginas ativas foram migradas para `text-base` ou classes fluidas `clamp` (18px a 20px). |
| **Contraste WCAG 2.1 AA** | Contraste mínimo de 4.5:1 para texto normal e 3:1 para texto grande. | **100% Conforme** | `#426BB2` sobre branco: 5.2:1 (AA). `#1E2A44` sobre branco: 13.8:1 (AAA). Verde `#8BB027` restrito a marcadores e ícones gráficos. |
| **Textos Alternativos (Alt Text)** | Toda imagem com alt único, descritivo, com palavras-chave sem keyword stuffing. | **100% Conforme** | 100% das 25 imagens catalogadas em `alt-text.md` e implementadas no código com descrição acessível. |
| **Logo no Cabeçalho** | `logo-simplificada.svg` em 44px mobile / 56px desktop, clicável para home, sem redundância de texto. | **100% Conforme** | Implementado em `src/components/Header.astro` com `h-11 sm:h-14`, link para `/`, sem textos HTML adjacentes. |
| **Dados Unificados** | CRO MG 25.170, WhatsApp (35) 98821-5162, Rua dos Brandões 231 Sala 24, horário 13h30-18h30. | **100% Conforme** | Presença homogênea em Header, Footer, Hero, Bio, subpáginas e JSON-LD. |
| **Preservação de SEO Técnico** | Manter meta tags, canonical, Schema.org JSON-LD, OpenGraph, sitemap, robots e llms.txt. | **100% Conforme** | Schema.org intacto com dados atualizados, canonical URL preservado, robots e sitemap sem modificações estruturais. |

---

### 11.3 Auditoria Responsiva Comparativa (375px vs 768px vs 1440px)

#### 1. Cabeçalho (Header)
- **375px (Mobile):** Logo simplificada em 44px de altura. Menu de navegação textual recolhido para priorizar a visualização. Botão tátil de WhatsApp compacto com 48px de altura contendo o ícone e a palavra "WhatsApp". Zero rolagem horizontal (overflow-x nulo).
- **768px (Tablet):** Logo simplificada expande para 56px. Botão de WhatsApp ganha padding lateral maior (`px-5`).
- **1440px (Desktop):** Navegação horizontal completa em `17px` (`text-[1.0625rem]`), sem serifa, font-weight 600, com 5 links (`Tratamentos`, `Comparativo`, `Sobre o Dr. Luciano`, `Consultório`, `Localização`), efeito hover em azul oficial e anel de foco acessível. Botão CTA de agendamento em destaque.

#### 2. Hero Section
- **375px (Mobile):** Fundo fotográfico do consultório com gradiente clareador direcional garantindo legibilidade do texto. Badge de autoridade em pílula clara com indicador verde ativo. Título H1 em 32px (`text-3xl`). Botões CTA empilhados verticalmente com largura total (`w-full`) e altura mínima de 52px. Retrato do Dr. Luciano em card institucional claro.
- **768px (Tablet):** Título H1 escala para 36px (`sm:text-4xl`). Botões CTA posicionados lado a lado (`flex-row`).
- **1440px (Desktop):** Grid assimétrico de 12 colunas (7 colunas para chamada e texto / 5 colunas para o card do Dr. Luciano). Título H1 atinge 44px (`lg:text-[44px]`). Foto de destaque do Dr. Luciano em card amplo de 460px com selos de autoridade.

#### 3. Triagem Clínica Interativa (`#triagem`)
- **375px (Mobile):** Abas dispostas em grade de 2 colunas com botões táteis de 56px de altura (`min-h-[56px]`), ícones SVG em destaque e textos em 16px. O painel da queixa selecionada surge em card claro com diagnóstico, recomendação biológica e botão de contato específico.
- **768px (Tablet):** Abas transformam-se em barra horizontal com rolagem suave por snap (`snap-x`).
- **1440px (Desktop):** Barra de abas completa com transição de cor suave, cards de orientação com benefícios laterais e botão de contato com sombra verde suave.

#### 4. Carrossel de Especialidades (`#tratamentos`)
- **375px (Mobile):** Carrossel horizontal deslizável com snap center (`snap-center`), cards com largura de 280px. Botões de seta anterior/próximo com 48×48px posicionados abaixo do carrossel para navegação confortável com uma mão.
- **768px (Tablet):** Cards expandem para 320px de largura e imagem para 260px de altura.
- **1440px (Desktop):** Cards com 360px de largura. Hover elegante com leve zoom da imagem (`scale-105`), elevação de sombra (`shadow-card-hover`) e borda ativa em Azul Oficial.

#### 5. Comparador Anatômico (Dente Natural vs Implante)
- **375px (Mobile):** Slider interativo contido em card branco com borda sutil, pino circular centralizado de 48×48px para arrasto via toque. Botões inferiores táteis de 48px para alternar entre "Dente Biológico" e "Implante de Titânio" com um clique sem necessidade de arrasto.
- **768px (Tablet):** Visualização ampla das camadas anatômicas em alta resolução.
- **1440px (Desktop):** Centralizado com micro-animação fluida, acompanhado por 3 cards explicativos em grade de 3 colunas (Preservação Óssea, Integridade Adjacente, Firmeza Mastigatória).

#### 6. Autoridade & Biografia do Dr. Luciano (`#sobre`)
- **375px (Mobile):** Foto institucional e blocos de autoridade clínica empilhados verticalmente: "+21 Anos de Prática Clínica", "100% Pessoal" e "Passos - MG". Textos informativos em 16px e 18px.
- **768px (Tablet):** Blocos de autoridade organizados em grade de 3 colunas (`sm:grid-cols-3`).
- **1440px (Desktop):** Grid de 12 colunas com retrato lateral em 5 colunas e narrativa profissional em 7 colunas, enfatizando a experiência ininterrupta no Centro de Passos.

#### 7. Consultório & Estrutura Física (`#consultorio`)
- **375px (Mobile):** Fotos reais dispostas verticalmente: 1 destaque panorâmico (Cadeira Odontológica e Sala Clínica) e 2 fotos empilhadas (Recepção/Espera Climatizada e Placa Externa da Sala 24). Badges brancos translúcidos nos cantos das fotos.
- **768px (Tablet):** Fotos secundárias dispostas em layout horizontal compacto (`sm:flex-row`).
- **1440px (Desktop):** Composição de 12 colunas (7 colunas para a foto clínica panorâmica / 5 colunas para os cartões de recepção e localização).

#### 8. FAQ & Dúvidas Frequentes (`#duvidas`)
- **375px (Mobile):** Acordeão nativo com área de toque de 56px por pergunta, ícone de expansão com transição de rotação suave, texto da resposta em 18px com altura de linha relaxada.
- **768px e 1440px (Tablet/Desktop):** Largura contida em 768px centralizados (`max-w-3xl`), foco visível e espaçamento generoso.

#### 9. Rodapé (Footer)
- **375px (Mobile):** Colunas empilhadas. Logo completa em card branco protegido no topo, dados de contato e endereço com links clicáveis para telefone e mapa, links de serviços e dados regulatórios ao final.
- **768px (Tablet):** Grid de 2 colunas para navegação e contatos.
- **1440px (Desktop):** Grid de 12 colunas (5 colunas para identidade institucional, 3 para especialidades, 4 para contatos oficiais e horário de funcionamento). Fundo em `#1E2A44` com texto em alto contraste (branco e tons claros).

#### 10. Botão Flutuante de WhatsApp
- **375px (Mobile):** Botão circular de 56×56px no canto inferior direito, com área de toque ampla, sem obstruir conteúdos textuais ou rodapé.
- **768px e 1440px (Tablet/Desktop):** Acompanhado de callout expansivo "Agende sua Avaliação" à esquerda para amplificar conversões.

---

### 11.4 Pendências de Informação do Cliente

As seguintes informações foram mapeadas e necessitam de manifestação ou fornecimento por parte do Dr. Luciano:

1. **`[CONFIRMAR]` E-mail Institucional:**
   - **Dado Atual:** `drlucianofreire@uol.com.br` (constante no manual de marca).
   - **Ação com o Cliente:** Confirmar se este e-mail da UOL segue ativo e monitorado diariamente pela recepção ou se o consultório prefere cadastrar um e-mail alternativo.
2. **`[CONFIRMAR]` Telefone Fixo Antigo `(35) 3521-5027`:**
   - **Situação Atual:** Removido de todos os botões e links ativos do site para não dispersar agendamentos.
   - **Ação com o Cliente:** Confirmar se esta linha fixa ainda existe fisicamente no consultório (para manter apenas em menção textual secundária no rodapé caso solicitado) ou se foi definitivamente desativada.
3. **`[PREENCHER]` Casos Clínicos Reais / Fotografias Intraorais:**
   - **Situação Atual:** As seções utilizam ilustrações anatômicas didáticas de alta precisão biológica e fotografias do consultório/profissional.
   - **Ação com o Cliente:** Caso o Dr. Luciano deseje exibir casos clínicos documentados (antes e depois de facetas ou protocolos), fornecer as fotos em alta resolução acompanhadas do Termo de Consentimento Livre e Esclarecido (TCLE) assinado pelos respectivos pacientes, conforme exigência do CFO.
4. **`[PREENCHER]` Parcerias Radiológicas Específicas:**
   - **Situação Atual:** O site menciona que exames tomográficos 3D são realizados em centros radiológicos parceiros em Passos.
   - **Ação com o Cliente:** Caso deseje citarnominalmente os centros radiológicos parceiros conveniados para facilitar a locomoção do paciente, informar os nomes.

---

### 11.5 Recomendações para Revisão Manual

1. **Teste Físico do WhatsApp em Dispositivos Móveis:**
   - Abrir o site publicado em um aparelho iPhone (iOS/Safari) e em um aparelho Android (Chrome).
   - Tocar no botão flutuante e verificar se o aplicativo do WhatsApp abre instantaneamente com a mensagem pré-configurada preenchida no campo de digitação.
2. **Revisão das Respostas do FAQ:**
   - Solicitar ao Dr. Luciano ou à sua secretária a leitura rápida das 5 respostas do FAQ (`#duvidas`) para validar se a explicação sobre implantes imediatos, prótese protocolo e primeira avaliação corresponde exatamente à conduta adotada no consultório.
3. **Google Meu Negócio (Perfil da Empresa):**
   - Verificar se na ficha do Google Maps o número de telefone cadastrado é o WhatsApp `(35) 98821-5162` e se o endereço está vinculado à Sala 24.
