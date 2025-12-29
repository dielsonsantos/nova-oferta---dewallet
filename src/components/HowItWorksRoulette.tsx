import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RouletteDialog } from "@/components/RouletteDialog";

export const HowItWorksRoulette = ({ lang = 'pt' }: { lang?: 'pt' | 'en' }) => {
  const [showRoulette, setShowRoulette] = useState(false);
  return (
    <>
      <RouletteDialog open={showRoulette} onOpenChange={setShowRoulette} />
      <section className="py-6 px-4 bg-white relative overflow-hidden">
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h2 className="text-xl md:text-2xl font-bold mb-4 uppercase text-center">
            {lang === 'pt' ? "COMO O DEWALT® XR COMPACT POWER KIT FUNCIONA?" : "HOW DOES THE DEWALT® XR COMPACT POWER KIT WORK?"}
          </h2>

          <p className="text-base mb-4 text-center">
            {lang === 'pt'
              ? "O DEWALT® XR Compact Power Kit combina chave de impacto e furadeira/parafusadeira em um único sistema compacto e potente."
              : "The DEWALT® XR Compact Power Kit combines an impact driver and drill/driver in a single compact and powerful system."}
          </p>

          <p className="text-base mb-4 text-center">
            {lang === 'pt'
              ? "A função impacto entrega alto torque para apertar e soltar parafusos e porcas difíceis, enquanto o modo furação e parafusamento garante controle, precisão e versatilidade para madeira, metal e montagens em geral."
              : "The impact function delivers high torque for tightening and loosening difficult screws and nuts, while the drilling and driving mode ensures control, precision, and versatility for wood, metal, and general assembly."}
          </p>

          <p className="text-base mb-6 text-center">
            {lang === 'pt'
              ? "Ideal para quem precisa de força profissional sem perder controle, eliminando a necessidade de trocar de ferramentas durante o trabalho."
              : "Ideal for those who need professional strength without losing control, eliminating the need to switch tools during the job."}
          </p>

          <Button size="lg" onClick={() => setShowRoulette(true)} variant="dewalt" className="w-full max-w-sm md:max-w-2xl font-black py-4 md:py-6 text-[15px] md:text-xl md:whitespace-nowrap">
            {lang === 'pt' ? "GIRAR ROLETA E COMPRAR AGORA" : "SPIN THE WHEEL AND BUY NOW"}
          </Button>
        </div>
      </section>
    </>
  );
};