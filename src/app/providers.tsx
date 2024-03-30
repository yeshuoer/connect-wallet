'use client'

import { config } from "@/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import { WagmiProvider } from "wagmi";

const queryClient = new QueryClient()

export function Providers({
  children
}: React.PropsWithChildren) {
  return <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  </WagmiProvider>
}
