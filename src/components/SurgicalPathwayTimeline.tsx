"use client";

import React, { useState } from "react";

interface StepData {
  id: string;
  stepNumber: string;
  phaseLabel: string;
  title: string;
  benefitBadge: string;
  clinicalSummary: string;
  clinicalSteps: { label: string; desc: string }[];
  sensorySummary: string;
  sensoryPoints: { title: string; reassurance: string; icon: string }[];
  peaceCommitment: string;
  whatsappInquiry: string;
}

function renderSensoryIcon(icon: string) {
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
    case "view3d":
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
          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      );
    case "dialogue":
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
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          <path d="M8 9h8M8 13h5" />
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
    case "calm":
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
          <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "leaf":
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
          <path d="M11 20A7 7 0 014 13C4 7 11 3 20 3c0 9-4 16-9 17z" />
          <path d="M11 20c-1-3 1-7 9-17" />
        </svg>
      );
    case "mastication":
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
          <circle cx="12" cy="5" r="3" />
          <line x1="12" y1="8" x2="12" y2="21" />
          <path d="M5 12h14M5 17h14" />
        </svg>
      );
    case "smile":
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
          <path d="M8 13.5s1.5 2.5 4 2.5 4-2.5 4-2.5" />
          <circle cx="9" cy="9.5" r="1" fill="currentColor" />
          <circle cx="15" cy="9.5" r="1" fill="currentColor" />
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
          <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
          <path d="M2 9h20M10 3l2 6-2 12M14 3l-2 6 2 12" />
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
    phaseLabel: "Fase I • Mapeamento Digital",
    title: "Diagnóstico 3D e Tomografia Guiada",
    benefitBadge: "Sem moldagem desconfortável",
    clinicalSummary:
      "Mapeamento tomográfico tridimensional dos maxilares, nervos e densidade óssea, dispensando totalmente as antigas moldagens desconfortáveis com massa.",
    clinicalSteps: [
      {
        label: "Tomografia Cone Beam In-Loco",
        desc: "Digitalização óssea computadorizada de alta resolução realizada no próprio consultório, sem necessidade de deslocamento para clínicas externas de imagem.",
      },
      {
        label: "Planejamento Cirúrgico Virtual",
        desc: "O Dr. Luciano simula a angulação e posição exata de cada implante no software 3D antes de qualquer intervenção.",
      },
      {
        label: "Guia Cirúrgico de Precisão Micrométrica",
        desc: "Impressão de guia milimétrico individualizado que direciona a fixação com precisão cirúrgica sem cortes desnecessários.",
      },
    ],
    sensorySummary:
      "Uma conversa acolhedora e esclarecedora. Você senta confortavelmente, sem nenhum desconforto físico, e entende cada detalhe da sua saúde bucal.",
    sensoryPoints: [
      {
        title: "Zero Massinha na Boca",
        reassurance: "Escaneamento digital rápido e limpo, sem náuseas ou aquela sensação incômoda de asfixia das moldagens tradicionais.",
        icon: "scan",
      },
      {
        title: "Você Vê o Sorriso Antes de Começar",
        reassurance: "Simulação tridimensional em tela grande da sua futura mastigação e estética para sua total aprovação prévia.",
        icon: "view3d",
      },
      {
        title: "Tempo Aberto Para Todas as Suas Dúvidas",
        reassurance: "O Dr. Luciano explica o plano de forma simples, humana e transparente, sem termos técnicos difíceis ou pressa.",
        icon: "dialogue",
      },
    ],
    peaceCommitment:
      "Você nunca entra em cirurgia com incertezas: cada milímetro do seu caso já foi planejado, testado e aprovado previamente por você.",
    whatsappInquiry:
      "Olá, Dr. Luciano. Gostaria de entender como funciona a avaliação inicial com tomografia 3D para o meu caso.",
  },
  {
    id: "fase-cirurgia",
    stepNumber: "02",
    phaseLabel: "Fase II • Intervenção Confortável",
    title: "Cirurgia Confortável e Anestesia Precisa",
    benefitBadge: "Protocolo com zero dor",
    clinicalSummary:
      "Inserção milimétrica do implante de titânio biocompatível através do guia cirúrgico computadorizado, sem retalhos extensos e com máxima preservação gengival.",
    clinicalSteps: [
      {
        label: "Anestesia Local Computadorizada",
        desc: "Injeção gradual milimétrica com bloqueio neural completo e localizado da dor, eliminando o desconforto tradicional da agulhada.",
      },
      {
        label: "Inserção Guiada Minimamente Invasiva",
        desc: "O pino é posicionado diretamente no ponto ósseo planejado de forma rápida e precisa em relação à técnica convencional.",
      },
      {
        label: "Sutura Biológica Delicada",
        desc: "Microfios de sutura que não repuxam a gengiva, minimizando sangramento e acelerando a cicatrização natural.",
      },
    ],
    sensorySummary:
      "A maior surpresa dos nossos pacientes: você não sente dor alguma durante o procedimento. O ambiente é calmo, climatizado e com música suave de relaxamento.",
    sensoryPoints: [
      {
        title: "Bloqueio Absoluto da Dor",
        reassurance: "A tecnologia anestésica garante que você sinta apenas o toque suave do instrumento, sem qualquer pontada dolorosa.",
        icon: "shield",
      },
      {
        title: "Ambiente Calmo, Climatizado e Seguro",
        reassurance: "Música de relaxamento, iluminação acolhedora e pausas no atendimento sempre que você desejar respirar.",
        icon: "calm",
      },
      {
        title: "Pós-Operatório Sereno em Casa",
        reassurance: "Medicação preventiva administrada antes de você sair do consultório. A imensa maioria dos pacientes não precisa de analgésicos fortes.",
        icon: "leaf",
      },
    ],
    peaceCommitment:
      "9 em cada 10 pacientes relatam com alívio: 'Doutor, não senti nada! Se soubesse que era tão simples, teria feito anos atrás'.",
    whatsappInquiry:
      "Olá, Dr. Luciano. Tenho receio de dor em cirurgias odontológicas e gostaria de saber mais sobre o protocolo sem dor.",
  },
  {
    id: "fase-sorriso",
    stepNumber: "03",
    phaseLabel: "Fase III • Reabilitação Definitiva",
    title: "Instalação do Sorriso Fixo em Cerâmica",
    benefitBadge: "Resultado definitivo e fixo",
    clinicalSummary:
      "Fixação milimétrica das coroas esculpidas em zircônia ou porcelana nobre de alta biocompatibilidade sobre os implantes já integrados ao osso.",
    clinicalSteps: [
      {
        label: "Coroas em Porcelana Pura ou Zircônia",
        desc: "Translucidez, reflexo de luz e tonalidade idênticos ao esmalte dental natural mais exigente, sem faixas metálicas escuras.",
      },
      {
        label: "Ajuste Oclusal Micrométrico",
        desc: "Calibragem precisa da mordida para distribuição perfeita de força mastigatória entre todos os dentes.",
      },
      {
        label: "Travamento Rígido Definitivo",
        desc: "Dentes 100% fixos que nunca se soltam, não exigem cola adesiva e deixam o céu da boca totalmente desobstruído.",
      },
    ],
    sensorySummary:
      "A sensação libertadora de morder uma fruta, mastigar carne com firmeza e sorrir em fotos espontâneas sem colocar a mão na boca.",
    sensoryPoints: [
      {
        title: "Mastigação Firme e Poderosa",
        reassurance: "Você volta a comer carnes, castanhas e alimentos crocantes com estabilidade absoluta e sem machucar a gengiva.",
        icon: "mastication",
      },
      {
        title: "Estética Natural Irretocável",
        reassurance: "Ninguém nota que é um implante: os dentes parecem ter nascido com você, no tamanho e tom perfeitos para o seu rosto.",
        icon: "smile",
      },
      {
        title: "Liberdade Total Sem Cola ou Resina",
        reassurance: "Sem céu da boca tapado de resina, sem aftas causadas por dentadura móvel e sem o medo de passar constrangimento em público.",
        icon: "freedom",
      },
    ],
    peaceCommitment:
      "Mais do que recuperar dentes, você recupera a dignidade de sorrir em público e o prazer de se alimentar em família.",
    whatsappInquiry:
      "Olá, Dr. Luciano. Gostaria de saber mais sobre a fixação do sorriso em porcelana e prótese protocolo fixa.",
  },
];

interface Props {
  whatsappBaseUrl?: string;
}

export const SurgicalPathwayTimeline: React.FC<Props> = ({
  whatsappBaseUrl = "https://wa.me/5535988215162",
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"sensorial" | "clinico">("sensorial");

  const current = stepsData[activeStep];
  const progressPercent = (activeStep / (stepsData.length - 1)) * 100;

  return (
    <div className="w-full">
      {/* =========================================================================
          CONTROLE DE PERSPECTIVA (HUMANO vs. TÉCNICO)
          - Alterne entre a vivência de alívio e a precisão cirúrgica
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 pb-6 border-b border-slate-800/80">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-gold-400 font-semibold block mb-1">
            Perspectiva do Paciente
          </span>
          <p className="text-xs sm:text-sm text-slate-300">
            Alterne entre a <strong className="text-white font-medium">experiência sensorial de conforto</strong> e os <strong className="text-white font-medium">detalhes técnicos do protocolo</strong>:
          </p>
        </div>

        <div
          role="group"
          aria-label="Alternar perspectiva de visualização"
          className="inline-flex items-center p-1 rounded-full bg-slate-900/90 border border-slate-800 shadow-inner shrink-0"
        >
          <button
            type="button"
            onClick={() => setViewMode("sensorial")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
              viewMode === "sensorial"
                ? "bg-gradient-to-r from-gold-500 to-gold-400 text-slate-950 shadow-md font-bold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <svg
              className="w-3.5 h-3.5 stroke-[1.8] text-current"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
            <span>O que Você Sente na Cadeira</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode("clinico")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
              viewMode === "clinico"
                ? "bg-slate-800 text-gold-300 border border-gold-400/30 shadow-md font-bold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <svg
              className="w-3.5 h-3.5 stroke-[1.8] text-current"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
            </svg>
            <span>O Procedimento Clínico</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          TRILHA CIRÚRGICA CONTÍNUA (THE LUMINOUS ARTERIAL TRACK)
          - Design fluido e orgânico: sem caixas ou cards retangulares
          - Linha dourada arterial visível conectando com precisão os 3 marcos
          ========================================================================= */}
      <div className="relative mb-14 px-2 sm:px-6">
        {/* Trilho de base arterial entre o centro do Marco 01 e o Marco 03 */}
        <div className="absolute top-6 left-[16.67%] right-[16.67%] h-1 bg-slate-800/90 rounded-full hidden md:block">
          {/* Feixe de luz dourada dinâmico animado preenchendo até a etapa ativa */}
          <div
            className="h-full bg-gradient-to-r from-gold-500 via-gold-300 to-gold-400 rounded-full transition-all duration-500 ease-out shadow-[0_0_15px_rgba(212,175,55,0.7)]"
            style={{ width: `${(activeStep / (stepsData.length - 1)) * 100}%` }}
          />
        </div>

        {/* Waypoints interativos (3 marcos fluidos sem caixas de card) */}
        <div
          role="tablist"
          aria-label="Etapas do tratamento cirúrgico"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
        >
          {stepsData.map((step, index) => {
            const isActive = index === activeStep;
            const isCompleted = index < activeStep;

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
                {/* Orbe numerado iluminado sobre a linha */}
                <div className="mb-4 relative z-20">
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

                    {/* Halo de pulso suave no marco ativo */}
                    {isActive && (
                      <span className="absolute -inset-1 rounded-full border-2 border-gold-400/50 animate-pulse-subtle pointer-events-none"></span>
                    )}
                  </div>
                </div>

                {/* Conteúdo textual da etapa abaixo da linha (nunca cortado pela linha) */}
                <div className="flex flex-col items-center max-w-xs">
                  <span
                    className={`text-[10px] uppercase tracking-wider font-semibold block mb-1 ${
                      isActive ? "text-gold-300 font-bold" : "text-slate-400"
                    }`}
                  >
                    {step.phaseLabel}
                  </span>

                  <h4
                    className={`font-serif text-base sm:text-lg font-bold tracking-tight leading-snug mb-1 transition-colors duration-150 ${
                      isActive
                        ? "text-white"
                        : "text-slate-300 group-hover:text-white"
                    }`}
                  >
                    {step.title}
                  </h4>

                  <span className="text-xs text-gold-400/80 block mb-3 font-medium">
                    {step.benefitBadge}
                  </span>

                  {/* Indicador de foco sutil */}
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

      {/* =========================================================================
          PALCO EDITORIAL DA ETAPA ATIVA (COMPLETAMENTE CARDLESS)
          - Layout editorial sofisticado de 2 colunas
          - Nada de cartões aninhados dentro de cartões
          ========================================================================= */}
      <div
        role="tabpanel"
        id={`panel-${current.id}`}
        aria-labelledby={`tab-${current.id}`}
        className="relative bg-gradient-to-br from-slate-900/90 via-slate-950 to-slate-950 rounded-3xl border border-slate-800/80 p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden"
      >
        {/* Glow atmosférico suave */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-400/5 rounded-full blur-[140px] pointer-events-none"></div>

        <div
          key={`${current.id}-${viewMode}`}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10 animate-[heroFadeUp_260ms_cubic-bezier(0.16,1,0.3,1)_both]"
        >
          
          {/* =====================================================================
              COLUNA ESQUERDA (5/12): Visão Geral & Selo de Compromisso
              ===================================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800/80 pb-8 lg:pb-0 lg:pr-8">
            <div>
              {/* Tag da Fase Ativa */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-300 text-xs font-semibold mb-4">
                <span>Etapa {current.stepNumber} de 03</span>
                <span>•</span>
                <span>{current.phaseLabel}</span>
              </div>

              {/* Título Principal */}
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                {current.title}
              </h3>

              {/* Resumo Dinâmico Conforme a Perspectiva */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                {viewMode === "sensorial" ? current.sensorySummary : current.clinicalSummary}
              </p>
            </div>

            {/* Selo de Garantia Ética do Cirurgião */}
            <div className="pt-6 border-t border-slate-800/80">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-gold-300 text-2xl shrink-0 leading-none">“</span>
                <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                  {current.peaceCommitment}
                </p>
              </div>

              {/* Botão de Dúvida Rápida no WhatsApp */}
              <a
                href={`${whatsappBaseUrl}?text=${encodeURIComponent(current.whatsappInquiry)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-whatsapp/15 hover:bg-whatsapp/25 text-whatsapp border border-whatsapp/30 text-xs font-bold transition-all duration-150"
              >
                <span>Tirar dúvidas sobre a Etapa {current.stepNumber} no WhatsApp</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* =====================================================================
              COLUNA DIREITA (7/12): Lista Editorial de Pontos-Chave (SEM CARDS)
              ===================================================================== */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Cabeçalho da Perspectiva */}
              <div className="flex items-center gap-2 mb-6">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    viewMode === "sensorial" ? "bg-emerald-400 animate-pulse" : "bg-gold-400"
                  }`}
                ></span>
                <span
                  className={`text-xs font-bold uppercase tracking-wider ${
                    viewMode === "sensorial" ? "text-emerald-400" : "text-gold-300"
                  }`}
                >
                  {viewMode === "sensorial"
                    ? "Garantias Reais de Conforto e Ausência de Dor"
                    : "Rigor Técnico e Tecnologia de Ponta Utilizada"}
                </span>
              </div>

              {/* Lista Editorial Fluida (Divisores Finos, Sem Cards Box) */}
              <div className="space-y-6">
                {viewMode === "sensorial"
                  ? current.sensoryPoints.map((point, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-4 pb-6 border-b border-slate-800/60 last:border-b-0 last:pb-0"
                      >
                        <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 shadow-inner">
                          {renderSensoryIcon(point.icon)}
                        </div>
                        <div>
                          <h5 className="font-serif text-base sm:text-lg font-bold text-white mb-1">
                            {point.title}
                          </h5>
                          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                            {point.reassurance}
                          </p>
                        </div>
                      </div>
                    ))
                  : current.clinicalSteps.map((step, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-4 pb-6 border-b border-slate-800/60 last:border-b-0 last:pb-0"
                      >
                        <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center font-serif text-gold-300 font-bold text-sm shrink-0 shadow-inner">
                          0{i + 1}
                        </div>
                        <div>
                          <h5 className="font-serif text-base sm:text-lg font-bold text-white mb-1">
                            {step.label}
                          </h5>
                          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    ))}
              </div>
            </div>

            {/* Controles de Navegação Rápida entre as Etapas */}
            <div className="pt-8 mt-8 border-t border-slate-800/80 flex items-center justify-between">
              <button
                type="button"
                disabled={activeStep === 0}
                onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all duration-150 ${
                  activeStep === 0
                    ? "opacity-30 border-slate-850 text-slate-600 cursor-not-allowed"
                    : "border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800/80"
                }`}
              >
                ← Etapa Anterior
              </button>

              <span className="text-xs text-slate-400 font-medium">
                Etapa {activeStep + 1} de {stepsData.length}
              </span>

              <button
                type="button"
                disabled={activeStep === stepsData.length - 1}
                onClick={() =>
                  setActiveStep((prev) => Math.min(stepsData.length - 1, prev + 1))
                }
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all duration-150 ${
                  activeStep === stepsData.length - 1
                    ? "opacity-30 border-slate-850 text-slate-600 cursor-not-allowed"
                    : "border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800/80"
                }`}
              >
                Próxima Etapa →
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
