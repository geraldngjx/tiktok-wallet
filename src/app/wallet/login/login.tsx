import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import EmailOTP from "./email-otp";

export default function Login({ isFromShop = false }: { isFromShop?: boolean }) {
    return (
        <div className="w-full h-fit flex justify-center items-center p-6">
            <NeonGradientCard className="w-full">
                <EmailOTP isFromShop={isFromShop} />
            </NeonGradientCard>
        </div>
    );
}
