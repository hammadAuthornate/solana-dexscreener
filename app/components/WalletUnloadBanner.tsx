"use client";
import { useWallet } from "@solana/wallet-adapter-react";

export default function WalletUnloadBanner() {
  const { connected } = useWallet();

  if (connected) {
    return (
      <div className="w-screen p-2 bg-yellow-200 font-extrabold underline text-center text-purple-400">
        Your Investments will be pulled when you close this browser tab.
      </div>
    );
  }
  return <></>;
}
