export const UrgencySection = ({ lang = 'pt' }: { lang?: 'pt' | 'en' }) => {
  return (
    <section className="py-6 px-4 bg-white relative overflow-hidden">
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <h2 className="text-xl md:text-2xl font-bold mb-4 uppercase text-center">
          {lang === 'pt' ? "🕒 Atenção!" : "🕒 Attention!"}<br />
          {lang === 'pt' ? "Estoque Limitado!" : "Limited Stock!"}
        </h2>

        <p className="text-base text-center">
          {lang === 'pt'
            ? <>Devido à alta demanda desta oferta exclusiva, restam poucas unidades disponíveis.<br /><br />Garanta agora o DEWALT® XR Compact Power Kit e tenha potência, praticidade e desempenho profissional no seu dia a dia.</>
            : "Due to high demand for this exclusive offer, few units remain available. Secure your DEWALT® XR Compact Power Kit now and get power, practicality, and professional performance in your daily life."}
        </p>
      </div>
    </section>
  );
};