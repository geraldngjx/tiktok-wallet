import Confetti, { ConfettiRef } from "@/components/magicui/confetti";
import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { Check } from "lucide-react";

export default function TransactionSuccess({ signature, toEmail, amount }: { signature?: string; toEmail?: string; amount?: string }) {
    const confettiRef = useRef<ConfettiRef>(null);

    useEffect(() => {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval = window.setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col w-full h-full justify-center items-center">
            <Confetti ref={confettiRef} className="absolute left-0 top-0 z-0 h-full w-full" />

            <div className="bg-green-600 size-20 rounded-full justify-center items-center flex">
                <Check size={32} />
            </div>
        </div>
    );
}
