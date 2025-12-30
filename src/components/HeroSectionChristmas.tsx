import { MarqueeBanner } from "./MarqueeBanner";

export const HeroSectionChristmas = ({ lang = 'pt' }: { lang?: 'pt' | 'en' }) => {
  return <section className="bg-black relative overflow-hidden">

    <div className="py-4 px-4 pt-16 relative z-30">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-xl md:text-3xl font-black mb-2 text-white uppercase tracking-tight leading-tight" style={{
          textShadow: '0 4px 12px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6), 0 0 20px rgba(0,0,0,0.4)'
        }}>
          {lang === 'pt' ? "XR COMPACT POWER KIT" : "XR COMPACT POWER KIT"}
        </h1>

        <h2 className="text-xl md:text-2xl font-bold mb-6 text-christmas-gold" style={{
          textShadow: '0 3px 10px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.7), 0 0 15px rgba(0,0,0,0.5)'
        }}>
          {lang === 'pt' ? "Potência sem fio 20V MAX • Anel de fixação de 1/2\" • Controle de 4 velocidades" : "20V MAX cordless power • 1/2\" hog ring • 4-mode speed control"}
        </h2>

        <div className="mb-6">
          <img src="/dewalt-hero.jpg" alt="DEWALT® XR Compact Power Kit" className="w-full h-auto rounded-lg shadow-2xl" />
        </div>


        <p className="text-lg md:text-xl font-bold text-white mb-2" style={{
          textShadow: '0 3px 10px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.7), 0 0 15px rgba(0,0,0,0.5)'
        }}>
          {lang === 'pt' ? "5 1k+ Avaliações • Devolução Grátis • Envio Mundial • Compra Garantida" : "5 1k+ Reviews • Free Returns • Worldwide Shipping • Guaranteed Purchase"}
        </p>
      </div>
    </div>

    <MarqueeBanner lang={lang} />
  </section>;
};