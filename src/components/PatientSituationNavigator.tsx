"use client";

import React, { useState } from "react";

interface Situation {
  id: string;
  tabLabel: string;
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
    iconType: "tooth",
    badge: "Implante Unitário ou Múltiplo",
    title: "Recupere o dente fixo sem desgastar os dentes vizinhos saudáveis",
    painPoint:
      "A insegurança ao sorrir em fotos, a dificuldade de mastigar no lado onde falta o dente e o receio silencioso de que os dentes vizinhos comecem a entortar ou o osso atrofie com o tempo.",
    solution:
      "Instalamos um pino de titânio biocompatível milimétrico que funciona exatamente como a raiz biológica do dente. Sobre ele, uma coroa de porcelana pura personalizada é parafusada com a mesma cor, translucidez e força dos seus dentes naturais.",
    highlights: [
      "Sem desgaste ou agressão aos dentes vizinhos saudáveis",
      "Mastigação 100% restabelecida com força normal",
      "Procedimento rápido sob anestesia local de última geração sem dor",
      "Planejamento tridimensional guiado por tomografia computadorizada",
    ],
    ctaLabel: "Avaliar Implante de Dente com o Dr. Luciano",
    whatsappMessage:
      "Olá, Dr. Luciano. Perdi dente(s) e gostaria de agendar uma avaliação para implante dentário no consultório.",
  },
  {
    id: "protese-protocolo",
    tabLabel: "Uso dentadura ou perdi todos os dentes",
    iconType: "lock",
    badge: "Prótese Protocolo Fixo (All-on-4 / All-on-6)",
    title: "Diga adeus à cola, à dentadura solta e ao céu da boca tapado de resina",
    painPoint:
      "A apreensão constante da prótese se deslocar ao rir, falar ou mastigar, as feridas e aftas causadas pelo atrito na gengiva e a perda do sabor e temperatura dos alimentos por causa da resina no palato.",
    solution:
      "Substituímos a dentadura móvel por uma arcada completa de dentes fixos parafusados sobre 4 a 6 implantes de titânio. O céu da boca fica totalmente livre, o sorriso nunca se move e você volta a mastigar carnes, castanhas e maçãs com segurança absoluta.",
    highlights: [
      "Fim definitivo da cola fixadora e do medo de passar vergonha",
      "Céu da boca 100% livre para sentir o sabor real de todas as refeições",
      "Dentes travados e fixos: não saem, não machucam e não soltam ao falar",
      "Recuperação imediata da mastigação firme e do contorno jovem da face",
    ],
    ctaLabel: "Saber Como Trocar a Dentadura por Dentes Fixos",
    whatsappMessage:
      "Olá, Dr. Luciano. Uso prótese/dentadura móvel e gostaria de saber como funciona o protocolo de dentes fixos para o meu caso.",
  },
  {
    id: "pouco-osso",
    tabLabel: "Disseram que tenho pouco osso",
    iconType: "shield",
    badge: "Técnicas Biológicas e Regeneração Óssea",
    title: "Perda óssea não impede você de voltar a ter dentes fixos e firmes",
    painPoint:
      "A frustração de ter consultado profissionais no passado que disseram que seu caso 'não tinha osso suficiente' ou que seria arriscado, gerando conformismo com o sofrimento de uma dentadura frouxa.",
    solution:
      "Com tomografia 3D de alta resolução, mapeamos áreas nobres de osso remanescente que a radiografia panorâmica simples não consegue enxergar. Utilizamos implantes curtos, angulados e técnicas modernas de enxerto biomaterial seguro, com pós-operatório calmo e planejado.",
    highlights: [
      "Diagnóstico preciso por tomografia digital tridimensional",
      "Técnicas que evitam cirurgias hospitalares invasivas",
      "Enxertos e biomateriais biocompatíveis de alto padrão",
      "Solução real mesmo para quem perdeu dentes há 10, 20 ou 30 anos",
    ],
    ctaLabel: "Solicitar Avaliação de Implante para Pouco Osso",
    whatsappMessage:
      "Olá, Dr. Luciano. Já me disseram que tenho pouco osso e gostaria de saber se meu caso tem indicação para implantes.",
  },
  {
    id: "estetica-alinhamento",
    tabLabel: "Quero alinhar ou clarear meu sorriso",
    iconType: "sparkle",
    badge: "Ortodontia e Lentes de Contato em Porcelana",
    title: "Harmonia estética, cor natural e função mastigatória equilibrada",
    painPoint:
      "O incômodo estético com dentes manchados, apinhados, espaçados (diastemas) ou envelhecidos pelo atrito e bruxismo, prejudicando a confiança no trabalho e na vida social.",
    solution:
      "Planejamos a harmonia do sorriso respeitando as proporções naturais do seu rosto. Combinamos alinhamento ortodôntico contemporâneo com facetas e lentes de contato em cerâmica pura de alta translucidez, que mantêm o brilho e não amarelam.",
    highlights: [
      "Cerâmica vítrea nobre que não mancha com café, vinho ou tempo",
      "Preservação máxima da estrutura biológica natural do dente",
      "Design do sorriso planejado e aprovado antes de confeccionar as peças",
      "Correção de mordida e alinhamento para todas as idades",
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
      {/* Botões das Situações (Abas Horizontais com Scroll Suave no Mobile) */}
      <div
        role="tablist"
        aria-label="Selecione sua situação clínica"
        className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-4 pt-1 px-1 scrollbar-none snap-x"
      >
        {situations.map((item) => {
          const isActive = item.id === activeTab;
          return (
            <button
              key={item.id}
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
          className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start animate-[heroFadeUp_280ms_cubic-bezier(0.16,1,0.3,1)_both]"
        >
          
          {/* Coluna Esquerda: O Desafio Real vs A Solução do Dr. Luciano */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Badge da Especialidade Técnica */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/12 text-gold-300 text-[11px] font-bold uppercase tracking-wider border border-gold-400/25 mb-4">
                <span>{current.badge}</span>
              </div>

              {/* Título Principal Focado no Paciente */}
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug mb-5">
                {current.title}
              </h3>

              {/* O que você sente hoje (A Dor) */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 mb-5">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400/80"></span>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    O incômodo no seu dia a dia
                  </p>
                </div>
                <p className="text-sm text-slate-300/90 leading-relaxed font-light">
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
            </div>

            {/* Ação WhatsApp Direta */}
            <div className="pt-5 border-t border-slate-800/90 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-whatsapp text-slate-950 font-bold text-sm hover:bg-whatsapp-hover shadow-[0_4px_20px_rgba(37,211,102,0.22)]"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.297.144.35.491 1.199.534 1.286.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.353.101.173.45 0.742.965 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.043.101-.116.433-.506.549-.679.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" />
                </svg>
                <span>{current.ctaLabel}</span>
              </a>
              <span className="text-xs text-slate-400 text-center sm:text-left">
                Conversa preliminar e confidencial direto no WhatsApp
              </span>
            </div>
          </div>

          {/* Coluna Direita: Pilares de Confiança & Tranquilidade */}
          <div className="lg:col-span-5 bg-slate-950/70 rounded-xl p-5 sm:p-6 border border-slate-800/80 flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>O que você tem garantido neste tratamento:</span>
              </p>
              
              <ul className="space-y-3.5 mb-6">
                {current.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                    <svg className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Micro Card de Aval do Especialista */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gold-400/15 border border-gold-400/30 text-gold-300 font-bold text-xs flex items-center justify-center shrink-0">
                LF
              </div>
              <div className="text-xs">
                <p className="font-semibold text-white">Dr. Luciano Alves Freire</p>
                <p className="text-slate-400 text-[11px]">Planejamento e execução pessoal • CRO-MG 25170</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
