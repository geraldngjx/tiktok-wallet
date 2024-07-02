import AuthForm from "@/components/wallet/auth-form";
import Image from "next/image";

const LoginWalletPage = () => {
    return (
        <div className="flex items-center justify-center h-full flex-col w-full px-20 space-y-8">
            <div className="flex flex-col items-center space-y-2">
                <Image src="/tiktok_logo_circle.png" alt="Tiktok Logo" width={40} height={40} />
                <h2 className="line-clamp-1 font-bold text-2xl">Login to Your Wallet</h2>
            </div>

            {/* <Card className="flex flex-col gap-4 p-4" raised={true}>
                    <div>
                        <Label htmlFor="email">Your Email Address</Label>
                        <Input type="email" name="email" />
                    </div>
                    <div>
                        <Label htmlFor="password">Your Password</Label>
                        <Input type="password" name="password" />
                    </div>
                    <Button formAction={login} type="submit">
                        Submit
                    </Button>
                </Card> */}
            <AuthForm type="login" />
        </div>
    );
};

export default LoginWalletPage;
