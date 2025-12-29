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
}

export const RouletteDialog = ({ open, onOpenChange }: RouletteDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-3xl border-none p-8 max-h-[90vh] overflow-y-auto"
        style={{
          background: '#000000',
        }}>

        <VisuallyHidden>
          <DialogTitle>Roleta de Prêmios de Natal</DialogTitle>
          <DialogDescription>Gire a roleta para ganhar descontos e prêmios especiais</DialogDescription>
        </VisuallyHidden>

        <RouletteWheel />
      </DialogContent>
    </Dialog>
  );
};
