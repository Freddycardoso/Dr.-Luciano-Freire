# Catálogo de Acessibilidade: Textos Alternativos (Alt Text)

Este documento registra a auditoria e padronização completa de todos os textos alternativos (`alt`) aplicados às imagens do site do **Dr. Luciano Alves Freire** (Consultório Odontológico, CRO MG 25.170, Passos/MG).

---

## 1. Diretrizes de Acessibilidade Aplicadas (WCAG 2.1 AA)

- **Precisão e Contexto Clínico:** Imagens de procedimentos e do consultório possuem descrições específicas, evitando termos genéricos como "foto" ou "imagem".
- **Identificação Ética:** O nome do profissional e seu número de registro (CRO MG 25.170) são informados em imagens de perfil e autoria.
- **Diferenciação Anatômica:** No comparador e seções de reabilitação, o implante de titânio e o dente natural biológico são descritos com clareza funcional.
- **Logotipos e Marcas:** Identificação clara da assinatura institucional e ausência de texto duplicado via código redundante.

---

## 2. Tabela Geral de Imagens e Alt Texts

| Arquivo de Origem / Componente | Imagem / Recurso | Tipo / Formato | Alt Text Implementado | Justificativa de Acessibilidade & SEO |
| :--- | :--- | :--- | :--- | :--- |
| `src/components/Header.astro` | `logo-simplificada.svg` | SVG | `Logotipo Dr. Luciano Freire - Consultório Odontológico` | Identificação imediata da clínica no topo de todas as páginas. |
| `src/components/Footer.astro` | `logo-completa.svg` | SVG | `Logotipo completo do Dr. Luciano Freire - Cirurgião-Dentista em Passos MG` | Assinatura visual oficial com autoridade e localização geográfica. |
| `src/layouts/Layout.astro` | `logo-simbolo.svg` | SVG (Favicon) | *(Favicon e meta tags)* | Ícone institucional padronizado para abas e favoritos. |
| `src/pages/index.astro` (Splash) | `logo-clinica-nobg.png` | WebP | `Logotipo do Consultório Dr. Luciano Freire` | Transição visual inicial suave com identificação para leitores de tela. |
| `src/pages/index.astro` (Hero Background) | `consultorio-hero-cropped.png` | WebP (Eager / LCP) | `Sala de atendimento do consultório odontológico do Dr. Luciano Freire em Passos MG` | Contextualização espacial do consultório físico real no Centro de Passos. |
| `src/pages/index.astro` (Hero Mobile) | `dr-luciano-freire-hero.png` | WebP (Eager) | `Dr. Luciano Alves Freire, Cirurgião-Dentista CRO MG 25.170, fotografado no consultório em Passos MG` | Apresentação pessoal direta do cirurgião-dentista titular. |
| `src/pages/index.astro` (Hero Desktop) | `dr-luciano-freire-hero.png` | WebP (Eager) | `Dr. Luciano Alves Freire, Cirurgião-Dentista com mais de 21 anos de prática clínica em Passos MG` | Reforço de autoridade factual e experiência clínica consolidada. |
| `src/components/AnatomyComparisonSlider.tsx` (Dente Natural) | `dente-natural-comparativo.png` | WebP | `Ilustração anatômica de dente natural saudável exibindo esmalte, dentina e raiz biológica ancorada no osso` | Descrição minuciosa para usuários com baixa visão compreenderem a anatomia comparada. |
| `src/components/AnatomyComparisonSlider.tsx` (Implante) | `implante-titanio-comparativo.png` | WebP | `Ilustração anatômica de implante dentário de titânio osseointegrado na mandíbula com coroa cerâmica sobreposta` | Esclarece os componentes mecânicos e biológicos da reabilitação protética. |
| `src/components/ServicesCarousel.tsx` (Implantes) | `servico_implante.jpg` | WebP (Lazy) | `Serviço odontológico: Implantes Dentários - Dr. Luciano Freire em Passos MG` | Vincula a especialidade ao consultório e à cidade para SEO local. |
| `src/components/ServicesCarousel.tsx` (Protocolo) | `servico_protocolo.jpg` | WebP (Lazy) | `Serviço odontológico: Prótese Protocolo Fixo - Dr. Luciano Freire em Passos MG` | Identificação precisa da técnica de reabilitação com prótese sobre implantes. |
| `src/components/ServicesCarousel.tsx` (Estética) | `servico_estetica.jpg` | WebP (Lazy) | `Serviço odontológico: Estética Dental e Clareamento - Dr. Luciano Freire em Passos MG` | Foco em procedimentos de lentes, facetas e clareamento dental. |
| `src/components/ServicesCarousel.tsx` (Ortodontia) | `servico_ortodontia.jpg` | WebP (Lazy) | `Serviço odontológico: Ortodontia e Alinhadores - Dr. Luciano Freire em Passos MG` | Destaque para correção de alinhamento e aparelhos modernos. |
| `src/pages/index.astro` (Autoridade) | `dr-luciano-freire.png` | WebP (Lazy) | `Dr. Luciano Alves Freire, Cirurgião-Dentista formado com mais de 21 anos de prática clínica em Passos MG, CRO MG 25.170` | Biografia visual e credenciamento oficial junto ao CRO-MG. |
| `src/pages/index.astro` (Ambientes 1) | `consultorio-hero-cropped.png` | WebP (Lazy) | `Sala de atendimento clínico odontológico equipada com cadeira anatômica do Dr. Luciano Freire` | Demonstração do equipamento clínico moderno e estrutura ergonômica. |
| `src/pages/index.astro` (Ambientes 2) | `consultorio-sala-espera.png` | WebP (Lazy) | `Sala de espera climatizada e confortável do consultório odontológico Dr. Luciano Freire` | Acolhimento e comodidade aos pacientes e acompanhantes. |
| `src/pages/index.astro` (Ambientes 3) | `consultorio-placa-entrada.png` | WebP (Lazy) | `Placa de identificação externa da Sala 24 do consultório Dr. Luciano Alves Freire no Centro de Passos` | Facilitação da localização espacial na Rua dos Brandões, 231. |
| `src/pages/servicos/estetica.astro` (Hero) | `servico_estetica.jpg` | WebP (Eager) | `Procedimento de estética dental e planejamento do sorriso conduzido pelo Dr. Luciano Freire em Passos MG` | Destaque do procedimento estético com foco no paciente. |
| `src/pages/servicos/estetica.astro` (Detalhe) | `servico_estetica.jpg` | WebP (Lazy) | `Detalhe de caso de reabilitação estética dental realizado pelo Dr. Luciano Freire` | Foco no acabamento cerâmico refinado e harmonia visual. |
| `src/pages/servicos/implantes.astro` (Hero) | `servico_implante.jpg` | WebP (Eager) | `Consulta e planejamento cirúrgico de implantes dentários com o Dr. Luciano Freire em Passos MG` | Apresentação do ambiente clínico cirúrgico com foco no paciente. |
| `src/pages/servicos/implantes.astro` (Estrutura) | `implante-titanio-comparativo.png` | WebP (Lazy) | `Diagrama de implante dentário de titânio demonstrando pino osseointegrado e coroa cerâmica sobreposta` | Didatismo visual sobre a fixação definitiva no osso maxilar/mandibular. |
| `src/pages/servicos/protocolo.astro` (Hero) | `servico_protocolo.jpg` | WebP (Eager) | `Planejamento de reabilitação com prótese protocolo fixa conduzido pelo Dr. Luciano Freire em Passos MG` | Comunicação da segurança na substituição de arcada completa. |
| `src/pages/servicos/protocolo.astro` (Caso) | `servico_protocolo.jpg` | WebP (Lazy) | `Resultado e confecção de prótese protocolo fixa realizada pelo Dr. Luciano Freire` | Evidência de reabilitação funcional sem dentadura móvel. |
| `src/pages/servicos/ortodontia.astro` (Hero) | `servico_ortodontia.jpg` | WebP (Eager) | `Planejamento ortodôntico digital com alinhadores transparentes pelo Dr. Luciano Freire em Passos MG` | Enfatiza a discrição e a tecnologia digital de alinhamento. |
| `src/pages/servicos/ortodontia.astro` (Caso) | `servico_ortodontia.jpg` | WebP (Lazy) | `Caso de alinhamento ortodôntico com placas transparentes planejado pelo Dr. Luciano Freire` | Demonstração do aparelho invisível posicionado na arcada. |

---

## 3. Resumo de Métricas de Imagem
- **Total de imagens auditadas e padronizadas:** 25 ocorrências.
- **Imagens decorativas:** 0 com `alt=""` vazio indevido (todas as fotos transmitem contexto real de credibilidade médica).
- **Ícones SVG decorativos:** Todos acompanhados de `aria-hidden="true"` para evitar poluição sonora em leitores de tela.
- **Imagens LCP prioritárias:** `loading="eager"` e `fetchpriority="high"` mantidos no Hero sem bloqueio de renderização.
