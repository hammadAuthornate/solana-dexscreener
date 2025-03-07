"use client";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

export default function Wallets() {
  const wallet = useWallet();
  const { connection } = useConnection();

  return (
    <div className="p-2 text-center flex flex-col justify-center items-center">
      <details className="list-none">
        <summary className="list-none marker:hidden">
          <h4 className="text-bold text-2xl bg-purple-300 rounded-xl p-2 my-4 w-full">
            Available Wallets
          </h4>
        </summary>

        <div className="p-2 flex flex-col gap-4 w-full items-center justify-center max-w-md">
          {wallet?.wallets?.map((w, k) => (
            <div
              key={k}
              className="flex gap-4 items-center w-full justify-between"
            >
              {w?.adapter?.icon && (
                <img src={w?.adapter?.icon} className="size-8" />
              )}
              <div className="w-full text-start">
                {w?.adapter?.name}{" "}
                {w?.adapter?.publicKey && (
                  <>
                    ({w?.adapter?.publicKey?.toString()?.slice(0, 4)}...
                    {w?.adapter?.publicKey?.toString()?.slice(-4)})
                  </>
                )}
              </div>

              <div
                className={`size-2 rounded-full ${
                  w.adapter.connected ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
            </div>
          ))}
        </div>
      </details>

      <div className="flex gap-4 items-center justify-center">
        <span>Connection</span>
        <span className="p-2 bg-purple-300 text-bold text-xl rounded-xl">
          {connection?.rpcEndpoint?.toString()}
        </span>
      </div>
      <button
        onClick={() =>
          connection
            .getAccountInfo(wallet?.wallet?.adapter?.publicKey!)
            .then((res) => console.log("wallet details ", res))
        }
      >
        Fetch Balances
      </button>
    </div>
  );
}
