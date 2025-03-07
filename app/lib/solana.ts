"use client";
import { Connection, PublicKey } from "@solana/web3.js";

export const rayFee = new PublicKey(
  "7YttLkHDoNj9wyDur5pM1ejNaAvT9X4eqaYcHQqtj2G5"
);
const RPC_ENDPOINT =
  "https://mainnet.helius-rpc.com/?api-key=cd716db1-6133-46b4-9f2f-59f5b72c329b";
const RPC_WEBSOCKET_ENDPOINT =
  "wss://mainnet.helius-rpc.com/?api-key=cd716db1-6133-46b4-9f2f-59f5b72c329b";

export const solanaConnection = new Connection(RPC_ENDPOINT, {
    wsEndpoint: RPC_WEBSOCKET_ENDPOINT,
});

export async function monitorTokens() {
    console.log(`Monitoring new Solana tokens...`);
    solanaConnection.onLogs("all",   async ({ logs, err, signature },{}) => {
        try {
          if (err) {
            console.error(`Connection error: ${err}`);
            return;
          }

          console.log(`Found new token signature: ${signature}`);

          let signer = '';
          let baseAddress = '';
          let baseDecimals = 0;
          let baseLpAmount = 0;
          let quoteAddress = '';
          let quoteDecimals = 0;
          let quoteLpAmount = 0;

          const parsedTransaction = await solanaConnection.getParsedTransaction(signature, {
            maxSupportedTransactionVersion: 0,
            commitment: 'confirmed',
          });

          if (parsedTransaction && parsedTransaction.meta?.err == null) {
            console.log(`Successfully parsed transaction`);
            signer = parsedTransaction.transaction.message.accountKeys[0].pubkey.toString();
            console.log(`Creator: ${signer}`);

            const postTokenBalances = parsedTransaction?.meta?.postTokenBalances || [];

            const baseInfo = postTokenBalances.find(
              (balance) =>
                balance.owner === '5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1' &&
                balance.mint !== 'So11111111111111111111111111111111111111112'
            );

            if (baseInfo) {
              baseAddress = baseInfo.mint;
              baseDecimals = baseInfo.uiTokenAmount.decimals;
              baseLpAmount = baseInfo.uiTokenAmount.uiAmount || 0;
            }

            const quoteInfo = postTokenBalances.find(
              (balance) =>
                balance.owner === '5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1' &&
                balance.mint === 'So11111111111111111111111111111111111111112'
            );

            if (quoteInfo) {
              quoteAddress = quoteInfo.mint;
              quoteDecimals = quoteInfo.uiTokenAmount.decimals;
              quoteLpAmount = quoteInfo.uiTokenAmount.uiAmount || 0;
            }
          }

          const newTokenData = {
            lpSignature: signature,
            creator: signer,
            timestamp: new Date().toISOString(),
            baseInfo: {
              baseAddress,
              baseDecimals,
              baseLpAmount,
            },
            quoteInfo: {
              quoteAddress,
              quoteDecimals,
              quoteLpAmount,
            },
            logs: logs,
          };

          console.log("New token data ", newTokenData)
          localStorage.setItem('tokensFound', JSON.stringify(newTokenData))
        } catch (error) {
          console.error(`Error parsing transaction: ${error}`);
        }
      },
      'confirmed')

}
