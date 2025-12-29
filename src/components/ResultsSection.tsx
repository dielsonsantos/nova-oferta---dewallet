export const ResultsSection = ({ lang = 'pt' }: { lang?: 'pt' | 'en' }) => {
  return (
    <section className="py-2 px-4 bg-white relative overflow-hidden">
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <div className="">
          <img src="/dewalt-features.jpg" alt="DEWALT® XR COMPACT POWER KIT Features" className="w-full h-auto rounded-lg shadow-md" />
        </div>
      </div>
    </section>
  );
};