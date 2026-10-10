const fs = require('fs');
const files = [
  'src/pages/servicos/implantes.astro',
  'src/pages/servicos/protocolo.astro',
  'src/pages/servicos/estetica.astro',
  'src/pages/servicos/ortodontia.astro'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Extract URL
  const urlMatch = content.match(/<a href=\"(https:\/\/wa\.me\/[^\"]+)\" class=\"btn-tactile/);
  const url = urlMatch ? urlMatch[1] : 'https://wa.me/5535988215162';

  const newSections = `  <!-- DEPOIMENTOS (A ser preenchido) -->
  <section class="py-20 bg-babyblue-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-3xl font-serif font-bold text-slate-900 mb-4">O que dizem nossos pacientes</h2>
        <p class="text-slate-600">Histórias reais de transformações.</p>
      </div>
      <div class="flex justify-center items-center text-slate-400 italic text-sm border-2 border-dashed border-slate-200 rounded-3xl p-12">
        [Área reservada para depoimentos. Não inserimos depoimentos falsos.]
      </div>
    </div>
  </section>

  <!-- ANTES E DEPOIS (A ser preenchido) -->
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-3xl font-serif font-bold text-slate-900 mb-4">Casos Clínicos: Antes e Depois</h2>
        <p class="text-slate-600">Resultados alcançados com técnica e precisão.</p>
      </div>
      <div class="flex justify-center items-center text-slate-400 italic text-sm border-2 border-dashed border-slate-200 rounded-3xl p-12">
        [Área reservada para imagens de antes e depois. Serão adicionadas fotos reais.]
      </div>
    </div>
  </section>

  <!-- CTA FINAL -->
  <section class="py-24 bg-babyblue-50 text-center relative overflow-hidden border-t border-slate-200">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <h2 class="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mb-6">Pronto para transformar seu sorriso?</h2>
      <p class="text-slate-600 mb-10 text-lg">Dê o primeiro passo para recuperar sua qualidade de vida. Agende sua avaliação.</p>
      <a href="${url}" class="btn-tactile inline-flex items-center gap-2 bg-gold-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-gold-500 transition-colors">
        Falar com a Equipe
      </a>
    </div>
  </section>

  <Footer />
</Layout>
`;

  const replaceRegex = /<!-- CTA FINAL -->[\s\S]*<\/Layout>\s*$/;
  content = content.replace(replaceRegex, newSections);
  
  fs.writeFileSync(file, content, 'utf8');
  console.log('Updated ' + file);
});
