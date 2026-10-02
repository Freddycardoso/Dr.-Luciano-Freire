"use client";

import React, { useState } from "react";

interface StepData {
  id: string;
  stepNumber: string;
  phaseLabel: string;
  title: string;
  benefitBadge: string;
  summary: string;
  points: {
    title: string;
    description: string;
    icon: "scan" | "shield" | "freedom";
  }[];
  whatsappInquiry: string;
}

function renderStepIcon(icon: StepData["points"][0]["icon"]) {
  switch (icon) {
    case "scan":
      return (
        <svg
          className="w-5 h-5 text-gold-300 stroke-[1.6]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 7V4h3M17 4h3v3M4 17v3h3M20 17v3h-3M7 12h10" />
        </svg>
      );
    case "shield":
      return (
        <svg
          className="w-5 h-5 text-gold-300 stroke-[1.6]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "freedom":
      return (
        <svg
          className="w-5 h-5 text-gold-300 stroke-[1.6]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2.5" />
          <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2.5" />
        </svg>
      );
    default:
      return null;
  }
}

const stepsData: StepData[] = [
  {
    id: "fase-diagnostico",
    stepNumber: "01",
    phaseLabel: "Etapa 1 • Avaliação Confortável",
    title: "Diagnóstico Digital 3D (Sem massinha na boca)",
    benefitBadge: "Sem moldagem incômoda ou náuseas",
    summary:
      "Mapeamento digital rápido no próprio consultório. O Dr. Luciano planeja milimetricamente a posição exata de cada dente no computador antes do procedimento — sem massas que causam ânsia.",
    points: [
      {
        title: "Zero Náusea e Zero Massinha",
        description:
          "Escaneamento digital rápido, limpo e confortável, dispensando moldagens antigas.",
        icon: "scan",
      },
      {
        title: "Veja o Resultado Antes de Iniciar",
        description:
          "Simulação tridimensional em tela da sua mastigação e do seu novo sorriso.",
        icon: "scan",
      },
      {
        title: "Conversa Calma e Acolhedora",
        description:
          "Esclarecimento de todas as dúvidas em linguagem simples e sem nenhuma pressa.",
        icon: "scan",
      },
    ],
    whatsappInquiry:
      "Olá, Dr. Luciano. Gostaria de entender como funciona a avaliação inicial com diagnóstico 3D.",
  },
  {
    id: "fase-cirurgia",
    stepNumber: "02",
    phaseLabel: "Etapa 2 • Procedimento Confortável",
    title: "Cirurgia Guiada e Sem Dor",
    benefitBadge: "Protocolo suave e humanizado",
    summary:
      "Procedimento rápido e delicado. Com anestesia moderna computadorizada e planejamento 3D, a instalação é precisa, tranquila e com foco total no seu bem-estar.",
    points: [
      {
        title: "Anestesia Suave e Potente",
        description:
          "Neutraliza completamente a sensibilidade para você ficar calmo do início ao fim.",
        icon: "shield",
      },
      {
        title: "Ambiente Calmo e Relaxante",
        description:
          "Consultório climatizado com atendimento respeitando o seu próprio ritmo.",
        icon: "shield",
      },
      {
        title: "Recuperação Leve em Casa",
        description:
          "Medicações preventivas orientadas para um pós-operatório sereno e sem dor.",
        icon: "shield",
      },
    ],
    whatsappInquiry:
      "Olá, Dr. Luciano. Gostaria de saber mais sobre o protocolo confortável para colocar implantes.",
  },
  {
    id: "fase-sorriso",
    stepNumber: "03",
    phaseLabel: "Etapa 3 • Seu Sorriso Fixo",
    title: "Dentes Fixos e Mastigação Restabelecida",
    benefitBadge: "Firmeza, estética e liberdade",
    summary:
      "Instalação definitiva dos dentes fixos em porcelana nobre. Diga adeus à dentadura solta e recupere a segurança de mastigar com força e sorrir sem medo.",
    points: [
      {
        title: "Mastigação Firme e Poderosa",
        description:
          "Volte a comer carnes, maçãs e suas comidas favoritas sem machucar a gengiva.",
        icon: "freedom",
      },
      {
        title: "Céu da Boca Livre",
        description:
          "Sem placas de resina tapando o palato: sinta o sabor e a temperatura real dos alimentos.",
        icon: "freedom",
      },
      {
        title: "Porcelana Pura e Duradoura",
        description:
          "Dentes harmônicos com o seu rosto, altamente resistentes que não mancham com o tempo.",
        icon: "freedom",
      },
    ],
    whatsappInquiry:
      "Olá, Dr. Luciano. Gostaria de saber como funciona a reabilitação com dentes fixos em porcelana.",
  },
];

interface Props {
  whatsappBaseUrl?: string;
}

export const SurgicalPathwayTimeline: React.FC<Props> = ({
  whatsappBaseUrl = "https://wa.me/5535988215162",
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const current = stepsData[activeStep >= 0 ? activeStep : 0];

  return (
    <div className="w-full">
      {/* =========================================================================
          VERSÃO MOBILE (< MD): ACCORDION NATIVO INTELIGENTE
          O paciente toca na etapa e o conteúdo se abre imediatamente abaixo dela,
          com feedback visual instantâneo e sem o efeito ioiô de rolagem.
          ========================================================================= */}
      <div className="block md:hidden space-y-3">
        {stepsData.map((step, index) => {
          const isOpen = activeStep === index;

          return (
            <div
              key={`mobile-${step.id}`}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? "bg-slate-900/95 border-gold-400/50 shadow-[0_8px_30px_rgba(0,0,0,0.6)] ring-1 ring-gold-400/30"
                  : "bg-slate-950/70 border-slate-800/80 hover:border-slate-700"
              }`}
            >
              {/* Cabeçalho do Accordion (Toque Fácil e Sem Duplicações) */}
              <button
                type="button"
                onClick={() => setActiveStep(isOpen ? -1 : index)}
                aria-expanded={isOpen}
                aria-controls={`mobile-panel-${step.id}`}
                className="w-full p-4 flex items-center justify-between gap-3 text-left focus:outline-none cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Orbe com o número da etapa */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-serif text-base font-bold shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "bg-gradient-to-br from-gold-300 via-gold-400 to-gold-600 text-slate-950 shadow-[0_0_16px_rgba(212,175,55,0.7)]"
                        : "bg-slate-900 text-gold-300 border border-gold-400/30"
                    }`}
                  >
                    {step.stepNumber}
                  </div>

                  {/* Rótulo e Título da Etapa */}
                  <div className="min-w-0">
                    <span
                      className={`text-[10px] uppercase tracking-wider font-semibold block ${
                        isOpen ? "text-gold-300" : "text-slate-400"
                      }`}
                    >
                      {step.phaseLabel}
                    </span>
                    <h4
                      className={`font-serif text-sm font-bold tracking-tight leading-snug truncate ${
                        isOpen ? "text-white" : "text-slate-200"
                      }`}
                    >
                      {step.title}
                    </h4>
                  </div>
                </div>

                {/* Seta indicadora (Chevron com rotação suave) */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-300 ${
                    isOpen
                      ? "bg-gold-400/10 border-gold-400/30 text-gold-300 rotate-180"
                      : "bg-slate-900/80 border-slate-800 text-slate-400"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Conteúdo Expandido do Passo (Aparece exatamente onde o paciente tocou) */}
              {isOpen && (
                <div
                  id={`mobile-panel-${step.id}`}
                  className="px-4 pb-5 pt-1 border-t border-slate-800/80 animate-[heroFadeUp_240ms_cubic-bezier(0.16,1,0.3,1)_both]"
                >
                  {/* Badge de benefício */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-300 text-[11px] font-semibold mb-3">
                    <span>{step.benefitBadge}</span>
                  </div>

                  {/* Resumo explicativo */}
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 font-light">
                    {step.summary}
                  </p>

                  {/* Botão de WhatsApp Específico para a Etapa */}
                  <a
                    href={`${whatsappBaseUrl}?text=${encodeURIComponent(step.whatsappInquiry)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-tactile inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-slate-950 font-bold text-xs shadow-md transition-colors mb-5"
                  >
                    <span>Tirar dúvidas sobre a Etapa {step.stepNumber} no WhatsApp</span>
                    <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.297.144.35.491 1.199.534 1.286.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.353.101.173.45 0.742.965 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.043.101-.116.433-.506.549-.679.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z"/>
                    </svg>
                  </a>

                  {/* 3 Destaques Claros com Ícones */}
                  <div className="pt-3 border-t border-slate-800/80">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>Cuidados de conforto e precisão planejados:</span>
                    </p>

                    <div className="space-y-2.5">
                      {step.points.map((point, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800/70"
                        >
                          <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 shadow-inner mt-0.5">
                            {renderStepIcon(point.icon)}
                          </div>
                          <div>
                            <h5 className="font-serif text-xs sm:text-sm font-bold text-white mb-0.5">
                              {point.title}
                            </h5>
                            <p className="text-slate-300 text-[11px] sm:text-xs leading-relaxed font-light">
                              {point.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Disclaimer de Variação Biológica */}
                  <p className="text-[10px] text-slate-400/80 mt-3 font-light">
                    * O tempo biológico de cicatrização e osseointegração varia e é avaliado individualmente pelo cirurgião-dentista em consulta.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* =========================================================================
          VERSÃO DESKTOP (TELA >= MD): TRILHA CIRÚRGICA HORIZONTAL CONTÍNUA
          Mantém a apresentação panorâmica com linha arterial e palco editorial.
          ========================================================================= */}
      <div className="hidden md:block">
        <div className="relative mb-10 px-2 sm:px-6">
          {/* Trilho de base arterial entre o marco 01 e 03 */}
          <div className="absolute top-6 left-[16.67%] right-[16.67%] h-1 bg-slate-800/90 rounded-full">
            {/* Feixe dourado preenchendo até a etapa ativa */}
            <div
              className="h-full bg-gradient-to-r from-gold-500 via-gold-300 to-gold-400 rounded-full transition-all duration-500 ease-out shadow-[0_0_15px_rgba(212,175,55,0.7)]"
              style={{ width: `${((activeStep >= 0 ? activeStep : 0) / (stepsData.length - 1)) * 100}%` }}
            />
          </div>

          {/* 3 Marcos Interativos */}
          <div
            role="tablist"
            aria-label="Etapas do tratamento de implantes"
            className="grid grid-cols-3 gap-6 relative z-10"
          >
            {stepsData.map((step, index) => {
              const isActive = index === (activeStep >= 0 ? activeStep : 0);
              const isCompleted = index < (activeStep >= 0 ? activeStep : 0);

              return (
                <button
                  key={step.id}
                  role="tab"
                  id={`tab-${step.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${step.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveStep(index)}
                  className="group relative flex flex-col items-center text-center focus:outline-none transition-all duration-200 cursor-pointer"
                >
                  {/* Orbe numerado iluminado */}
                  <div className="mb-3 relative z-20">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-serif text-lg font-bold transition-all duration-300 relative ${
                        isActive
                          ? "bg-gradient-to-br from-gold-300 via-gold-400 to-gold-600 text-slate-950 shadow-[0_0_24px_rgba(212,175,55,0.85)] scale-110 ring-4 ring-gold-400/30"
                          : isCompleted
                          ? "bg-slate-900 text-gold-300 border-2 border-gold-400/60 shadow-md hover:scale-105"
                          : "bg-slate-950 text-slate-400 border border-slate-800 group-hover:border-slate-700 group-hover:text-slate-300"
                      }`}
                    >
                      {isCompleted ? (
                        <svg className="w-5 h-5 text-gold-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        step.stepNumber
                      )}

                      {isActive && (
                        <span className="absolute -inset-1 rounded-full border-2 border-gold-400/50 animate-pulse-subtle pointer-events-none"></span>
                      )}
                    </div>
                  </div>

                  {/* Conteúdo textual da etapa */}
                  <div className="flex flex-col items-center max-w-xs">
                    <span
                      className={`text-[10px] uppercase tracking-wider font-semibold block mb-1 ${
                        isActive ? "text-gold-300 font-bold" : "text-slate-400"
                      }`}
                    >
                      {step.phaseLabel}
                    </span>

                    <h4
                      className={`font-serif text-sm sm:text-base font-bold tracking-tight leading-snug mb-1 transition-colors duration-150 ${
                        isActive
                          ? "text-white"
                          : "text-slate-300 group-hover:text-white"
                      }`}
                    >
                      {step.title}
                    </h4>

                    <span className="text-xs text-gold-400/80 block mb-2 font-medium">
                      {step.benefitBadge}
                    </span>

                    {/* Indicador de foco */}
                    <div
                      className={`h-0.5 rounded-full transition-all duration-300 ${
                        isActive
                          ? "w-16 bg-gold-400 shadow-[0_0_8px_rgba(212,175,55,0.8)]"
                          : "w-0 bg-transparent group-hover:w-8 group-hover:bg-slate-700"
                      }`}
                    ></div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Palco Editorial da Etapa Ativa para Desktop */}
        <div
          role="tabpanel"
          id={`panel-${current.id}`}
          aria-labelledby={`tab-${current.id}`}
          className="relative bg-gradient-to-br from-slate-900/90 via-slate-950 to-slate-950 rounded-2xl border border-slate-800/80 p-6 sm:p-8 lg:p-10 shadow-2xl overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/5 rounded-full blur-[120px] pointer-events-none"></div>

          <div
            key={current.id}
            className="grid grid-cols-12 gap-8 lg:gap-10 relative z-10 animate-[heroFadeUp_260ms_cubic-bezier(0.16,1,0.3,1)_both]"
          >
            {/* COLUNA ESQUERDA (5/12): Visão Geral & CTA */}
            <div className="col-span-5 flex flex-col justify-between border-r border-slate-800/80 pr-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-300 text-xs font-semibold mb-3">
                  <span>Etapa {current.stepNumber} de 03</span>
                  <span>•</span>
                  <span>{current.benefitBadge}</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
                  {current.title}
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
                  {current.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <a
                  href={`${whatsappBaseUrl}?text=${encodeURIComponent(current.whatsappInquiry)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tactile inline-flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-slate-950 font-bold text-xs shadow-md transition-colors"
                >
                  <span>Tirar dúvidas sobre a Etapa {current.stepNumber} no WhatsApp</span>
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.297.144.35.491 1.199.534 1.286.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.353.101.173.45 0.742.965 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.043.101-.116.433-.506.549-.679.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* COLUNA DIREITA (7/12): 3 Destaques Claros e Confortáveis */}
            <div className="col-span-7 flex flex-col justify-center">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Cuidados de conforto e precisão planejados para você:</span>
              </p>

              <div className="space-y-4">
                {current.points.map((point, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800/70 hover:border-slate-700/90 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 shadow-inner mt-0.5">
                      {renderStepIcon(point.icon)}
                    </div>
                    <div>
                      <h5 className="font-serif text-sm sm:text-base font-bold text-white mb-1">
                        {point.title}
                      </h5>
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                        {point.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-slate-400/80 mt-4 font-light">
                * O tempo biológico de cicatrização, osseointegração e carga imediata varia e é avaliado individualmente pelo cirurgião-dentista em consulta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
