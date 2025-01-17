import TopNavigation from "@/components/ui/top-navigation";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col w-full h-[calc(100vh-56px)] bg-[#010101] text-white">
            <TopNavigation />
            {children}
        </div>
    );
}
