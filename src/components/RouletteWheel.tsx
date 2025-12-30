import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

const segmentsPT = [
  { text: "40%\nde\ndesconto", colorStart: "#e61e1e", colorEnd: "#e61e1e", textColor: "#fff", weight: 15 },
  { text: "30%\nde\ndesconto", colorStart: "#05bef7", colorEnd: "#05bef7", textColor: "#fff", weight: 12 },
  { text: "75%\nde\ndesconto", colorStart: "#FFC303", colorEnd: "#FFC303", textColor: "#fff", weight: 20 },
  { text: "Tente\noutra\nvez", colorStart: "#050000", colorEnd: "#050000", textColor: "#fff", weight: 25 },
  { text: "50%\nde\ndesconto", colorStart: "#ec0ff7", colorEnd: "#ec0ff7", textColor: "#fff", weight: 10 },
  { text: "75%\nde\ndesconto", colorStart: "#FFC303", colorEnd: "#FFC303", textColor: "#fff", weight: 5 },
  { text: "Tente\noutra\nvez", colorStart: "#050000", colorEnd: "#050000", textColor: "#fff", weight: 13 },
];

const segmentsEN = [
  { text: "40%\nOFF", colorStart: "#e61e1e", colorEnd: "#e61e1e", textColor: "#fff", weight: 15 },
  { text: "30%\nOFF", colorStart: "#05bef7", colorEnd: "#05bef7", textColor: "#fff", weight: 12 },
  { text: "75%\nOFF", colorStart: "#FFC303", colorEnd: "#FFC303", textColor: "#fff", weight: 20 },
  { text: "Try\nAgain", colorStart: "#050000", colorEnd: "#050000", textColor: "#fff", weight: 25 },
  { text: "50%\nOFF", colorStart: "#ec0ff7", colorEnd: "#ec0ff7", textColor: "#fff", weight: 10 },
  { text: "75%\nOFF", colorStart: "#FFC303", colorEnd: "#FFC303", textColor: "#fff", weight: 5 },
  { text: "Try\nAgain", colorStart: "#050000", colorEnd: "#050000", textColor: "#fff", weight: 13 },
];


const TEXT_OFFSET = -89;
const POINTER_ANGLE_DEG = 270;
const TRY_AGAIN_TOKEN = "__TRY_AGAIN__";

export const RouletteWheel = ({ lang = 'pt' }: { lang?: 'pt' | 'en' }) => {
  const segments = lang === 'pt' ? segmentsPT : segmentsEN;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef<HTMLDivElement>(null);

  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [winningIndex, setWinningIndex] = useState<number | null>(null);
  const [showWheel, setShowWheel] = useState(true);
  const [showSpinButton, setShowSpinButton] = useState(true);

  const angleRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const spinCountRef = useRef(0);
  const lastTargetIndexRef = useRef<number | null>(null);
  const loopImgRef = useRef<HTMLImageElement | null>(null);

  // Refs para áudio
  const spinSoundRef = useRef<HTMLAudioElement | null>(null);
  const tickSoundRef = useRef<HTMLAudioElement | null>(null);
  const winSoundRef = useRef<HTMLAudioElement | null>(null);
  const lastTickIndexRef = useRef<number>(-1);

  const degToCanvasRad = (deg: number) => (deg - 90) * Math.PI / 180;
  const pointerTheta = degToCanvasRad(POINTER_ANGLE_DEG);

  useEffect(() => {
    drawWheel(angleRef.current);

    // Inicializar sons
    spinSoundRef.current = new Audio('/sounds/spin-3.mp3');
    tickSoundRef.current = new Audio('/sounds/tick.mp3');
    winSoundRef.current = new Audio('/sounds/win.mp3');

    if (spinSoundRef.current) {
      spinSoundRef.current.loop = true;
      spinSoundRef.current.volume = 0.5;
    }
    if (tickSoundRef.current) {
      tickSoundRef.current.volume = 0.3;
    }
    if (winSoundRef.current) {
      winSoundRef.current.volume = 0.7;
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (spinSoundRef.current) {
        spinSoundRef.current.pause();
        spinSoundRef.current.currentTime = 0;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const positionPointer = () => {
    const canvas = canvasRef.current;
    const pointer = pointerRef.current;
    if (!canvas || !pointer) return;

    const radius = Math.min(canvas.width / 2, canvas.height / 2) - 20;
    const offset = 18;

    const xCanvas = (canvas.width / 2) + Math.cos(pointerTheta) * (radius + offset);
    const yCanvas = (canvas.height / 2) + Math.sin(pointerTheta) * (radius + offset);

    pointer.style.left = `${xCanvas + 15}px`;
    pointer.style.top = `${yCanvas - 65}px`;
    const rot = pointerTheta + Math.PI / 2;
    pointer.style.transform = `translate(-50%, -50%) rotate(${rot}rad) scaleX(-1) rotate(180deg)`;
  };

  const drawWheel = (rotation = 0) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radius = Math.min(cx, cy) - 20;
    const segAngle = (2 * Math.PI) / segments.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);

    // Anel decorativo
    ctx.save();
    ctx.rotate(-rotation);
    ctx.translate(-cx, -cy);
    ctx.strokeStyle = "rgba(255, 215, 0, 0.6)";
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 15, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.setLineDash([]);
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * 2 * Math.PI;
      const x = cx + Math.cos(a) * (radius + 15);
      const y = cy + Math.sin(a) * (radius + 15);
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fillStyle = "#FFD700";
      ctx.fill();
    }
    ctx.restore();

    // Fatias
    segments.forEach((seg, i) => {
      const start = i * segAngle - Math.PI / 2;
      const end = start + segAngle;

      ctx.save();
      ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, start, end);
      ctx.closePath();
      ctx.fillStyle = seg.colorStart;
      ctx.fill();

      ctx.shadowColor = "transparent";
      ctx.strokeStyle = "rgba(255, 215, 0, 0.8)";
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.lineWidth = 1;
      ctx.stroke();

      if (!isSpinning && winningIndex === i) {
        ctx.strokeStyle = "#FFD700";
        ctx.lineWidth = 6;
        ctx.shadowColor = "#FFD700";
        ctx.shadowBlur = 20;
        ctx.stroke();
      }

      ctx.restore();
    });

    // Textos e ícone
    segments.forEach((seg, i) => {
      if (!seg.text) return;
      const centerA = (i * segAngle - Math.PI / 2) + segAngle / 2 + (TEXT_OFFSET * Math.PI / 180);
      ctx.save();
      ctx.rotate(centerA);

      if (seg.text !== "Tente\noutra\nvez" && seg.text !== "Try\nAgain") {
        const lines = seg.text.split("\n");
        const fontSize = 16;
        const lineHeight = fontSize * 1.1;
        const textR = radius * 0.70;
        ctx.font = `bold ${fontSize}px 'Roboto', Arial, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const totalH = lines.length * lineHeight;
        const startY = textR - totalH / 2 + lineHeight / 2;
        lines.forEach((line, idx) => {
          const y = startY + idx * lineHeight;
          ctx.strokeStyle = "rgba(0, 0, 0, 0.6)";
          ctx.lineWidth = 3;
          ctx.strokeText(line, 0, y);
          ctx.fillStyle = seg.textColor || "#fff";
          ctx.fillText(line, 0, y);
        });
      } else {
        const textY = radius * 0.65;
        const lines = seg.text.split("\n");
        const fontSize = 14;
        const lineHeight = fontSize * 1.1;
        ctx.font = `bold ${fontSize}px 'Roboto', Arial, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const totalH = lines.length * lineHeight;
        const startY = textY - totalH / 2 + lineHeight / 2;
        lines.forEach((line, idx) => {
          const y = startY + idx * lineHeight;
          ctx.strokeStyle = "rgba(0, 0, 0, 0.6)";
          ctx.lineWidth = 2.5;
          ctx.strokeText(line, 0, y);
          ctx.fillStyle = "#fff";
          ctx.fillText(line, 0, y);
        });
      }
      ctx.restore();
    });

    // Botão central
    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 25;
    ctx.shadowOffsetY = 8;
    const centerGradient = ctx.createRadialGradient(0, -10, 0, 0, 0, 70);
    centerGradient.addColorStop(0, "#FFD836");
    centerGradient.addColorStop(0.6, "#FFD836");
    centerGradient.addColorStop(1, "#E3B21C");
    ctx.beginPath();
    ctx.arc(0, 0, 70, 0, 2 * Math.PI);
    ctx.fillStyle = centerGradient;
    ctx.fill();
    ctx.shadowColor = "transparent";
    ctx.strokeStyle = "#E3B21C";
    ctx.lineWidth = 6;
    ctx.stroke();
    const glowGradient = ctx.createRadialGradient(0, -30, 0, 0, -30, 50);
    glowGradient.addColorStop(0, "rgba(255, 255, 255, 0.6)");
    glowGradient.addColorStop(0.5, "rgba(255, 255, 255, 0.2)");
    glowGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.beginPath();
    ctx.arc(0, -20, 35, 0, Math.PI, true);
    ctx.fillStyle = glowGradient;
    ctx.fill();
    ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
    ctx.shadowBlur = 4;
    ctx.shadowOffsetY = 2;
    ctx.font = "900 32px 'Roboto','Inter',sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#fff";
    ctx.fillText(lang === 'pt' ? "GIRE" : "SPIN", 0, 0);
    ctx.restore();

    ctx.restore();
    positionPointer();
  };

  const getWeightedResult = () => {
    const total = segments.reduce((s, seg) => s + seg.weight, 0);
    let r = Math.random() * total;
    for (let i = 0; i < segments.length; i++) {
      r -= segments[i].weight;
      if (r <= 0) return i;
    }
    return 0;
  };

  const finish = () => {
    // Parar som de giro
    if (spinSoundRef.current) {
      spinSoundRef.current.pause();
      spinSoundRef.current.currentTime = 0;
    }

    const idx = lastTargetIndexRef.current!;
    setWinningIndex(idx);
    const seg = segments[idx];
    const isTryAgain = seg.text === "Tente\noutra\nvez" || seg.text === "Try\nAgain";
    const resultText = isTryAgain ? TRY_AGAIN_TOKEN : seg.text.replace(/\n/g, " ");
    setResult(resultText);
    setIsSpinning(false);

    // Tocar som de vitória apenas se NÃO for "tente outra vez"
    if (!isTryAgain && winSoundRef.current) {
      winSoundRef.current.currentTime = 0;
      winSoundRef.current.play().catch(() => {
        // Ignorar erro de autoplay bloqueado
      });
    }

    if (isTryAgain && spinCountRef.current === 1) {
      setShowWheel(false);
      setShowSpinButton(false);
    }

    if (spinCountRef.current === 2 && /75%/i.test(seg.text)) {
      setShowWheel(false);
      setShowSpinButton(false);
    }
  };

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult(null);
    setWinningIndex(null);

    // Tocar som de giro
    if (spinSoundRef.current) {
      spinSoundRef.current.currentTime = 0;
      spinSoundRef.current.play().catch(() => {
        // Ignorar erro de autoplay
      });
    }

    // Resetar controle de tick
    lastTickIndexRef.current = -1;

    let targetIndex: number;
    if (spinCountRef.current === 0) {
      targetIndex = 6;
    } else if (spinCountRef.current === 1) {
      targetIndex = 5;
    } else {
      targetIndex = getWeightedResult();
    }
    spinCountRef.current += 1;
    lastTargetIndexRef.current = targetIndex;

    const twoPI = 2 * Math.PI;
    const slice = twoPI / segments.length;
    const targetCenter = targetIndex * slice + slice / 2;
    const targetRotation = (-Math.PI / 2) - targetCenter;
    const currentNormalized = ((angleRef.current % twoPI) + twoPI) % twoPI;
    let delta = targetRotation - currentNormalized;
    while (delta < 0) delta += twoPI;

    const extraTurns = 8;
    const finalAngle = angleRef.current + delta + extraTurns * twoPI;
    const duration = 4200;
    const start = performance.now();
    const initial = angleRef.current;

    const animate = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const e = 1 - Math.pow(1 - p, 3);
      angleRef.current = initial + (finalAngle - initial) * e;
      drawWheel(angleRef.current);

      // Detectar mudança de segmento para tocar tick
      const twoPI = 2 * Math.PI;
      const pointerReference = -Math.PI / 2;
      const normalized = ((angleRef.current % twoPI) + twoPI) % twoPI;
      const currentSegmentIndex = Math.floor(
        ((pointerReference - normalized + twoPI) % twoPI) / slice
      );

      // Tocar tick quando mudar de segmento
      if (currentSegmentIndex !== lastTickIndexRef.current) {
        if (tickSoundRef.current) {
          try {
            tickSoundRef.current.currentTime = 0;
            tickSoundRef.current.play().catch(() => { });
          } catch (e) {
            // Ignorar erros
          }
        }
        lastTickIndexRef.current = currentSegmentIndex;
      }

      if (p < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        drawWheel(angleRef.current);
        finish();
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  };

  const handleRetry = () => {
    setShowWheel(true);
    spinWheel();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-8">
      <div className="text-center space-y-3">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
          {lang === 'pt' ? "Você acaba de ganhar um presente!" : "You just won a gift!"}
        </h2>
        <p className="text-lg md:text-xl font-semibold text-white">
          {lang === 'pt' ? "Gire a roleta para ganhar seu Mega Desconto!" : "Spin the wheel to win your Mega Discount!"}
        </p>
      </div>

      {showWheel && (
        <div className="relative">
          <div ref={pointerRef} className="absolute z-10" style={{ transformOrigin: "center" }}>
            <div className="relative">
              <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[35px] border-b-red-500 drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]" />
              <div className="absolute left-1/2 -translate-x-1/2 top-[2px] w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-b-[32px] border-b-orange-500" />
            </div>
          </div>

          <canvas
            ref={canvasRef}
            width={420}
            height={420}
            className="block max-w-full md:w-[420px] w-[320px]"
          />

          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] rounded-full cursor-pointer hover:scale-105 transition-transform disabled:cursor-not-allowed disabled:hover:scale-100 z-20"
            aria-label={lang === 'pt' ? "Girar roleta" : "Spin wheel"}
          />
        </div>
      )}

      {result && !isSpinning && (
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-yellow-400 max-w-md w-full">
          <div className="text-center space-y-4">
            <div className="text-6xl">🏆</div>
            <div className="space-y-2">
              {result === TRY_AGAIN_TOKEN ? (
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold tracking-wide">
                    {lang === 'pt' ? "🔁 Giro grátis liberado" : "🔁 Free spin unlocked"}
                  </span>
                  <h3 className="text-2xl font-extrabold text-gray-900">{lang === 'pt' ? "Não foi dessa vez" : "Not this time"}</h3>
                  <p className="text-base leading-relaxed text-gray-600">
                    {lang === 'pt'
                      ? <>Você ganhou um giro <strong>EXTRA</strong> grátis. Toque em <em>GIRAR GRÁTIS AGORA</em> para tentar novamente!</>
                      : <>You won an <strong>EXTRA</strong> free spin. Tap <em>SPIN FREE NOW</em> to try again!</>}
                  </p>
                  <Button
                    onClick={handleRetry}
                    className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 text-white font-bold"
                  >
                    {lang === 'pt' ? "🎯 GIRAR GRÁTIS AGORA" : "🎯 SPIN FREE NOW"}
                  </Button>
                </div>
              ) : (
                <>
                  <div className="inline-block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-6 py-2 rounded-full font-bold text-sm tracking-wider">
                    {lang === 'pt' ? "DESCONTO EXCLUSIVO" : "EXCLUSIVE DISCOUNT"}
                  </div>
                  <p className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    {result}
                  </p>
                  {spinCountRef.current === 2 && /75%/i.test(result) && (
                    <a
                      href="https://oferta.blackfridaywelong.shop/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-full mt-3"
                    >
                      <Button className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 text-white font-bold">
                        {lang === 'pt' ? "🌐 IR PARA O SITE" : "🌐 GO TO SITE"}
                      </Button>
                    </a>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {showSpinButton && (
        <Button
          onClick={spinWheel}
          disabled={isSpinning}
          className="w-full max-w-md bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 text-white text-xl shadow-2xl py-8 disabled:opacity-50"
        >
          {isSpinning
            ? (lang === 'pt' ? "GIRANDO..." : "SPINNING...")
            : (lang === 'pt' ? "🎰 GIRE PARA GANHAR!" : "🎰 SPIN TO WIN!")}
        </Button>
      )}
    </div>
  );
};
