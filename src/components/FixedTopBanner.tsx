import { useState, useEffect } from "react";

export const FixedTopBanner = ({ lang = 'pt' }: { lang?: 'pt' | 'en' }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const productInfoSection = document.getElementById('product-info-section');
      if (productInfoSection) {
        const rect = productInfoSection.getBoundingClientRect();
        setScrolled(rect.top < 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-christmas-gold py-2 px-2 md:px-4 text-center fixed top-0 left-0 right-0 z-50 flex items-center justify-between md:justify-center gap-1 md:gap-3 shadow-lg">
      <div className="flex items-center justify-center w-[18%] md:w-auto shrink-0">
        <img src="/dewalt-logo.png" alt="DeWalt" className="w-full h-auto md:w-auto md:h-6 object-contain" />
      </div>

      <p className="text-black font-bold md:text-base uppercase text-center leading-tight grow md:grow-0 px-1">
        {scrolled
          ? (lang === 'pt' ? "CLIQUE EM GIRAR ROLETA PARA DESCOBRIR SEU DESCONTO!" : "CLICK TO SPIN THE WHEEL AND REVEAL YOUR DISCOUNT!")
          : <>
            <span className="block md:hidden text-[13px] leading-4">
              {lang === 'pt' ? "VOCÊ ESTÁ ACESSANDO" : "YOU ARE ACCESSING"}
              <br />
              {lang === 'pt' ? "UMA OFERTA EXCLUSIVA" : "AN EXCLUSIVE OFFER"}
            </span>
            <span className="hidden md:inline">⭐ {lang === 'pt' ? "VOCÊ ESTÁ ACESSANDO UMA OFERTA EXCLUSIVA" : "YOU ARE ACCESSING AN EXCLUSIVE OFFER"} ⭐</span>
          </>
        }
      </p>

      <div className="flex items-center justify-center w-[18%] md:w-auto shrink-0">
        <img src="/dewalt-logo.png" alt="DeWalt" className="w-full h-auto md:w-auto md:h-6 object-contain" />
      </div>
    </div>
  );
};
