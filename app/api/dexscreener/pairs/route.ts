import { DexscreenerPairResponse } from "@/app/types/dexscreener";

export async function GET() {
  const result = await fetch(
    "https://api.dexscreener.com/latest/dex/search?q=SOL/USDC"
  );
  if (result.status !== 200) {
    return Response.error();
  }
  const data: DexscreenerPairResponse = await result.json();
  return Response.json(data);
}
