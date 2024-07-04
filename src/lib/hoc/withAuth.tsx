import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState, ComponentType } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useMagicTokenStore } from "@/store/magicTokenStore";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
    const AuthenticatedComponent = (props: P) => {
        const [isLoading, setIsLoading] = useState(true);
        const router = useRouter();

        useEffect(() => {
            async function authenticate() {
                const supabase = createClient();
                const {
                    data: { user },
                } = await supabase.auth.getUser();
                if (!user) {
                    router.push("/wallet/login");
                } else {
                    setIsLoading(false);
                }
            }
            authenticate();
        }, [router]);

        if (isLoading) {
            return (
                <Box className="flex items-center justify-center min-h-screen">
                    <CircularProgress />
                </Box>
            );
        }

        return <WrappedComponent {...props} />;
    };

    return AuthenticatedComponent;
};

const withAuthMagic = <P extends object>(WrappedComponent: ComponentType<P>) => {
    const AuthenticatedComponent = (props: P) => {
        const [isLoading, setIsLoading] = useState(true);
        const router = useRouter();

        useEffect(() => {
            const token = localStorage.getItem("token") ?? "";

            if (token === "") {
                router.push("/wallet");
            } else {
                setIsLoading(false);
            }
        }, [router]);

        if (isLoading) {
            return (
                <Box className="flex items-center justify-center min-h-screen">
                    <CircularProgress />
                </Box>
            );
        }

        return <WrappedComponent {...props} />;
    };

    return AuthenticatedComponent;
};

export { withAuth, withAuthMagic };
