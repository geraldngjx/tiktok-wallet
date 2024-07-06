"use server";

import { SolanaDevnetProgramAddress } from "@/constants/tokenAddress";
import { getNetworkUrl } from "@/lib/network";
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js";
import bs58 from "bs58";

const AddressToTimestampMap = new Map<string, number>();

export default async function requestAirdrop({ publicAddress }: { publicAddress: string }) {
    const rpcUrl = getNetworkUrl() || "https://solana-devnet.g.alchemy.com/v2/huCDT74XQJEq2Ed1AF8e1lDisWJulLHV";
    const connection = new Connection(rpcUrl, "confirmed");

    const recipient = new PublicKey(publicAddress);

    console.log("attempting to airdrop to recipient: ", recipient.toBase58());

    const balance = await connection.getBalance(recipient);

    console.log(`${recipient.toBase58()}'s current balance`, balance);

    if (balance >= 0.01 * LAMPORTS_PER_SOL) {
        console.log("Balance is greater than or equal to 0.01 SOL");
        return null;
    }

    const now = Date.now();
    const lastAirdrop = AddressToTimestampMap.get(publicAddress) || 0;
    const timeSinceLastAirdrop = now - lastAirdrop;

    if (timeSinceLastAirdrop < 1000 * 60 * 60 * 24) {
        console.log("Airdrop already requested within the last 24 hours");
        return;
    }

    try {
        const requestAirdropSignature = await connection.requestAirdrop(recipient, 1 * LAMPORTS_PER_SOL);
        console.log("requestAirdropSignature", requestAirdropSignature);
        AddressToTimestampMap.set(publicAddress, now);

        return { signature: requestAirdropSignature };
    } catch (e) {
        console.log("error requesting airdrop from official faucet");
    }

    try {
        const paymasterKeypair = Keypair.fromSecretKey(bs58.decode(process.env.NEXT_PUBLIC_MY_SOLANA_DEVNET_PRIVATE_KEY as string));

        const hash = await connection.getLatestBlockhash();
        if (!hash) return;
        const transaction = new Transaction({
            feePayer: paymasterKeypair.publicKey,
            ...hash,
        });

        const transfer = SystemProgram.transfer({
            fromPubkey: paymasterKeypair.publicKey,
            toPubkey: recipient,
            lamports: LAMPORTS_PER_SOL * 0.1,
        });

        transaction.add(transfer);

        transaction.add(
            new TransactionInstruction({
                keys: [{ pubkey: paymasterKeypair.publicKey, isSigner: true, isWritable: true }],
                data: Buffer.from("TikTok Wallet Solana Devnet Faucet", "utf-8"),
                programId: new PublicKey(SolanaDevnetProgramAddress.MEMO),
            })
        );

        transaction.sign(paymasterKeypair);

        const txSignature = await connection.sendRawTransaction(transaction.serialize());

        return { signature: txSignature };
    } catch (e) {
        console.log(e);
        return null;
    }
}
