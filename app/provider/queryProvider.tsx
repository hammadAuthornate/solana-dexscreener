"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import React from "react";

// const localStoragePersister = createSyncStoragePersister({
//   storage: window.localStorage,
// })

const QueryProvider = ({ children }: { children: React.ReactNode }) => {

  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry(failureCount, error) {
              if (failureCount < 3) {
                return true;
              } else {
                return false;
              }
            },
          },
        },
      }),
  );

  // persistQueryClient({
  //   queryClient,
  //   persister: localStoragePersister,
  // });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default QueryProvider;
