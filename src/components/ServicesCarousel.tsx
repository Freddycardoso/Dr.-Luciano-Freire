import React, { useRef } from 'react';

// Imagens a serem importadas diretamente caso seja usado dentro do React,
// mas como estamos no Astro, podemos passar as URLs como props ou usar caminhos absolutos.
// Usaremos caminhos absolutos para /_astro/ ou /images/ se fosse no public,
// mas como estão em src/assets, o Astro pode precisar importar e passar.
// Para simplificar, vou assumir que o Astro vai passar as imagens como props.

type Service = {
  id: string;
  title: string;
  description: string;
  href: string;
  imageSrc: string;
};

type ServicesCarouselProps = {
  services: Service[];
};

export default function ServicesCarousel({ services }: ServicesCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      {/* Botões de Navegação (Desktop) */}
      <div className="hidden md:flex justify-end gap-3 mb-6 pr-4 lg:pr-8">
        <button 
          onClick={scrollLeft}
          className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-gold-700 hover:border-gold-300 hover:bg-gold-50 transition-colors shadow-sm card-tactile"
          aria-label="Anterior"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button 
          onClick={scrollRight}
          className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-gold-700 hover:border-gold-300 hover:bg-gold-50 transition-colors shadow-sm card-tactile"
          aria-label="Próximo"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      {/* Container de Scroll */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-8 px-4 sm:px-6 lg:px-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {services.map((service) => (
          <a
            key={service.id}
            href={service.href}
            className="group flex-none w-[280px] sm:w-[320px] lg:w-[360px] snap-center snap-always bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 hover:border-gold-300 transition-all duration-300 card-tactile flex flex-col"
          >
            <div className="relative h-[220px] sm:h-[260px] w-full overflow-hidden bg-slate-100">
              <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              <img 
                src={service.imageSrc} 
                alt={service.title} 
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                loading="lazy"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-2 group-hover:text-gold-700 transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                {service.description}
              </p>
              <div className="mt-auto flex items-center gap-2 text-gold-700 text-sm font-bold">
                <span>Ver detalhes</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </div>
            </div>
          </a>
        ))}
      </div>
      
      {/* Estilo embutido para esconder a scrollbar em webkit (Chrome/Safari) */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
