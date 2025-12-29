import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GiftDialog } from "@/components/GiftDialog";

export const PromotionSection = () => {
  const [showGift, setShowGift] = useState(false);

  return (
    <>
      <GiftDialog open={showGift} onOpenChange={setShowGift} />
    <section className="py-6 px-4 bg-white">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-xl md:text-2xl font-bold mb-6 uppercase flex items-center justify-center gap-2">
          <span className="text-2xl">🎁</span>
          Promoção Exclusiva
        </h2>

        <p className="text-base mb-4">
          Comprando ainda hoje, você recebe 3 brindes especiais totalmente grátis:
        </p>

        <ul className="space-y-2 mb-6 text-left">
          <li className="flex items-start gap-2 text-base">
            <span className="text-lg flex-shrink-0">✅</span>
            <span>Escova de cabelo personalizada</span>
          </li>
          <li className="flex items-start gap-2 text-base">
            <span className="text-lg flex-shrink-0">✅</span>
            <span>Touca anti-frizz profissional</span>
          </li>
          <li className="flex items-start gap-2 text-base">
            <span className="text-lg flex-shrink-0">✅</span>
            <span>Necessaire exclusiva Welong</span>
          </li>
        </ul>

        <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-lg mb-6 text-left">
          <span className="text-lg flex-shrink-0">⚠️</span>
          <p className="text-sm">
            Brindes disponíveis somente até o final do mês ou enquanto durarem os estoques.
          </p>
        </div>

        <Button 
          size="lg"
          onClick={() => setShowGift(true)}
          className="w-full max-w-sm bg-[#2EA942] hover:bg-[#27923A] text-white font-bold py-4 rounded-full text-base mb-6"
        >
          COMPRAR AGORA
        </Button>
      </div>
    </section>
    </>
  );
};
