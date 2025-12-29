export const BlackFridayTestimonials = () => {
  const testimonials = [
    {
      name: "Maria Silva",
      age: "34 anos",
      text: "Usei por 60 dias e meu cabelo transformou! As falhas diminuíram muito e cresceram fios novos.",
      stars: 5,
      verified: true
    },
    {
      name: "Ana Paula",
      age: "28 anos",
      text: "Estava com muita queda de cabelo pós-parto. O Welong me devolveu a autoestima!",
      stars: 5,
      verified: true
    },
    {
      name: "Juliana Costa",
      age: "41 anos",
      text: "Resultado visível em menos de 1 mês! Meu cabelo está mais cheio e forte.",
      stars: 5,
      verified: true
    }
  ];

  return (
    <section className="py-12 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-center text-white mb-8 uppercase">
          ⭐ O Que Nossas Clientes Dizem
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-6 border border-yellow-400/30 shadow-lg"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-white mb-4 italic leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-black font-bold text-xl">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-bold">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">{testimonial.age}</p>
                </div>
                {testimonial.verified && (
                  <span className="ml-auto text-green-400 text-xl" title="Compra verificada">✓</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
