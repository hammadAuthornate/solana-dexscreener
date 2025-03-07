// app/layout.tsx
import type { Metadata } from "next";
import { WalletContextProvider } from "./provider/WalletProvider";
import { AlertDialogProvider } from "./provider/useAlertDialog";
import "@solana/wallet-adapter-react-ui/styles.css";
import "./global.css";
import QueryProvider from "./provider/queryProvider";

export const metadata: Metadata = {
  title: "Solana Auth",
  description: "Solana wallet authentication with NextAuth.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <QueryProvider>
          <WalletContextProvider>
            <AlertDialogProvider>{children}</AlertDialogProvider>
          </WalletContextProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
