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
        aria-label="Comparador anatômico interativo: Dente Natural versus Implante de Titânio"
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="relative w-full aspect-[4/5] max-w-[420px] mx-auto rounded-2xl overflow-hidden bg-white border border-brand-pale shadow-card cursor-ew-resize touch-none focus:outline-none focus:ring-2 focus:ring-brand-blue"
      >
        {/* Layer 1: Implante Dentário (Fundo Direito) */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none p-4 sm:p-6 bg-gradient-to-b from-white via-surface-subtle to-white">
          <img
            src={implantSrc}
            alt="Ilustração anatômica de implante dentário de titânio osseointegrado na mandíbula com coroa cerâmica sobreposta"
            className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(66,107,178,0.15)]"
            width={400}
            height={300}
            draggable={false}
          />
        </div>

        {/* Layer 2: Dente Natural (Sobreposição Esquerda com Clip-Path dinâmico) */}
        <div
          className={`absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none p-4 sm:p-6 bg-gradient-to-b from-white via-surface-subtle to-white will-change-[clip-path] ${
            isDragging ? "transition-none" : "transition-all duration-700 ease-out"
          }`}
          style={{
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          }}
        >
          <img
            src={naturalSrc}
            alt="Ilustração anatômica de dente natural saudável exibindo esmalte, dentina e raiz biológica ancorada no osso"
            className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(66,107,178,0.15)]"
            width={400}
            height={300}
            draggable={false}
          />
        </div>

        {/* Barra Divisória Vertical com tom Brand Blue */}
        <div
          className={`absolute top-0 bottom-0 w-[2px] bg-brand-blue z-20 pointer-events-none shadow-[0_0_10px_rgba(66,107,178,0.5)] ${
            isDragging ? "transition-none" : "transition-all duration-700 ease-out"
          }`}
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Handle Circular de Arraste (Mínimo 48x48px para acessibilidade ao toque) */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-2 border-brand-blue flex items-center justify-center shadow-lg transition-transform duration-150 ${
              isDragging ? "scale-110 ring-4 ring-brand-blue/25" : "hover:scale-105"
            }`}
          >
            {/* Ícones de Setas Bidirecionais */}
            <svg
              className="w-5 h-5 text-brand-blue"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
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

      {/* Botões Rápidos de Posição Pré-definida (Mínimo 48px de altura de toque, texto 16px) */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mt-5">
        <button
          type="button"
          onClick={() => setSliderPosition(95)}
          className={`btn-tactile min-h-[48px] px-4 py-2.5 rounded-xl border text-base font-semibold transition-all duration-150 ${
            sliderPosition > 70
              ? "bg-brand-blue text-white border-brand-blue shadow-sm"
              : "bg-white text-brand-dark border-brand-pale hover:bg-surface-subtle hover:text-brand-deep"
          }`}
        >
          Ver Dente Natural
        </button>
        <button
          type="button"
          onClick={() => setSliderPosition(50)}
          className={`btn-tactile min-h-[48px] px-4 py-2.5 rounded-xl border text-base font-semibold transition-all duration-150 ${
            sliderPosition >= 30 && sliderPosition <= 70
              ? "bg-brand-blue text-white border-brand-blue shadow-sm"
              : "bg-white text-brand-dark border-brand-pale hover:bg-surface-subtle hover:text-brand-deep"
          }`}
        >
          Meio a Meio
        </button>
        <button
          type="button"
          onClick={() => setSliderPosition(5)}
          className={`btn-tactile min-h-[48px] px-4 py-2.5 rounded-xl border text-base font-semibold transition-all duration-150 ${
            sliderPosition < 30
              ? "bg-brand-blue text-white border-brand-blue shadow-sm"
              : "bg-white text-brand-dark border-brand-pale hover:bg-surface-subtle hover:text-brand-deep"
          }`}
        >
          Ver Implante
        </button>
      </div>
    </div>
  );
}
