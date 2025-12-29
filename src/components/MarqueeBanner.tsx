export const MarqueeBanner = ({ lang = 'pt' }: { lang?: 'pt' | 'en' }) => {
  return (
    <div className="w-full relative overflow-hidden bg-[#FFC205]" style={{ height: '48px', display: 'flex', alignItems: 'center' }}>
      {/* Marquee Content */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-content {
          animation: marquee 40s linear infinite; /* Slower speed (was 20s) */
          display: flex;
          width: fit-content;
          align-items: center;
        }
      `}</style>
      <div className="marquee-content">
        <div className="flex whitespace-nowrap shrink-0 items-center">
          {Array(8).fill(null).map((_, i) => (
            <div key={i} className="inline-flex items-center gap-12 mr-12">
              <span className="text-[#000000] font-bold text-xl uppercase leading-none" style={{ fontFamily: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif', letterSpacing: '0.05em' }}>
                {lang === 'pt' ? "GIRE A ROLETA E DESCUBRA SEU DESCONTO" : "SPIN THE WHEEL AND REVEAL YOUR DISCOUNT"}
              </span>
              <img src="/dewalt-logo.png" alt="DeWalt" className="h-7 w-auto object-contain" />
            </div>
          ))}
        </div>
        <div className="flex whitespace-nowrap shrink-0 items-center">
          {Array(8).fill(null).map((_, i) => (
            <div key={i} className="inline-flex items-center gap-12 mr-12">
              <span className="text-[#000000] font-bold text-xl uppercase leading-none" style={{ fontFamily: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif', letterSpacing: '0.05em' }}>
                {lang === 'pt' ? "GIRE A ROLETA E DESCUBRA SEU DESCONTO" : "SPIN THE WHEEL AND REVEAL YOUR DISCOUNT"}
              </span>
              <img src="/dewalt-logo.png" alt="DeWalt" className="h-7 w-auto object-contain" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
