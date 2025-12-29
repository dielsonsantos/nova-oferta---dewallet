export const HeroSection = () => {
  return (
    <section className="py-6 px-4 bg-white">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center justify-center gap-2">
          <span className="text-3xl">🚨</span>
          <span>É O FIM DA QUEDA DE CABELO!</span>
        </h1>
        
        <div className="mb-6">
          <img 
            src="https://welong.com.br/cdn/shop/files/gempages_538162701596099580-877e9bf9-a251-40b8-96b3-a4d3cae104ef.png?v=5546130851967160847" 
            alt="Welong Hair - Tratamento Capilar Completo" 
            className="w-full h-auto"
          />
        </div>

        <p className="text-base md:text-lg mb-6">
          Conheça o tratamento que está transformando a autoestima de milhares de mulheres no Brasil!
        </p>
      </div>
    </section>
  );
};
