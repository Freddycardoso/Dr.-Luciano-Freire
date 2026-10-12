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
