import { Separator } from "@/components/ui/separator";
import TransactionList from "@/components/wallet/transactionList";
import { useMagicTokenStore } from "@/store/magicTokenStore";
import Core from "./core";
import { withAuthMagic } from "@/lib/hoc/withAuth";

function WalletDashboard() {
    const { token, setToken } = useMagicTokenStore();

    return (
        <div className="flex flex-col h-full w-full bg-[#010101]">
            <Core />

            <Separator className="bg-neutral-500" />

            <TransactionList />
            {/* Wallet Navigation Links */}
            {/* <UserInfo token={token} setToken={setToken} /> */}
            {/* <div>
                <Card className="flex mx-8 gap-4 justify-around items-center">
                    <Link href="/wallet/topup" className="flex m-4 flex-col items-center">
                        <Wallet />
                        <div>Top-Up</div>
                    </Link>
                    <Link href="/wallet/transfer" className="flex m-4 flex-col items-center">
                        <Send />
                        <div>Transfer</div>
                    </Link>
                    <Link href="/wallet/scan" className="flex m-4 flex-col items-center">
                        <QrCodeScanner />
                        <div>Scan To Pay</div>
                    </Link>
                </Card>
            </div>

            <div className="flex flex-col gap-2">
                <h1 className="mx-8">Recent Recipients</h1>
                <Card className="flex mx-8 gap-4 justify-around items-center">

                    <div className="flex m-4 flex-col items-center">
                        <AccountCircle />
                        <div>Tom</div>
                    </div>
                    <div className="flex m-4 flex-col items-center">
                        <AccountCircle />
                        <div>Alice</div>
                    </div>
                    <div className="flex m-4 flex-col items-center">
                        <AccountCircle />
                        <div>Tracy</div>
                    </div>
                </Card>
            </div>
            <Button onClick={() => signout()}>Sign Out</Button>
            <div className="flex flex-col gap-2">
                <TransactionList />
            </div> */}
        </div>
    );
}

export default withAuthMagic(WalletDashboard);
