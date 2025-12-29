export const ProductInfo = ({ lang = 'pt' }: { lang?: 'pt' | 'en' }) => {
  return (
    <section id="product-info-section" className="py-6 px-4 bg-white relative overflow-hidden">
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <h2 className="text-xl md:text-2xl font-bold mb-4 uppercase">
          {lang === 'pt' ? "DEWALT® XR COMPACT POWER KIT" : "DEWALT® XR COMPACT POWER KIT"}
        </h2>

        <p className="text-base leading-relaxed mb-4 px-0 my-0 mx-0 text-center">
          {lang === 'pt'
            ? "O DEWALT® XR Compact Power Kit é um kit compacto e potente que combina furadeira/parafusadeira e chave de impacto, oferecendo versatilidade total para diferentes tipos de trabalho."
            : "The DEWALT® XR Compact Power Kit is a compact and powerful kit that combines a drill/driver and impact driver, offering total versatility for different types of jobs."}
        </p>
        <p className="text-base leading-relaxed mb-4 text-center">
          {lang === 'pt'
            ? "Projetado para quem precisa de força, precisão e praticidade, ele permite furar, parafusar e apertar parafusos mais pesados com alto torque, tudo em uma única solução portátil e eficiente."
            : "Designed for those who need strength, precision and practicality, it allows drilling, driving and tightening heavier screws with high torque, all in a single portable and efficient solution."}
        </p>
        <p className="text-base leading-relaxed text-center">
          {lang === 'pt'
            ? "Ideal tanto para uso doméstico quanto profissional, o kit elimina a necessidade de trocar de ferramentas, economizando tempo e esforço em cada tarefa."
            : "Ideal for both home and professional use, the kit eliminates the need to switch tools, saving time and effort on every task."}
        </p>
      </div>
    </section>
  );
};