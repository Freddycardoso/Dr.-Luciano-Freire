"use client";

import React, { useState } from "react";

interface Situation {
  id: string;
  tabLabel: string;
  mobileTabLabel: string;
  iconType: "tooth" | "lock" | "shield" | "sparkle";
  badge: string;
  title: string;
  painPoint: string;
  solution: string;
  highlights: string[];
  ctaLabel: string;
  whatsappMessage: string;
}

function renderSituationIcon(type: Situation["iconType"], isActive: boolean) {
  const strokeClass = isActive ? "text-gold-300" : "text-slate-400 group-hover:text-slate-200";
  switch (type) {
    case "tooth":
      return (
        <svg
          className={`w-4 h-4 shrink-0 transition-colors ${strokeClass}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M7 3C4.5 3 3 5 3 7.5c0 3.5 1.5 6.5 3 10 1 2.5 2 3.5 3 3.5 1.5 0 2-2 3-2s1.5 2 3 2c1 0 2-1 3-3.5 1.5-3.5 3-6.5 3-10C21 5 19.5 3 17 3c-2.5 0-4 1.5-5 2-1-.5-2.5-2-5-2z" />
        </svg>
      );
    case "lock":
      return (
        <svg
          className={`w-4 h-4 shrink-0 transition-colors ${strokeClass}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 018 0v4" />
          <circle cx="12" cy="16" r="1.2" fill="currentColor" />
        </svg>
      );
    case "shield":
      return (
        <svg
          className={`w-4 h-4 shrink-0 transition-colors ${strokeClass}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      );
    case "sparkle":
      return (
        <svg
          className={`w-4 h-4 shrink-0 transition-colors ${strokeClass}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4L12 2z" />
        </svg>
      );
    default:
      return null;
  }
}

const situations: Situation[] = [
  {
    id: "perda-unitaria",
    tabLabel: "Perdi 1 ou poucos dentes",
    mobileTabLabel: "Perdi 1 ou poucos dentes",
    iconType: "tooth",
    badge: "Implante Unitário ou Múltiplo",
    title: "Dente fixo e firme sem desgastar os dentes saudáveis vizinhos",
    painPoint:
      "A vergonha de sorrir em fotos, a dificuldade de mastigar no lado onde falta o dente e o receio silencioso dos dentes vizinhos entortarem com o tempo.",
    solution:
      "Instalamos uma raiz fixa de titânio milimétrica e uma coroa sob medida em porcelana pura. O novo dente reproduz a mesma cor, força e brilho dos seus dentes naturais — sem tocar nem desgastar nenhum dente saudável ao lado.",
    highlights: [
      "Dente com alta estabilidade e aspecto natural de dente biológico",
      "Preservação dos dentes vizinhos saudáveis (sem desgaste)",
      "Procedimento planejado para o seu conforto do início ao fim",
      "Recuperação equilibrada da força mastigatória",
    ],
    ctaLabel: "Verificar Indicação para Meu Caso no WhatsApp",
    whatsappMessage:
      "Olá, Dr. Luciano. Perdi dente(s) e gostaria de verificar a indicação de implante dentário para o meu caso.",
  },
  {
    id: "protese-protocolo",
    tabLabel: "Uso dentadura ou perdi todos os dentes",
    mobileTabLabel: "Uso dentadura / prótese",
    iconType: "lock",
    badge: "Prótese Protocolo Fixo (Sem Dentadura Móvel)",
    title: "Diga adeus à cola, à dentadura solta e ao céu da boca tapado de resina",
    painPoint:
      "O medo constante da dentadura se mover ao rir ou mastigar, as feridas e aftas na gengiva e a perda do sabor e temperatura dos alimentos por causa da placa de resina no céu da boca.",
    solution:
      "Substituímos a dentadura móvel por uma arcada completa de dentes fixos parafusados sobre implantes. O céu da boca fica totalmente livre, os dentes não saem do lugar e você volta a mastigar carnes, maçãs e castanhas com estabilidade e segurança.",
    highlights: [
      "Alternativa moderna ao uso contínuo de colas fixadoras",
      "Céu da boca livre para melhor percepção do sabor dos alimentos",
      "Alta estabilidade e firmeza para falar, sorrir e se alimentar",
      "Recuperação do conforto mastigatório e da harmonia facial",
    ],
    ctaLabel: "Consultar Indicação de Prótese Fixa no WhatsApp",
    whatsappMessage:
      "Olá, Dr. Luciano. Uso prótese/dentadura móvel e gostaria de consultar a indicação do protocolo de dentes fixos para o meu caso.",
  },
  {
    id: "pouco-osso",
    tabLabel: "Disseram que tenho pouco osso",
    mobileTabLabel: "Tenho pouco osso",
    iconType: "shield",
    badge: "Diagnóstico 3D e Técnicas Avançadas",
    title: "Pouco osso não impede você de voltar a ter dentes fixos e firmes",
    painPoint:
      "A frustração de ter consultado dentistas no passado que disseram que seu caso 'não tinha osso suficiente', gerando desânimo e conformismo com uma dentadura frouxa.",
    solution:
      "Com tomografia 3D no próprio consultório, encontramos áreas nobres de sustentação que o raio-X panorâmico comum não mostra. Utilizamos implantes especiais e técnicas biológicas modernas com o objetivo de evitar cirurgias invasivas em ambiente hospitalar.",
    highlights: [
      "Diagnóstico tomográfico detalhado no consultório em Passos",
      "Técnicas modernas com possibilidade de evitar cirurgias invasivas",
      "Planejamento individualizado para perdas dentárias antigas",
      "Recuperação tranquila e acompanhada passo a passo",
    ],
    ctaLabel: "Avaliar Possibilidade de Implante para Pouco Osso",
    whatsappMessage:
      "Olá, Dr. Luciano. Já me disseram que tenho pouco osso e gostaria de saber se meu caso tem indicação para implantes.",
  },
  {
    id: "estetica-alinhamento",
    tabLabel: "Quero alinhar ou clarear meu sorriso",
    mobileTabLabel: "Estética e alinhamento",
    iconType: "sparkle",
    badge: "Ortodontia e Lentes em Porcelana",
    title: "Harmonia do sorriso, cor natural e mordida confortável",
    painPoint:
      "O incômodo estético com dentes manchados, apinhados, espaçados ou desgastados pelo atrito e bruxismo, prejudicando a confiança no trabalho e na vida social.",
    solution:
      "Planejamos a harmonia do seu sorriso respeitando as características naturais do seu rosto. Combinamos alinhamento moderno com facetas e lentes em porcelana nobre sob medida, com aspecto natural e que mantêm o brilho ao longo dos anos.",
    highlights: [
      "Porcelana nobre pura que preserva a cor e o brilho ao longo dos anos",
      "Máxima preservação da estrutura biológica natural do dente",
      "Design do sorriso planejado e aprovado com você antes da confecção",
      "Harmonia facial, oclusão equilibrada e aspecto natural",
    ],
    ctaLabel: "Conversar sobre Estética Dental e Lentes",
    whatsappMessage:
      "Olá, Dr. Luciano. Gostaria de informações sobre clareamento, lentes de porcelana e alinhamento do sorriso.",
  },
];

interface Props {
  whatsappBaseUrl: string;
}

export function PatientSituationNavigator({ whatsappBaseUrl }: Props) {
  const [activeTab, setActiveTab] = useState(situations[0].id);

  const current = situations.find((s) => s.id === activeTab) || situations[0];
  const whatsappUrl = `${whatsappBaseUrl}?text=${encodeURIComponent(current.whatsappMessage)}`;

  return (
    <div className="w-full">
      {/* =========================================================================
          BOTÕES DAS SITUAÇÕES CLÍNICAS (RESPONSIVO)
          No Mobile: Grade 2x2 compacta - todas as 4 situações visíveis a 1 toque!
          No Desktop: Linha horizontal fluida e elegante.
          ========================================================================= */}
      {/* Versão Mobile (< md): Grid 2x2 onde todas as 4 dores ficam 100% visíveis sem rolagem oculta */}
      <div
        role="tablist"
        aria-label="Selecione sua situação clínica"
        className="grid grid-cols-2 gap-2 md:hidden mb-4"
      >
        {situations.map((item) => {
          const isActive = item.id === activeTab;
          return (
            <button
              key={`m-${item.id}`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`btn-tactile group flex items-center gap-2 p-3 rounded-xl text-xs font-semibold transition-all duration-200 border cursor-pointer select-none text-left min-h-[56px] ${
                isActive
                  ? "bg-slate-900 text-white border-gold-400 shadow-[0_0_16px_rgba(197,168,128,0.25)] ring-1 ring-gold-400/50"
                  : "bg-slate-950/80 text-slate-400 border-slate-800/90 hover:text-slate-200 hover:border-slate-700"
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {renderSituationIcon(item.iconType, isActive)}
              </div>
              <span className="leading-tight flex-1">
                {item.mobileTabLabel}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Versão Desktop (>= md): Abas Horizontais com Scroll Suave */}
      <div
        role="tablist"
        aria-label="Selecione sua situação clínica"
        className="hidden md:flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-4 pt-1 px-1 scrollbar-none snap-x"
      >
        {situations.map((item) => {
          const isActive = item.id === activeTab;
          return (
            <button
              key={`d-${item.id}`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`btn-tactile group shrink-0 snap-start flex items-center gap-2.5 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border cursor-pointer select-none ${
                isActive
                  ? "bg-slate-900 text-white border-gold-400 shadow-[0_0_20px_rgba(197,168,128,0.18)] ring-1 ring-gold-400/50"
                  : "bg-slate-950/70 text-slate-400 border-slate-800/90 hover:text-slate-200 hover:border-slate-700 hover:bg-slate-900/50"
              }`}
            >
              {renderSituationIcon(item.iconType, isActive)}
              <span>{item.tabLabel}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 ml-1"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Painel de Conteúdo da Situação Ativa */}
      <div
        id={`panel-${current.id}`}
        role="tabpanel"
        className="mt-6 rounded-2xl bg-slate-900/95 border border-slate-800/90 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden transition-all duration-300"
      >
        {/* Glow de ambientação no fundo */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold-400/[0.04] rounded-full blur-3xl pointer-events-none"></div>

        <div
          key={current.id}
          className="relative z-10 max-w-4xl mx-auto flex flex-col animate-[heroFadeUp_280ms_cubic-bezier(0.16,1,0.3,1)_both]"
        >
          {/* Badge da Especialidade Técnica */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/12 text-gold-300 text-[11px] font-bold uppercase tracking-wider border border-gold-400/25 self-start mb-4">
            <span>{current.badge}</span>
          </div>

          {/* Título Principal Focado no Paciente (Amplo e com respiro total) */}
          <h3 className="font-serif text-2xl sm:text-3xl lg:text-[2rem] font-bold text-white tracking-tight leading-snug mb-5">
            {current.title}
          </h3>

          {/* O que você sente hoje (A Dor) */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800/80 mb-5">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400/80"></span>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
                O incômodo no seu dia a dia
              </p>
            </div>
            <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed font-light">
              {current.painPoint}
            </p>
          </div>

          {/* Como o Dr. Luciano resolve (A Solução) */}
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-wider text-gold-300 mb-2">
              A conduta do Dr. Luciano Freire
            </p>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {current.solution}
            </p>
          </div>

          {/* Benefícios e Objetivos do Tratamento (Posicionado Abaixo, em Grid Arejado) */}
          <div className="pt-6 pb-2 border-t border-slate-800/80 mb-6">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Objetivos e benefícios buscados neste tratamento:</span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {current.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/70"
                >
                  <svg className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-slate-400/80 mt-3 font-light">
              * A indicação e as possibilidades de cada tratamento dependem da avaliação clínica e tomográfica individual com o cirurgião-dentista.
            </p>
          </div>

          {/* Ação WhatsApp Direta */}
          <div className="pt-6 border-t border-slate-800/90 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tactile inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-whatsapp text-slate-950 font-bold text-sm sm:text-base hover:bg-whatsapp-hover shadow-[0_4px_20px_rgba(37,211,102,0.22)]"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.297.144.35.491 1.199.534 1.286.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.353.101.173.45 0.742.965 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.043.101-.116.433-.506.549-.679.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" />
              </svg>
              <span>{current.ctaLabel}</span>
            </a>
            <span className="text-xs text-slate-400 text-center sm:text-left">
              Tire suas dúvidas sobre a indicação para o seu caso diretamente com o Dr. Luciano
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
