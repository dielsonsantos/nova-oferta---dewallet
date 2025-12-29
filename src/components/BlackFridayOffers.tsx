import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RouletteDialog } from "@/components/RouletteDialog";

export const BlackFridayOffers = () => {
  const [showRoulette, setShowRoulette] = useState(false);

  const offers = [
    {
      quantity: "1 UNIDADE",
      discount: "40% OFF",
      oldPrice: "R$ 297,00",
      newPrice: "R$ 178,00",
      badge: "Mais Vendido",
      badgeColor: "bg-blue-500"
    },
    {
      quantity: "2 UNIDADES",
      discount: "50% OFF",
      oldPrice: "R$ 594,00",
      newPrice: "R$ 297,00",
      badge: "Melhor Custo x Benefício",
      badgeColor: "bg-green-500",
      highlight: true
    },
    {
      quantity: "3 UNIDADES",
      discount: "70% OFF",
      oldPrice: "R$ 891,00",
      newPrice: "R$ 267,00",
      badge: "Oferta Black",
      badgeColor: "bg-yellow-500"
    }
  ];

  return (
    <>
      <RouletteDialog open={showRoulette} onOpenChange={setShowRoulette} />
      <section className="py-12 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase">
              🔥 OFERTAS ESPECIAIS BLACK NOVEMBER 🔥
            </h2>
            <p className="text-yellow-400 text-lg font-bold">
              Escolha seu kit e aproveite descontos imperdíveis!
            </p>
          </div>

          {/* Offers Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {offers.map((offer, index) => (
              <div
                key={index}
                className={`relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-6 border-2 ${
                  offer.highlight 
                    ? 'border-yellow-400 shadow-[0_0_30px_rgba(255,215,0,0.3)] scale-105' 
                    : 'border-gray-700'
                } transition-transform hover:scale-105`}
              >
                {/* Badge */}
                {offer.badge && (
                  <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${offer.badgeColor} text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg`}>
                    {offer.badge}
                  </div>
                )}

                {/* Discount Badge */}
                <div className="text-center mb-4 mt-2">
                  <div className="inline-block bg-red-600 text-white text-2xl font-black px-6 py-2 rounded-lg transform -rotate-2 shadow-lg">
                    {offer.discount}
                  </div>
                </div>

                {/* Quantity */}
                <h3 className="text-2xl font-black text-white text-center mb-4">
                  {offer.quantity}
                </h3>

                {/* Prices */}
                <div className="text-center mb-6">
                  <p className="text-gray-400 line-through text-lg mb-1">
                    De: {offer.oldPrice}
                  </p>
                  <p className="text-yellow-400 text-4xl font-black">
                    {offer.newPrice}
                  </p>
                  <p className="text-gray-300 text-sm mt-2">
                    ou 12x de R$ {(parseFloat(offer.newPrice.replace('R$ ', '').replace(',', '.')) / 12).toFixed(2).replace('.', ',')}
                  </p>
                </div>

                {/* Benefits */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <span>✓</span>
                    <span>Frete Grátis</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <span>✓</span>
                    <span>Garantia 30 dias</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <span>✓</span>
                    <span>Brindes Exclusivos</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  onClick={() => setShowRoulette(true)}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-black py-6 rounded-xl text-lg shadow-lg shadow-yellow-500/50 transition-all"
                >
                  QUERO MEU DESCONTO
                </Button>
              </div>
            ))}
          </div>

          {/* Urgency Message */}
          <div className="bg-red-600 text-white text-center py-4 rounded-lg font-bold text-lg animate-pulse">
            ⚠️ ÚLTIMAS UNIDADES! Estoque limitado para Black November ⚠️
          </div>
        </div>
      </section>
    </>
  );
};
