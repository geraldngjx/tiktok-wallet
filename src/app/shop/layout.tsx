import { ReactNode } from "react";

export default function MainShopLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col w-full h-[calc(100vh-56px)] bg-[#EEEFFF]">
      {children}
    </div>
  );
}
