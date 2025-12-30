import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { RouletteWheel } from "./RouletteWheel";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface RouletteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lang?: 'pt' | 'en';
}

export const RouletteDialog = ({ open, onOpenChange, lang = 'pt' }: RouletteDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-3xl border-none p-8 max-h-[90vh] overflow-y-auto"
        style={{
          background: '#000000',
        }}>

        <VisuallyHidden>
          <DialogTitle>{lang === 'pt' ? "Roleta de Prêmios de Natal" : "Christmas Prize Wheel"}</DialogTitle>
          <DialogDescription>{lang === 'pt' ? "Gire a roleta para ganhar descontos e prêmios especiais" : "Spin the wheel to win discounts and special prizes"}</DialogDescription>
        </VisuallyHidden>

        <RouletteWheel lang={lang} />
      </DialogContent>
    </Dialog>
  );
};
