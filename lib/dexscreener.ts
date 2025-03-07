"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DexscreenerTokenProfile } from "../types/dexscreener";
import { PublicKey } from "@solana/web3.js";
import { solanaConnection } from "./solana";

const DEX_SCREENER_BASE_URL = "https://api.dexscreener.com";

export function useGetLatestTokenProfiles() {
  return useQuery({
    queryKey: ["token-profiles-latest"],
    queryFn: async () => {
      const { data } = await axios.get(
        DEX_SCREENER_BASE_URL + "/token-profiles/latest/v1"
      );
      return data as DexscreenerTokenProfile[];
    },
  });
}

export function useGetTokenPairsByTokenAddress(address: string) {
  return useQuery({
    queryKey: ["token-pairs-for", address],
    queryFn: async () => {
      const { data } = await axios.get(
        DEX_SCREENER_BASE_URL + "/tokens/v1/solana/" + address
      );
      return data as DexscreenerTokenProfile[];
    },
  });
}

export function useGetTransactionLogsForTokenAddress(address?: string) {
  return useQuery({
    queryKey: ["transaction-logs-for", address],
    // refetchInterval: 5000,
    queryFn: async () => {
      if (!address || address.length < 30 || address.length > 50) {
        throw Error("Not a Valid Solana Address");
      }
      const publicKey = new PublicKey(address);
      const signatures = await solanaConnection.getSignaturesForAddress(
        publicKey
      );

      const result = await Promise.all(
        signatures?.map(async (sig) => {
          const transaction = await solanaConnection.getTransaction(
            sig.signature
          );
          console.log(transaction)
          return transaction;
        })
      );

      return result;
    },
  });
}
