import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const BlackFridayFAQ = () => {
  const faqs = [
    {
      question: "Como funciona a promoção da Black November?",
      answer: "Durante a Black November, oferecemos descontos de até 70% OFF em kits especiais. Os preços promocionais são válidos apenas durante o período da campanha e enquanto durarem os estoques."
    },
    {
      question: "Quanto tempo leva para ver resultados?",
      answer: "Os primeiros resultados podem ser vistos a partir de 30 dias de uso contínuo. Para resultados mais expressivos, recomendamos o uso por pelo menos 90 dias."
    },
    {
      question: "O produto tem garantia?",
      answer: "Sim! Oferecemos garantia de 30 dias. Se você não estiver satisfeito com o produto, devolvemos 100% do seu dinheiro."
    },
    {
      question: "Como aplicar o Welong Hair?",
      answer: "A aplicação é muito simples: aplique o produto diretamente no couro cabeludo, massageie suavemente e deixe agir. Pode ser usado diariamente."
    },
    {
      question: "O frete é grátis?",
      answer: "Sim! Durante a Black November, o frete é grátis para todo o Brasil em todos os kits promocionais."
    },
    {
      question: "Quais são os brindes exclusivos?",
      answer: "Os kits da Black November incluem brindes especiais como guia de aplicação, touca térmica e produtos complementares para potencializar os resultados."
    }
  ];

  return (
    <section className="py-12 px-4 bg-black">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-center text-white mb-8 uppercase">
          ❓ Perguntas Frequentes
        </h2>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-gradient-to-b from-gray-800 to-gray-900 border border-yellow-400/30 rounded-lg px-6"
            >
              <AccordionTrigger className="text-white font-bold text-left hover:text-yellow-400 transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
