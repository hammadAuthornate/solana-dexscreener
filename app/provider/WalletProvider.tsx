"use client";
import { WalletAdapterNetwork, WalletError } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  useLocalStorage,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  UnsafeBurnerWalletAdapter,
  PhantomWalletAdapter,
  TrustWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import dynamic from "next/dynamic";
import { FC, ReactNode, useCallback, useMemo } from "react";

const ReactUIWalletModalProviderDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletModalProvider,
  { ssr: false }
);

export const WalletContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [autoConnect] = useLocalStorage("autoConnect", false);
  const [networkConfiguration] = useLocalStorage("network", "devnet");
  const network = networkConfiguration as WalletAdapterNetwork;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new UnsafeBurnerWalletAdapter(),
      new PhantomWalletAdapter(),
      new TrustWalletAdapter(),
    ],
    [network]
  );

  const onError = useCallback((error: WalletError) => {
    // notify({ type: 'error', message: error.message ? `${error.name}: ${error.message}` : error.name });
    console.error(error);
  }, []);

  return (
    // TODO: updates needed for updating and referencing endpoint: wallet adapter rework
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider
        wallets={wallets}
        onError={onError}
        autoConnect={autoConnect}
      >
        <ReactUIWalletModalProviderDynamic>
          {children}
        </ReactUIWalletModalProviderDynamic>
      </WalletProvider>
    </ConnectionProvider>
  );
};
