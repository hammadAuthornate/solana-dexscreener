import { DexscreenerTokenProfile } from "@/app/types/dexscreener";

export async function GET() {
  const result = await fetch(
    "https://api.dexscreener.com/token-profiles/latest/v1"
  );
  if (result.status !== 200) {
    return Response.error();
  }
  const data: DexscreenerTokenProfile[] = await result.json();
  return Response.json(data);
}
