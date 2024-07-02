import TopNavigation from "@/components/ui/top-navigation";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col w-full h-full">
            <TopNavigation />
            {children}
        </div>
    );
}
