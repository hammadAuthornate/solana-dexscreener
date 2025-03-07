"use client";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { monitorTokens } from "../lib/solana";

export default function WalletBalanceChecker() {
  const wallet = useWallet();
  const { connection } = useConnection();

  return (
    <>
      <button
        onClick={() =>
          connection
            .getAccountInfo(wallet?.wallet?.adapter?.publicKey!)
            .then((res) => console.log("wallet details ", res))
        }
      >
        Fetch Balances
      </button>

      <button onClick={() => monitorTokens()}>Monitor Tokens</button>
    </>
  );
}
