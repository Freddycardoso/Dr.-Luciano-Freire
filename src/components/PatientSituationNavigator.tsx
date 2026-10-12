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
  const strokeClass = isActive ? "text-white" : "text-brand-blue group-hover:text-brand-deep";
  switch (type) {
    case "tooth":
      return (
        <svg
          className={`w-5 h-5 shrink-0 transition-colors ${strokeClass}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
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
          className={`w-5 h-5 shrink-0 transition-colors ${strokeClass}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
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
          className={`w-5 h-5 shrink-0 transition-colors ${strokeClass}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
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
          className={`w-5 h-5 shrink-0 transition-colors ${strokeClass}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
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
    title: "Recupere o dente fixo sem desgastar os dentes saudáveis ao lado.",
    painPoint:
      "A vergonha de sorrir em público e a dificuldade de mastigar do lado onde falta o dente.",
    solution:
      "Um implante discreto e com a mesma firmeza da sua mastigação original, idêntico aos dentes naturais.",
    highlights: [
      "Aspecto natural e idêntico ao dente biológico",
      "Preserva 100% os dentes saudáveis vizinhos",
      "Mastigação firme e segura para qualquer alimento",
      "Procedimento planejado com foco no seu conforto",
    ],
    ctaLabel: "Avaliar Implante Unitário no WhatsApp",
    whatsappMessage:
      "Olá, Dr. Luciano. Perdi dente(s) e gostaria de avaliar a colocação de implante fixo.",
  },
  {
    id: "protese-protocolo",
    tabLabel: "Uso dentadura ou perdi todos os dentes",
    mobileTabLabel: "Uso dentadura / prótese",
    iconType: "lock",
    badge: "Prótese Protocolo Fixo (Sem Dentadura Móvel)",
    title: "Diga adeus à prótese que solta ou machuca a gengiva.",
    painPoint:
      "O medo da dentadura sair do lugar ao rir ou comer, e a perda do sabor da comida por ter o céu da boca coberto.",
    solution:
      "Tenha dentes 100% fixos sobre implantes. Volte a mastigar carnes e maçãs sem receio de deslocamentos.",
    highlights: [
      "Fim definitivo do uso de colas e fixadores",
      "Céu da boca livre para sentir o sabor dos alimentos",
      "Segurança total para mastigar carnes, maçãs e castanhas",
      "Devolve a firmeza e a harmonia do seu rosto",
    ],
    ctaLabel: "Trocar Dentadura por Dentes Fixos",
    whatsappMessage:
      "Olá, Dr. Luciano. Uso dentadura/prótese e gostaria de saber sobre a prótese fixa sobre implantes.",
  },
  {
    id: "pouco-osso",
    tabLabel: "Disseram que tenho pouco osso",
    mobileTabLabel: "Tenho pouco osso",
    iconType: "shield",
    badge: "Diagnóstico e Técnicas Modernas",
    title: "Mesmo com perda óssea, a reabilitação pode ser viável.",
    painPoint:
      "A frustração de ter ouvido no passado que seu caso 'não tinha osso suficiente' para fazer implante.",
    solution:
      "Com planejamento detalhado e técnicas modernas, avaliamos a melhor abordagem para o seu caso com total segurança.",
    highlights: [
      "Exames de imagem detalhados e parceria radiológica",
      "Técnicas modernas com máxima preservação óssea",
      "Planejamento individualizado para perdas dentárias antigas",
      "Atendimento seguro com anestesia local eficiente",
    ],
    ctaLabel: "Avaliar Possibilidade para Pouco Osso",
    whatsappMessage:
      "Olá, Dr. Luciano. Já me disseram que tenho pouco osso e gostaria de saber se meu caso pode fazer implante.",
  },
  {
    id: "estetica-alinhamento",
    tabLabel: "Quero alinhar ou clarear meu sorriso",
    mobileTabLabel: "Estética e alinhamento",
    iconType: "sparkle",
    badge: "Ortodontia e Lentes em Porcelana",
    title: "Harmonia completa para sorrir sem constrangimento.",
    painPoint:
      "O incômodo com dentes manchados, escurecidos, desalinhados ou desgastados pelo tempo.",
    solution:
      "Correções precisas de formato, cor e alinhamento para valorizar o desenho natural do seu rosto.",
    highlights: [
      "Porcelana pura de alta durabilidade e brilho natural",
      "Design do sorriso planejado e alinhado com você",
      "Correção de cor, formato e harmonia dental",
      "Máxima preservação do esmalte biológico",
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
      {/* Versão Mobile (< md): Grid 2x2 */}
      <div
        role="tablist"
        aria-label="Selecione sua situação clínica"
        className="grid grid-cols-2 gap-2.5 md:hidden mb-4"
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
              className={`btn-tactile group flex items-center gap-2.5 p-3.5 rounded-xl text-sm font-semibold transition-all duration-200 border cursor-pointer select-none text-left min-h-[56px] ${
                isActive
                  ? "bg-brand-blue text-white border-brand-blue shadow-md"
                  : "bg-white text-brand-dark border-brand-pale hover:bg-surface-subtle hover:border-brand-light"
              }`}
            >
              <div className="shrink-0">
                {renderSituationIcon(item.iconType, isActive)}
              </div>
              <span className="leading-tight flex-1">
                {item.mobileTabLabel}
              </span>
            </button>
          );
        })}
      </div>

      {/* Versão Desktop (>= md): Abas Horizontais */}
      <div
        role="tablist"
        aria-label="Selecione sua situação clínica"
        className="hidden md:flex items-center gap-3 overflow-x-auto pb-4 pt-1 px-1 snap-x"
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
              className={`btn-tactile group shrink-0 snap-start flex items-center gap-2.5 px-5 py-3.5 rounded-xl text-base font-semibold transition-all duration-200 border cursor-pointer select-none min-h-[48px] ${
                isActive
                  ? "bg-brand-blue text-white border-brand-blue shadow-md"
                  : "bg-white text-brand-dark border-brand-pale hover:bg-surface-subtle hover:border-brand-light"
              }`}
            >
              {renderSituationIcon(item.iconType, isActive)}
              <span>{item.tabLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Painel de Conteúdo da Situação Ativa */}
      <div
        id={`panel-${current.id}`}
        role="tabpanel"
        className="mt-6 rounded-2xl bg-white border border-brand-pale p-6 sm:p-9 shadow-card relative overflow-hidden transition-all duration-300"
      >
        <div
          key={current.id}
          className="relative z-10 max-w-4xl mx-auto flex flex-col animate-[heroFadeUp_280ms_cubic-bezier(0.16,1,0.3,1)_both]"
        >
          {/* Título Principal */}
          <h3 className="text-2xl sm:text-3xl font-bold text-brand-dark tracking-tight leading-snug mb-4">
            {current.title}
          </h3>

          {/* Explicação Direta */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-8">
            {current.solution}
          </p>

          {/* Benefícios Principais */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
            {current.highlights.map((highlight, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-4 rounded-xl bg-surface-subtle border border-brand-pale/70"
              >
                <div className="w-6 h-6 rounded-full bg-brand-pale text-brand-blue flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-base text-brand-dark font-medium leading-snug">
                  {highlight}
                </span>
              </div>
            ))}
          </div>

          {/* Ação WhatsApp Direta */}
          <div className="pt-6 border-t border-brand-pale flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tactile inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-whatsapp text-slate-950 font-bold text-base hover:bg-whatsapp-hover shadow-glow-whatsapp min-h-[48px]"
            >
              <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.297.144.35.491 1.199.534 1.286.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.353.101.173.45 0.742.965 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.043.101-.116.433-.506.549-.679.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" />
              </svg>
              <span>{current.ctaLabel}</span>
            </a>
            <span className="text-sm text-slate-500 text-center sm:text-left">
              Atendimento individual conduzido pessoalmente pelo Dr. Luciano Freire (CRO MG 25.170)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
