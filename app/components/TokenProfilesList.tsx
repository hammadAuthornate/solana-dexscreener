"use client";

import { useState } from "react";
// import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  Twitter,
  MessageCircle,
  ChevronRight,
  Loader2Icon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetLatestTokenProfiles } from "../../lib/dexscreener";

interface TokenLink {
  label?: string;
  type?: string;
  url: string;
}

interface Token {
  url: string;
  chainId: string;
  tokenAddress: string;
  icon: string;
  header?: string;
  openGraph?: string;
  description: string;
  links: TokenLink[];
}

interface TokenListProps {
  tokens: Token[];
}

export default function TokenProfilesList() {
  const {
    data: tokens,
    isLoading,
    isError,
    error,
  } = useGetLatestTokenProfiles();

  if (isLoading) {
    return (
      <div className="bg-muted rounded-xl px-6 py-2 text-foreground flex items-center gap-4">
        <Loader2Icon className="size-4 animate-spin" /> Loading tokens list...
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Token List</h1>

      <div className="space-y-4">
        {tokens?.map((token, index) => (
          <TokenListItem key={token.tokenAddress || index} token={token} />
        ))}
      </div>
    </div>
  );
}

function TokenListItem({ token }: { token: Token }) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          {/* Token Icon/Header Section */}
          <div className="sm:w-1/3 md:w-1/4 bg-muted/10">
            {token.header && !imageError ? (
              //   <div className="relative w-full h-full">
              <img
                src={token.header || "/placeholder.svg"}
                alt={`${token.tokenAddress} header`}
                //   fill
                className="object-contain h-full w-full"
                onError={handleImageError}
                //   priority
              />
            ) : (
              //   </div>
              <div className="flex items-center justify-center h-full min-h-24 p-4">
                {token.icon ? (
                  <div className="relative w-full max-w-16 h-full rounded-full overflow-hidden">
                    <img
                      src={token.icon || "/placeholder.svg"}
                      alt={`${token.tokenAddress} icon`}
                      //   fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 flex items-center justify-center bg-secondary rounded-full">
                    <span className="text-3xl">🪙</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Token Info Section */}
          <div className="flex-1 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
              <div>
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <span className="truncate max-w-[200px]">
                    {token.tokenAddress.substring(0, 6)}...
                    {token.tokenAddress.substring(
                      token.tokenAddress.length - 4
                    )}
                  </span>
                  <Badge variant="outline">{token.chainId}</Badge>
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {token.description || "No description available"}
                </p>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="sm:self-start"
                >
                  <Link
                    href={token.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <span className="mr-1">View Details</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="sm:self-start"
                >
                  <Link
                    href={token.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <span className="mr-1">View Dex Page</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <Separator className="my-3" />

            {/* Links Section */}
            <div className="flex flex-wrap gap-2 mt-2">
              {token?.links?.map((link, index) => (
                <LinkButton key={index} link={link} />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function LinkButton({ link }: { link: TokenLink }) {
  // Determine icon based on link type
  let icon = <ExternalLink className="h-4 w-4 mr-2" />;
  let label = link.label || "Link";

  if (
    link.type === "twitter" ||
    link.url.includes("twitter.com") ||
    link.url.includes("x.com")
  ) {
    icon = <Twitter className="h-4 w-4 mr-2" />;
    label = "Twitter";
  } else if (link.type === "telegram" || link.url.includes("t.me")) {
    icon = <MessageCircle className="h-4 w-4 mr-2" />;
    label = "Telegram";
  } else if (link.label === "Website") {
    label = "Website";
  }

  return (
    <Button variant="secondary" size="sm" asChild>
      <Link href={link.url} target="_blank" rel="noopener noreferrer">
        {icon}
        {label}
      </Link>
    </Button>
  );
}
