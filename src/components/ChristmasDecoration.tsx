import { Sparkles, Star, Gift } from 'lucide-react';
import santaHat from '@/assets/santa-hat.png';

interface ChristmasDecorationProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ChristmasDecoration = ({ size = 'md', className = '' }: ChristmasDecorationProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <>
      <div className={`relative ${sizeClasses[size]} ${className}`}>
        <Star className="absolute top-0 left-0 w-full h-full text-christmas-gold animate-pulse" />
        <Gift className="absolute top-1 left-1 w-3/4 h-3/4 text-christmas-red animate-pulse delay-75" />
        <Sparkles className="absolute top-2 left-2 w-1/2 h-1/2 text-christmas-green animate-pulse delay-150" />
      </div>
      
      {/* Gorro de Papai Noel flutuante */}
      <img 
        src={santaHat} 
        alt="Gorro de Papai Noel" 
        className="fixed top-4 right-4 w-20 h-20 z-50 animate-bounce pointer-events-none"
        style={{ animationDuration: '3s' }}
      />
    </>
  );
};

export default ChristmasDecoration;
