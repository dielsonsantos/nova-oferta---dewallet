import { useState, useEffect } from "react";

export const BlackFridayHero = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const blackFridayDate = new Date('2025-11-29T23:59:59');
      const now = new Date();
      const difference = blackFridayDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-black via-gray-900 to-black py-12 px-4 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjE1LDAsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Black Friday Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-black px-6 py-3 rounded-full text-sm md:text-base uppercase tracking-wider shadow-lg shadow-yellow-500/50 animate-pulse">
            <span className="text-xl">⚡</span>
            BLACK NOVEMBER
            <span className="text-xl">⚡</span>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-center mb-4 text-white leading-tight">
          <span className="block text-yellow-400 drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">
            ATÉ 70% OFF
          </span>
          <span className="block mt-2">
            É O FIM DA QUEDA DE CABELO!
          </span>
        </h1>

        {/* Countdown Timer */}
        <div className="mb-8">
          <p className="text-center text-yellow-400 font-bold text-lg mb-4 uppercase tracking-wide">
            ⏰ Oferta termina em:
          </p>
          <div className="flex justify-center gap-2 md:gap-4">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-lg p-3 md:p-4 min-w-[60px] md:min-w-[80px] shadow-xl">
                <div className="text-2xl md:text-4xl font-black text-black text-center">
                  {String(value).padStart(2, '0')}
                </div>
                <div className="text-xs md:text-sm font-bold text-black text-center uppercase mt-1">
                  {unit === 'days' ? 'Dias' : unit === 'hours' ? 'Horas' : unit === 'minutes' ? 'Min' : 'Seg'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Image */}
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-yellow-400/20 blur-3xl rounded-full" />
          <img 
            src="https://welong.com.br/cdn/shop/files/gempages_538162701596099580-877e9bf9-a251-40b8-96b3-a4d3cae104ef.png?v=5546130851967160847" 
            alt="Welong Hair - Tratamento Capilar Completo" 
            className="w-full h-auto relative z-10 drop-shadow-2xl"
          />
        </div>

        {/* Subtitle */}
        <p className="text-center text-white text-lg md:text-xl mb-6 leading-relaxed">
          Conheça o tratamento que está transformando a autoestima de 
          <span className="text-yellow-400 font-bold"> milhares de mulheres </span>
          no Brasil!
        </p>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm md:text-base">
          <div className="flex items-center gap-2 text-yellow-400 font-semibold">
            <span className="text-xl">✓</span>
            <span>Frete Grátis</span>
          </div>
          <div className="flex items-center gap-2 text-yellow-400 font-semibold">
            <span className="text-xl">✓</span>
            <span>Desconto Exclusivo</span>
          </div>
          <div className="flex items-center gap-2 text-yellow-400 font-semibold">
            <span className="text-xl">✓</span>
            <span>Estoque Limitado</span>
          </div>
        </div>
      </div>
    </section>
  );
};
