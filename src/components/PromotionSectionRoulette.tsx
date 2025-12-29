import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RouletteDialog } from "@/components/RouletteDialog";
import { format } from "date-fns";

export const PromotionSectionRoulette = ({ lang = 'pt' }: { lang?: 'pt' | 'en' }) => {
  const [showRoulette, setShowRoulette] = useState(false);
  const today = format(new Date(), "dd/MM/yy");

  return (
    <>
      <RouletteDialog open={showRoulette} onOpenChange={setShowRoulette} />
      <section className="py-6 px-4 bg-white relative overflow-hidden">
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h2 className="text-xl md:text-2xl font-bold mb-6 uppercase flex items-center justify-center gap-2">
            {lang === 'pt' ? "PROMOÇÃO EXCLUSIVA" : "EXCLUSIVE PROMOTION"}
          </h2>

          <p className="text-base mb-4">
            {lang === 'pt'
              ? "Comprando ainda hoje, você recebe acessórios essenciais totalmente grátis para aproveitar ao máximo sua ferramenta:"
              : "Buy today and receive essential accessories completely free to make the most of your tool:"}
          </p>

          <ul className="space-y-2 mb-6 text-left">
            <li className="flex items-start gap-2 text-base">
              <span className="text-lg flex-shrink-0">✅</span>
              <span>{lang === 'pt' ? "Kit completo de bits e ponteiras" : "Complete kit of bits and tips"}</span>
            </li>
            <li className="flex items-start gap-2 text-base">
              <span className="text-lg flex-shrink-0">✅</span>
              <span>{lang === 'pt' ? "Extensor flexível para locais difíceis" : "Flexible extender for hard-to-reach places"}</span>
            </li>
            <li className="flex items-start gap-2 text-base">
              <span className="text-lg flex-shrink-0">✅</span>
              <span>{lang === 'pt' ? "Maleta rígida resistente para transporte e organização" : "Resistant rigid case for transport and organization"}</span>
            </li>
          </ul>

          <div className="flex items-end bg-yellow-50 border border-yellow-300 text-yellow-800 pl-2 pr-[0px] py-[0px] rounded-none mb-6 text-left leading-none gap-0">
            <span className="text-base flex-shrink-0 mr-1">⚠️</span>
            <p className="text-sm w-full pr-[0px] pl-[0px] m-[0px] pb-[0px] leading-none tracking-tight">
              {lang === 'pt'
                ? `Somente Hoje (${today}) brindes disponíveis enquanto durarem os estoques.`
                : `Only Today (${today}) gifts available while stocks last.`}
            </p>
          </div>

          <Button
            size="lg"
            onClick={() => setShowRoulette(true)}
            variant="dewalt"
            className="w-full max-w-sm md:max-w-2xl font-black py-4 md:py-6 text-[15px] md:text-xl mb-6 shadow-2xl md:whitespace-nowrap"
          >
            {lang === 'pt' ? "GIRAR ROLETA E COMPRAR AGORA" : "SPIN THE WHEEL AND BUY NOW"}
          </Button>
        </div>
      </section>
    </>
  );
};
