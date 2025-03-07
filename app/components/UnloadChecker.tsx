"use client";
import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAlertDialog } from "../provider/useAlertDialog";

export default function UnloadChecker() {
  const { connected, wallet, disconnect } = useWallet();
  const { openDialog } = useAlertDialog();

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (connected) {
        console.log("Current wallet ", wallet);
        // event.preventDefault();
        // event.stopPropagation();
        // dialogRef?.current?.showModal();
        openDialog({
          variant: "warning",
          title: "Ready to Pull?",
          description: "Your Investments will be pulled if you close this tab.",
          actionLabel: "Leave",
          onAction: () => {
            console.log("done");
            // window.close();
            disconnect().then(() => {
              console.log("disconnected");
              window.location.reload();
            });
          },
        });
        event.returnValue =
          "Are you sure you want to leave? Your Investments will be pulled!";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [connected, disconnect, openDialog, wallet]);

  return <></>;
}
