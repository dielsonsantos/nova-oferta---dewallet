import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RouletteDialog } from "@/components/RouletteDialog";

export const FloatingRouletteButton = ({ lang = 'pt' }: { lang?: 'pt' | 'en' }) => {
    const [showRoulette, setShowRoulette] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        toggleVisibility(); // Initial check
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    if (!isVisible) return null;

    return (
        <>
            <RouletteDialog open={showRoulette} onOpenChange={setShowRoulette} lang={lang} />
            <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-black/90 to-transparent flex justify-center animate-in slide-in-from-bottom-4 duration-500 pb-6 pt-8 pointer-events-none">
                <Button
                    size="lg"
                    onClick={() => setShowRoulette(true)}
                    variant="dewalt"
                    className="w-full max-w-sm md:max-w-2xl font-black py-4 md:py-6 text-[15px] md:text-xl md:whitespace-nowrap shadow-[0_0_20px_rgba(254,203,0,0.6)] hover:shadow-[0_0_30px_rgba(254,203,0,1)] pointer-events-auto"
                >
                    {lang === 'pt' ? "GIRAR ROLETA E COMPRAR AGORA" : "SPIN THE WHEEL AND BUY NOW"}
                </Button>
            </div>
        </>
    );
};
