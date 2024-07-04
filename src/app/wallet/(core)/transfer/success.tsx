import Confetti, { ConfettiRef } from "@/components/magicui/confetti";
import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { Check } from "lucide-react";
import { withAuthMagic } from "@/lib/hoc/withAuth";

function TransactionSuccess({
    signature,
    toEmail,
    amount,
    currency,
}: {
    signature: string;
    toEmail?: string;
    amount: string;
    currency: "Solana" | "USDC" | "EURC";
}) {
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
        <div className="flex flex-col w-full h-full justify-center items-center overflow-hidden">
            <Confetti ref={confettiRef} className="absolute left-0 top-0 z-0 h-full w-full" />

            <div className="flex flex-col justify-center items-center px-10 w-full">
                <div className="bg-green-600 size-20 rounded-full justify-center items-center flex">
                    <Check size={32} />
                </div>

                <div className="text-lg mt-12 text-center items-center justify-center flex flex-col">
                    <span>Congratulations, you have successfully sent</span>
                    <div>
                        <span className="font-bold mx-1">
                            {amount} {currency}
                        </span>
                        to
                    </div>

                    <div>
                        <span className="font-bold">{toEmail}</span>!
                    </div>
                </div>

                <div className="text-xs mt-32 flex flex-col text-center w-full">
                    <span className="font-semibold">Signature:</span>
                    <span className="flex text-ellipsis">{signature}</span>
                </div>
            </div>
        </div>
    );
}

export default withAuthMagic(TransactionSuccess);
