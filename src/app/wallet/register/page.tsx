// This page handles the creation of a new wallet.
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button, Card, Typography } from "@mui/material";
import Image from "next/image";
import { signup } from "@/lib/auth";

const RegisterWalletPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form className="w-full max-w-sm">
        <div className="flex flex-col items-center gap-2 p-8">
          <Image
            src="/tiktok_logo_circle.png"
            alt="Tiktok Logo"
            width={40}
            height={40}
          />
          <Typography component="h1" variant="h5">
            Create a New Wallet
          </Typography>
        </div>

        <Card className="flex flex-col gap-4 p-4" raised={true}>
          <div>
            <Label htmlFor="email">Your Email Address</Label>
            <Input id="email" type="email" name="email" />
          </div>
          <div>
            <Label htmlFor="password">Your Password</Label>
            <Input id="password" type="password" name="password" />
          </div>
          <Button formAction={signup} type="submit">
            Submit
          </Button>
        </Card>
      </form>
    </div>
  );
};

export default RegisterWalletPage;
