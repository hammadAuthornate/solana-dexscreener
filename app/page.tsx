// app/page.tsx
"use client";
import TokenProfilesList from "./components/TokenProfilesList";
import UnloadChecker from "./components/UnloadChecker";
import WalletBalanceChecker from "./components/WalletBalanceChecker";
import WalletConnector from "./components/WalletConnector";
import Wallets from "./components/Wallets";
import WalletUnloadBanner from "./components/WalletUnloadBanner";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <WalletUnloadBanner />
      <UnloadChecker />
      <WalletConnector />
      {/* <Wallets />
      <WalletBalanceChecker /> */}
      <TokenProfilesList />
    </div>
  );
}
