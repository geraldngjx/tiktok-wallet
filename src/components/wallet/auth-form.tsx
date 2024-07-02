"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login, signup } from "@/lib/auth";

const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4),
});

export default function AuthForm({ type }: { type: "login" | "register" }) {
    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        mode: "all",
    });

    async function onSubmit(values: z.infer<typeof loginFormSchema>) {
        console.log(values);

        const formData = new FormData();
        formData.append("email", values.email);
        formData.append("password", values.password);

        switch (type) {
            case "login":
                await login(formData);
            case "register":
                await signup(formData);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">
                    {type === "register" ? "Create" : "Login"}
                </Button>
            </form>
        </Form>
    );
}
