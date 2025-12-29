import { useState, useEffect } from 'react';

const Countdown = () => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);
    
    const difference = endOfDay.getTime() - now.getTime();
    
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);
    
    return { hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center bg-card rounded-lg p-2 sm:p-3 md:p-4 min-w-[60px] sm:min-w-[80px] md:min-w-[100px] shadow-glow border border-black-november-gold/20">
      <span className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-black-november-gold to-black-november-orange bg-clip-text text-transparent">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[10px] sm:text-xs md:text-sm text-muted-foreground uppercase mt-1">
        {label}
      </span>
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto p-3 sm:p-4 md:p-6 bg-card rounded-lg shadow-glow border border-black-november-gold/30">
      <h3 className="text-center text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-black-november-orange to-black-november-gold bg-clip-text text-transparent">
        ⏰ A PROMOÇÃO TERMINA EM:
      </h3>
      <div className="flex justify-center gap-2 sm:gap-3 md:gap-4">
        <TimeBox value={timeLeft.hours} label="Horas" />
        <TimeBox value={timeLeft.minutes} label="Minutos" />
        <TimeBox value={timeLeft.seconds} label="Segundos" />
      </div>
      <p className="text-center mt-3 sm:mt-4 text-xs sm:text-sm text-black-november-orange font-bold">
        🔥 NÃO PERCA ESSA CHANCE! 🔥
      </p>
    </div>
  );
};

export default Countdown;
