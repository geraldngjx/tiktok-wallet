import { Separator } from "@/components/ui/separator";
import TransactionList from "@/components/wallet/transactionList";
import { useMagicTokenStore } from "@/store/magicTokenStore";
import Core from "./core";
import { withAuthMagic } from "@/lib/hoc/withAuth";
import { Input } from "@/components/ui/input";

function WalletDashboard() {
    const { token, setToken } = useMagicTokenStore();

    return (
        <div className="flex flex-col h-full w-full bg-[#010101]">
            <Core />

            <Separator className="bg-neutral-500" />

            <TransactionList />
        </div>
    );
}

export default withAuthMagic(WalletDashboard);
