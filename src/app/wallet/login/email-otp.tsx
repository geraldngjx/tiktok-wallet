"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useMagic } from "@/providers/MagicProvider";
import { useMagicTokenStore } from "@/store/magicTokenStore";
import { saveToken } from "@/utils/common";
import { LoginProps } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import CircularProgress from "@mui/material/CircularProgress";
import { Disc3Icon } from "lucide-react";
import { RPCError, RPCErrorCode } from "magic-sdk";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().email(),
});

export default function EmailOTP() {
  const { token, setToken } = useMagicTokenStore();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
    },
    mode: "all",
  });

  const { magic } = useMagic();

  const [isLoginInProgress, setLoginInProgress] = useState(false);

  const { toast } = useToast();

  const handleLogin = async (values: z.infer<typeof loginFormSchema>) => {
    try {
      setLoginInProgress(true);
      const token = await magic?.auth.loginWithEmailOTP({
        email: values.email,
      });
      if (token) {
        saveToken(token, setToken, "EMAIL");
        form.setValue("email", "");
      }
    } catch (e) {
      console.log("login error: " + JSON.stringify(e));
      if (e instanceof RPCError) {
        switch (e.code) {
          case RPCErrorCode.MagicLinkFailedVerification:
          case RPCErrorCode.MagicLinkExpired:
          case RPCErrorCode.MagicLinkRateLimited:
          case RPCErrorCode.UserAlreadyLoggedIn:
            toast({ title: e.message, description: "error" });
            break;
          default:
            toast({
              title: "Something went wrong. Please try again",
            });
        }
      }
    } finally {
      setLoginInProgress(false);
    }
  };

  return (
    <Card className="p-4 space-y-4 rounded-[var(--card-content-radius)]">
      <div className="flex flex-col items-center space-y-2">
        <Image
          src="/tiktok_logo_circle.png"
          alt="Tiktok Logo"
          width={40}
          height={40}
        />
        <h2 className="line-clamp-1 font-bold text-2xl">TikTok Wallet</h2>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleLogin)}
          className="login-method-grid-item-container space-y-8"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email OTP Login</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={
                      token.length > 0 ? "Already logged in" : "Email"
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full login-button"
            disabled={
              isLoginInProgress ||
              (token.length > 0 ? false : form.getValues("email").length == 0)
            }
          >
            {isLoginInProgress ? <Disc3Icon /> : "Log in / Sign up"}
          </Button>
        </form>
      </Form>

      {/* <div>
                <Input
                    onChange={(e) => {
                        if (emailError) setEmailError(false);
                        setEmail(e.target.value);
                    }}
                    placeholder={token.length > 0 ? "Already logged in" : "Email"}
                    value={email}
                />
                {emailError && <span className="error">Enter a valid email</span>}
                <button
                    className="login-button"
                    disabled={isLoginInProgress || (token.length > 0 ? false : email.length == 0)}
                    onClick={() => handleLogin()}
                >
                    {isLoginInProgress ? <CircularProgress /> : "Log in / Sign up"}
                </button>
            </div> */}
    </Card>
  );
}
