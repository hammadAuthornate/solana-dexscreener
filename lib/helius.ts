"use client";

import { helius } from "./HeliusConfig";

export async function useGet1() {
  const result = await helius.rpc.searchAssets({
    tokenType: "all",
    // limit: 2,
    // burnt: false,
    page: 1,
    compressed: true,
  });
  console.log("result ", result);
}
