import { MessageCircle } from 'lucide-react';

const FloatingWhatsApp = () => {
  const whatsappNumber = "5511999999999"; // Número de exemplo
  const whatsappMessage = encodeURIComponent("Olá! Vim pela Black November e gostaria de mais informações sobre os produtos Welong!");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse"
      aria-label="Fale conosco no WhatsApp"
    >
      <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" />
    </a>
  );
};

export default FloatingWhatsApp;
