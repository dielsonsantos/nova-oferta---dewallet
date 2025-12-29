export const ChristmasBackground = () => {
  return (
    <>
      {/* Luzes de Natal pisca-pisca no topo */}
      <div className="fixed top-0 left-0 right-0 h-24 pointer-events-none z-10">
        {/* Fio das luzes */}
        <svg width="100%" height="80" className="absolute top-0">
          <path 
            d="M 0,30 Q 100,45 200,35 T 400,40 T 600,35 T 800,40 T 1000,35 T 1200,40 T 1400,35 T 1600,40 T 1800,35 T 2000,40" 
            stroke="rgba(101,67,33,0.5)" 
            strokeWidth="2" 
            fill="none"
          />
        </svg>
        
        {/* Luzes coloridas penduradas */}
        <div className="absolute top-0 left-0 right-0 flex justify-around px-4">
          {Array(20).fill(null).map((_, i) => {
            const colors = [
              { bg: '#ff0000', shadow: 'rgba(255,0,0,0.8)' }, // vermelho
              { bg: '#00ff00', shadow: 'rgba(0,255,0,0.8)' }, // verde
              { bg: '#ffff00', shadow: 'rgba(255,255,0,0.8)' }, // amarelo
              { bg: '#0080ff', shadow: 'rgba(0,128,255,0.8)' }, // azul
              { bg: '#ff6600', shadow: 'rgba(255,102,0,0.8)' }, // laranja
              { bg: '#ffffff', shadow: 'rgba(255,255,255,0.8)' }, // branco
            ];
            const color = colors[i % colors.length];
            const delay = (i * 0.15).toFixed(2);
            
            return (
              <div key={`christmaslight-${i}`} className="flex flex-col items-center">
                {/* Fio individual */}
                <div 
                  className="w-0.5 bg-amber-900/40"
                  style={{ height: `${25 + Math.sin(i * 0.8) * 8}px` }}
                ></div>
                {/* Lâmpada */}
                <div
                  className="rounded-full relative"
                  style={{
                    width: '14px',
                    height: '18px',
                    background: color.bg,
                    boxShadow: `0 0 20px ${color.shadow}, 0 0 30px ${color.shadow}, 0 4px 8px rgba(0,0,0,0.3)`,
                    animation: `christmasBlink ${1.2 + (i % 3) * 0.4}s ease-in-out infinite`,
                    animationDelay: `${delay}s`,
                    borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
                  }}
                >
                  {/* Brilho na lâmpada */}
                  <div 
                    className="absolute top-0.5 left-1 w-1.5 h-2 bg-white/60 rounded-full blur-sm"
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Galhos de pinheiro nos cantos superiores - Escondidos no mobile */}
      <div className="hidden md:block fixed top-0 left-0 w-64 h-48 pointer-events-none z-10 opacity-70">
        <div className="absolute top-0 left-0 text-5xl" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}>🌲</div>
      </div>
      <div className="hidden md:block fixed top-0 right-0 w-64 h-48 pointer-events-none z-10 opacity-70">
        <div className="absolute top-0 right-0 text-5xl transform scale-x-[-1]" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}>🌲</div>
      </div>

      {/* Bolas de Natal penduradas - Esquerda - Escondidas no mobile */}
      <div className="hidden md:block fixed top-0 left-12 md:left-24 pointer-events-none z-15">
        <div className="flex flex-col items-center">
          {/* Fio */}
          <div className="w-0.5 h-16 bg-gradient-to-b from-amber-800/60 to-amber-900/40"></div>
          {/* Bola vermelha */}
          <div 
            className="w-12 h-12 rounded-full relative"
            style={{
              background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 50%, #990000 100%)',
              boxShadow: '0 8px 16px rgba(0,0,0,0.4), inset -4px -4px 8px rgba(0,0,0,0.3), inset 4px 4px 8px rgba(255,255,255,0.2)',
              animation: 'swing 3s ease-in-out infinite'
            }}
          >
            <div className="absolute top-1 left-2 w-4 h-4 rounded-full bg-white/40 blur-sm"></div>
          </div>
        </div>
      </div>

      {/* Bolas de Natal penduradas - Centro-Esquerda - Escondidas no mobile */}
      <div className="hidden md:block fixed top-0 left-32 md:left-48 pointer-events-none z-15">
        <div className="flex flex-col items-center">
          <div className="w-0.5 h-20 bg-gradient-to-b from-amber-800/60 to-amber-900/40"></div>
          {/* Bola dourada */}
          <div 
            className="w-10 h-10 rounded-full relative"
            style={{
              background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 30%, #d4af37 70%, #aa8c1a 100%)',
              boxShadow: '0 8px 16px rgba(212,175,55,0.6), inset -3px -3px 6px rgba(0,0,0,0.2), inset 3px 3px 6px rgba(255,255,255,0.5)',
              animation: 'swing 3.5s ease-in-out infinite',
              animationDelay: '0.5s'
            }}
          >
            <div className="absolute top-1 left-1.5 w-3 h-3 rounded-full bg-white/50 blur-sm"></div>
          </div>
        </div>
      </div>

      {/* Bolas de Natal penduradas - Direita - Escondidas no mobile */}
      <div className="hidden md:block fixed top-0 right-12 md:right-24 pointer-events-none z-15">
        <div className="flex flex-col items-center">
          <div className="w-0.5 h-16 bg-gradient-to-b from-amber-800/60 to-amber-900/40"></div>
          {/* Bola vermelha */}
          <div 
            className="w-12 h-12 rounded-full relative"
            style={{
              background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 50%, #990000 100%)',
              boxShadow: '0 8px 16px rgba(0,0,0,0.4), inset -4px -4px 8px rgba(0,0,0,0.3), inset 4px 4px 8px rgba(255,255,255,0.2)',
              animation: 'swing 3s ease-in-out infinite',
              animationDelay: '1s'
            }}
          >
            <div className="absolute top-1 left-2 w-4 h-4 rounded-full bg-white/40 blur-sm"></div>
          </div>
        </div>
      </div>

      {/* Bolas de Natal penduradas - Centro-Direita - Escondidas no mobile */}
      <div className="hidden md:block fixed top-0 right-32 md:right-48 pointer-events-none z-15">
        <div className="flex flex-col items-center">
          <div className="w-0.5 h-20 bg-gradient-to-b from-amber-800/60 to-amber-900/40"></div>
          {/* Bola dourada */}
          <div 
            className="w-10 h-10 rounded-full relative"
            style={{
              background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 30%, #d4af37 70%, #aa8c1a 100%)',
              boxShadow: '0 8px 16px rgba(212,175,55,0.6), inset -3px -3px 6px rgba(0,0,0,0.2), inset 3px 3px 6px rgba(255,255,255,0.5)',
              animation: 'swing 3.5s ease-in-out infinite',
              animationDelay: '1.5s'
            }}
          >
            <div className="absolute top-1 left-1.5 w-3 h-3 rounded-full bg-white/50 blur-sm"></div>
          </div>
        </div>
      </div>

      {/* Sinos dourados - Escondidos no mobile */}
      <div className="hidden md:block fixed top-24 left-1/2 -translate-x-1/2 pointer-events-none z-15 opacity-80">
        <div className="flex gap-2 items-end">
          <div 
            className="text-3xl"
            style={{ 
              filter: 'drop-shadow(0 4px 8px rgba(212,175,55,0.6))',
              animation: 'bellSwing 2s ease-in-out infinite'
            }}
          >
            🔔
          </div>
          <div 
            className="text-4xl"
            style={{ 
              filter: 'drop-shadow(0 4px 8px rgba(212,175,55,0.6))',
              animation: 'bellSwing 2s ease-in-out infinite',
              animationDelay: '0.3s'
            }}
          >
            🔔
          </div>
        </div>
      </div>

      {/* Estrelas brilhantes espalhadas - Escondidas no mobile */}
      {[
        { top: '15%', left: '20%', size: 'text-xl', delay: '0s' },
        { top: '12%', left: '45%', size: 'text-lg', delay: '0.5s' },
        { top: '18%', left: '75%', size: 'text-xl', delay: '1s' },
        { top: '25%', left: '85%', size: 'text-base', delay: '1.5s' },
        { top: '22%', left: '10%', size: 'text-base', delay: '2s' },
      ].map((star, i) => (
        <div
          key={`star-${i}`}
          className={`hidden md:block fixed ${star.size} pointer-events-none z-8 opacity-60`}
          style={{
            top: star.top,
            left: star.left,
            filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.8))',
            animation: 'twinkle 2s ease-in-out infinite',
            animationDelay: star.delay
          }}
        >
          ⭐
        </div>
      ))}

      {/* Estrelas pequenas adicionais - Escondidas no mobile */}
      {[
        { top: '20%', left: '30%', delay: '0.2s' },
        { top: '16%', left: '60%', delay: '0.8s' },
        { top: '23%', left: '50%', delay: '1.2s' },
        { top: '19%', left: '90%', delay: '1.8s' },
      ].map((star, i) => (
        <div
          key={`smallstar-${i}`}
          className="hidden md:block fixed text-xs pointer-events-none z-8 opacity-50"
          style={{
            top: star.top,
            left: star.left,
            filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.9))',
            animation: 'twinkle 1.5s ease-in-out infinite',
            animationDelay: star.delay
          }}
        >
          ✨
        </div>
      ))}
      
      <style>{`
        @keyframes swing {
          0%, 100% {
            transform: rotate(-3deg);
          }
          50% {
            transform: rotate(3deg);
          }
        }

        @keyframes bellSwing {
          0%, 100% {
            transform: rotate(-8deg);
          }
          50% {
            transform: rotate(8deg);
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes christmasBlink {
          0%, 100% {
            opacity: 1;
            filter: brightness(1.2);
          }
          50% {
            opacity: 0.4;
            filter: brightness(0.6);
          }
        }
      `}</style>
    </>
  );
};
