'use client'

import { config } from "@/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import { WagmiProvider } from "wagmi";
import { WalletProvider } from "./walletProvider";

const queryClient = new QueryClient()

export function Providers({
  children
}: React.PropsWithChildren) {
  return <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        {children}
      </WalletProvider>
    </QueryClientProvider>
  </WagmiProvider>
}
