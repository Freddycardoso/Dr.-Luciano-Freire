"use client";

import React, { useState, useRef, useCallback } from "react";

interface Props {
  naturalSrc: string;
  implantSrc: string;
  className?: string;
}

export function AnatomyComparisonSlider({
  naturalSrc,
  implantSrc,
  className = "",
}: Props) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignored if already released
    }
  };

  // Keyboard accessibility (arrow keys)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === "ArrowRight") {
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  // Opacity calculation for floating labels:
  // When sliderPosition moves right (>65%), the right label ("Implante de Titânio") smoothly fades out and reaches 0 by 85%
  // When sliderPosition moves left (<35%), the left label ("Dente Natural") smoothly fades out and reaches 0 by 15%
  const naturalLabelOpacity = Math.max(0, Math.min(1, (sliderPosition - 15) / 20));
  const implantLabelOpacity = Math.max(0, Math.min(1, (85 - sliderPosition) / 20));

  return (
    <div className={`w-full select-none ${className}`}>
      {/* Slider Viewport Container */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="slider"
        aria-label="Comparador de anatomia entre Dente Natural e Implante de Titânio"
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="relative w-full aspect-[4/5] max-w-[420px] mx-auto rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-[0_25px_60px_rgba(0,0,0,0.85)] cursor-ew-resize touch-none focus:outline-none focus:ring-2 focus:ring-gold-400/50"
      >
        {/* Layer 1: Implante Dentário (Fundo Direito) */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none p-4 sm:p-6 bg-radial from-slate-900/60 to-slate-950">
          <img
            src={implantSrc}
            alt="Implante Dentário de Titânio Osseointegrado e Coroa Cerâmica"
            className="w-full h-full object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.7)]"
            draggable={false}
          />

        </div>

        {/* Layer 2: Dente Natural (Sobreposição Esquerda com Clip-Path dinâmico) */}
        <div
          className={`absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none p-4 sm:p-6 bg-radial from-slate-900/60 to-slate-950 will-change-[clip-path] ${
            isDragging ? "transition-none" : "transition-all duration-700 ease-out"
          }`}
          style={{
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          }}
        >
          <img
            src={naturalSrc}
            alt="Dente Natural com Coroa de Esmalte e Raiz Biológica"
            className="w-full h-full object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.7)]"
            draggable={false}
          />

        </div>

        {/* Barra Divisória Vertical (Divider Line com Acabamento Dourado Champanhe) */}
        <div
          className={`absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-gold-400/30 via-gold-300 to-gold-400/30 z-20 pointer-events-none shadow-[0_0_12px_rgba(197,168,128,0.7)] ${
            isDragging ? "transition-none" : "transition-all duration-700 ease-out"
          }`}
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Handle Circular de Arraste Físico (Estilo Apple / Emil Kowalski) */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-950/90 backdrop-blur-lg border-2 border-gold-300 flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.7),0_0_14px_rgba(197,168,128,0.4)] transition-transform duration-150 ${
              isDragging ? "scale-110 ring-4 ring-gold-400/25" : "hover:scale-105"
            }`}
          >
            {/* Ícones de Setas Bidirecionais */}
            <svg
              className="w-4 h-4 text-gold-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M8 9l-4 3 4 3m8-6l4 3-4 3"
              />
            </svg>
          </div>
        </div>


      </div>

      {/* Botões Rápidos de Posição Pré-definida (Touch Friendly) */}
      <div className="flex items-center justify-center gap-2 mt-4 text-xs">
        <button
          type="button"
          onClick={() => setSliderPosition(95)}
          className={`btn-tactile px-3 py-1.5 rounded-lg border text-[11px] font-medium transition-colors ${
            sliderPosition > 70
              ? "bg-slate-800 text-white border-gold-400/50 shadow-sm"
              : "bg-slate-900/50 text-slate-400 border-slate-800 hover:text-slate-200"
          }`}
        >
          Ver Dente Natural
        </button>
        <button
          type="button"
          onClick={() => setSliderPosition(50)}
          className={`btn-tactile px-3 py-1.5 rounded-lg border text-[11px] font-medium transition-colors ${
            sliderPosition >= 30 && sliderPosition <= 70
              ? "bg-slate-800 text-gold-300 border-gold-400 shadow-sm"
              : "bg-slate-900/50 text-slate-400 border-slate-800 hover:text-slate-200"
          }`}
        >
          Meio a Meio
        </button>
        <button
          type="button"
          onClick={() => setSliderPosition(5)}
          className={`btn-tactile px-3 py-1.5 rounded-lg border text-[11px] font-medium transition-colors ${
            sliderPosition < 30
              ? "bg-slate-800 text-gold-300 border-gold-400/50 shadow-sm"
              : "bg-slate-900/50 text-slate-400 border-slate-800 hover:text-slate-200"
          }`}
        >
          Ver Implante
        </button>
      </div>
    </div>
  );
}
