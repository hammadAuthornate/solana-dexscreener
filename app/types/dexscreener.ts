export interface DexscreenerTokenProfile {
  url: string;
  chainId: string;
  tokenAddress: string;
  icon: string;
  header: string;
  openGraph: string;
  description: string;
  links: [
    {
      type: string;
      label: string;
      url: string;
    }
  ];
}

export interface DexscreenerPairResponse {
  schemaVersion: string;
  pairs: [
    {
      chainId: string;
      dexId: string;
      url: string;
      pairAddress: string;
      priceNative: string;
      priceUsd: string;
      fdv: number;
      marketCap: number;
      pairCreatedAt: number;
      labels: [string];
      volume: {
        ANY_ADDITIONAL_PROPERTY: number;
      };
      priceChange: {
        ANY_ADDITIONAL_PROPERTY: number;
      };
      baseToken: {
        address: string;
        name: string;
        symbol: string;
      };
      quoteToken: {
        address: string;
        name: string;
        symbol: string;
      };
      liquidity: {
        usd: number;
        base: number;
        quote: number;
      };
      boosts: {
        active: number;
      };
      txns: {
        ANY_ADDITIONAL_PROPERTY: {
          buys: number;
          sells: number;
        };
      };
      info: {
        imageUrl: string;
        websites: [
          {
            url: string;
          }
        ];
        socials: [
          {
            platform: string;
            handle: string;
          }
        ];
      };
    }
  ];
}
