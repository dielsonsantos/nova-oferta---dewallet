import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

interface KitCardProps {
  image: string;
  title: string;
  subtitle: string;
  daysOfUse: string;
  unitPrice: string;
  originalPrice: string;
  currentPrice: string;
  installments?: string;
  badge?: string;
  badgeColor?: 'blue' | 'green' | 'purple' | 'orange' | 'teal';
  isHighlighted?: boolean;
  shippingText?: string;
  discountPercentage?: number;
  showDiscountBadge?: boolean;
  discountAmount?: string;
  purchaseUrl: string;
}

const KitCard = ({
  image,
  title,
  subtitle,
  daysOfUse,
  unitPrice,
  originalPrice,
  currentPrice,
  installments,
  badge,
  badgeColor = 'blue',
  isHighlighted = false,
  shippingText,
  discountPercentage,
  showDiscountBadge = false,
  discountAmount,
  purchaseUrl,
}: KitCardProps) => {
  const badgeColors = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    purple: 'bg-purple-600',
    orange: 'bg-orange-600',
    teal: 'bg-teal-600',
  };

  return (
    <div
      className={`relative bg-card rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-glow border-2 h-full flex flex-col ${
        isHighlighted
          ? 'border-black-november-gold shadow-glow'
          : 'border-border hover:border-black-november-gold/50'
      }`}
    >
      {/* Badge Superior */}
      {badge && (
        <div className={`absolute top-2 left-2 z-10 ${badgeColors[badgeColor]} text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full shadow-lg`}>
          {badge}
        </div>
      )}

      {/* Badge de Desconto */}
      {showDiscountBadge && discountPercentage && (
        <div className="absolute top-2 right-2 z-10 bg-black-november-orange text-white text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-full shadow-lg">
          -{discountPercentage}%
        </div>
      )}

      {/* Imagem do Produto */}
      <div className="relative bg-gradient-to-br from-muted to-background p-3 sm:p-4">
        <div className="aspect-square w-full bg-muted/50 rounded-lg flex items-center justify-center">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-contain"
            onError={(e) => {
              // Placeholder se a imagem não carregar
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.innerHTML = '<div class="text-muted-foreground text-sm">Imagem em breve</div>';
            }}
          />
        </div>
      </div>

      {/* Conteúdo do Card */}
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        {/* Título e Subtítulo */}
        <div className="mb-2 sm:mb-3 flex-1">
          <h3 className="text-[11px] sm:text-xs md:text-sm font-bold text-foreground leading-tight mb-1">
            {title}
          </h3>
          <p className="text-[10px] sm:text-xs text-black-november-gold font-semibold">
            {subtitle}
          </p>
          <p className="text-[9px] sm:text-[10px] text-muted-foreground mt-1">
            {daysOfUse}
          </p>
        </div>

        {/* Preço Unitário */}
        <p className="text-[9px] sm:text-[10px] text-muted-foreground mb-1 sm:mb-2">
          {unitPrice}
        </p>

        {/* Preços */}
        <div className="mb-2 sm:mb-3">
          <p className="text-[10px] sm:text-xs text-muted-foreground line-through">
            {originalPrice}
          </p>
          <div className="flex items-baseline gap-1 sm:gap-2">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-black-november-gold to-black-november-orange bg-clip-text text-transparent">
              {currentPrice}
            </span>
            {discountAmount && (
              <span className="text-[9px] sm:text-[10px] text-green-600 font-semibold">
                Economize {discountAmount}
              </span>
            )}
          </div>
          {installments && (
            <p className="text-[9px] sm:text-[10px] text-muted-foreground mt-1">
              {installments}
            </p>
          )}
        </div>

        {/* Frete Grátis */}
        {shippingText && (
          <p className="text-[10px] sm:text-xs text-green-600 font-semibold mb-2 sm:mb-3">
            ✓ {shippingText}
          </p>
        )}

        {/* Botão de Compra */}
        <Button
          asChild
          className="w-full bg-gradient-to-r from-black-november-orange to-black-november-gold hover:from-black-november-gold hover:to-black-november-orange text-white font-bold transition-all duration-300 shadow-lg hover:shadow-glow text-xs sm:text-sm py-2 sm:py-3"
        >
          <a href={purchaseUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
            <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
            COMPRAR AGORA
          </a>
        </Button>
      </div>
    </div>
  );
};

export default KitCard;
