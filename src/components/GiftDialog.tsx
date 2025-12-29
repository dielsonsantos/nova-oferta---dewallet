import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { GiftBox3D } from "./GiftBox3D";

interface GiftDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const GiftDialog = ({ open, onOpenChange }: GiftDialogProps) => {
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    if (open) {
      setIsOpening(false);
      const timer = setTimeout(() => {
        setIsOpening(true);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setIsOpening(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-gradient-to-b from-white to-gray-50 border-none p-8 overflow-visible">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2EA942] uppercase animate-bounce">
            🎉 VOCÊ GANHOU UM PRESENTE! 🎉
          </h2>
          
          <div className="relative w-full h-[500px]">
            {/* Sparkles and confetti effects */}
            {isOpening && (
              <>
                <div className="sparkle sparkle-1">✨</div>
                <div className="sparkle sparkle-2">✨</div>
                <div className="sparkle sparkle-3">✨</div>
                <div className="sparkle sparkle-4">✨</div>
                <div className="confetti confetti-1">🎉</div>
                <div className="confetti confetti-2">🎉</div>
                <div className="confetti confetti-3">🎊</div>
              </>
            )}
            
            <GiftBox3D isOpening={isOpening} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
