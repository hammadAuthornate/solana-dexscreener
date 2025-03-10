"use client";

import dynamic from "next/dynamic";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);
export default function WalletConnector() {
  return (
    <>
      <WalletMultiButtonDynamic className="mt-4" />
    </>
  );
}
