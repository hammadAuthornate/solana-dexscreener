"use client";
import { use } from "react";
import { useGetTransactionLogsForTokenAddress } from "../lib/dexscreener";
import { Loader2Icon } from "lucide-react";

export default function TokenDetailsPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = use(params);
  const { data, isLoading, isError, error } =
    useGetTransactionLogsForTokenAddress(token);

  if (isLoading) {
    return (
      <div className="bg-muted rounded-xl px-6 py-2 text-foreground flex items-center gap-4">
        <Loader2Icon className="size-4 animate-spin" /> Loading Transactions
        list...
      </div>
    );
  }

  return (
    <div>
      <pre>{JSON.stringify(data)}</pre>
    </div>
  );
}
