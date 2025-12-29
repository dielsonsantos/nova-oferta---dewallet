import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GiftDialog } from "@/components/GiftDialog";

export const HowItWorks = () => {
  const [showGift, setShowGift] = useState(false);

  return (
    <>
      <GiftDialog open={showGift} onOpenChange={setShowGift} />
    <section className="py-6 px-4 bg-white">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-xl md:text-2xl font-bold mb-4 uppercase">
          Como o Welong Hair funciona?
        </h2>
        
        <p className="text-base mb-4 text-left">
          Cabelos fracos, ralos e cheios de falhas têm um motivo: falta de estímulo no folículo capilar. O Welong age diretamente onde o problema começa, estimulando o crescimento de novos fios com mais força e espessura. Ele também pode ser usado na barba — homens têm obtido resultados incríveis com o crescimento facial também.
        </p>
        
        <p className="text-base mb-6 flex items-center justify-center gap-2">
          <span className="text-xl">🌱</span>
          Aplicação simples, segura e sem nenhuma reação adversa.
        </p>

        <Button 
          size="lg"
          onClick={() => setShowGift(true)}
          className="w-full max-w-sm bg-[#2EA942] hover:bg-[#27923A] text-white font-bold py-4 rounded-full text-base"
        >
          COMPRAR AGORA
        </Button>
      </div>
    </section>
    </>
  );
};
