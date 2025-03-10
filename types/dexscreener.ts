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

export interface DexscreenerPairDetailsResponse {
  schemaVersion: string;
  cg: null;
  gp: null;
  ts: null;
  cmc: null;
  ti: {
    id: string;
    chain: {
      id: string;
    };
    address: string;
    name: string;
    symbol: string;
    description: string;
    websites: {
      label: string;
      url: string;
    }[];
    socials: {
      type: string;
      url: string;
    }[];
    lockedAddresses: [];
    createdAt: string;
    updatedAt: string;
    sortByDate: string;
    image: string;
    headerImage: string;
    profile: {
      header: boolean;
      website: boolean;
      twitter: boolean;
      discord: boolean;
      linkCount: number;
      imgKey: string;
    };
  };
  cms: null;
  qi: null;
  ds: {
    id: string;
    chain: {
      id: string;
    };
    address: string;
    name: string;
    symbol: string;
    description: string;
    websites: {
      label: string;
      url: string;
    }[];
    socials: {
      type: string;
      url: string;
    }[];
    lockedAddresses: [];
    createdAt: string;
    updatedAt: string;
    sortByDate: string;
    image: string;
    headerImage: string;
    profile: {
      header: boolean;
      website: boolean;
      twitter: boolean;
      discord: boolean;
      linkCount: number;
      imgKey: string;
    };
  };
  ll: {
    locks: [
      {
        tag: string;
        address: string;
        amount: string;
        percentage: number;
      }
    ];
    totalPercentage: number;
  };
  holders: {
    count: number;
    totalSupply: string;
    holders: {
      id: string;
      balance: string;
      percentage: number;
    }[];
  };
  lpHolders: {
    count: number;
    totalSupply: string;
    holders: {
      id: string;
      label: string;
      balance: string;
      percentage: number;
    }[];
  };
  su: null;
  ta: {
    solana: {
      isMintable: boolean;
      isFreezable: boolean;
    };
  };
}
