"use client";
import {
  isServer,
  MutationCache,
  MutationMeta,
  QueryCache,
  QueryClient,
  QueryClientProvider,
  QueryMeta,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AxiosError } from "axios";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

const globalOnError = (error: unknown, meta?: QueryMeta | MutationMeta) => {
  const { preventAuthorizedRedirect } = meta ?? {};

  if (error instanceof AxiosError) {
    const message =
      error.response?.data?.messages.join(", ") || "An error occurred";
    toast.error(message);

    if (error.response?.status === 401 && !preventAuthorizedRedirect)
      signOut({ redirect: true, callbackUrl: "/login" });
  }
};

// Global handler for unauthorized
const queryCache = new QueryCache({
  onError: (error, query) => {
    globalOnError(error, query.meta);
  },
});

const mutationCache = new MutationCache({
  onError: (error, _variables, _context, mutation) => {
    globalOnError(error, mutation.meta);
  },
});

function makeQueryClient() {
  return new QueryClient({
    queryCache,
    mutationCache,
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
        retry: (count, error) => {
          if (
            (error instanceof AxiosError && error.response?.status === 401) ||
            count === 2
          ) {
            return false;
          }

          return true;
        },
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools
        initialIsOpen={false}
        position="bottom"
        buttonPosition="bottom-left"
      />
    </QueryClientProvider>
  );
};

export { ReactQueryProvider };
