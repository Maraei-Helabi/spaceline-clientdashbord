"use client";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AxiosError } from "axios";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

// Global handler for unauthorized
const queryCache = new QueryCache({
  onError: (error) => {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.error);
      if (error.response?.status === 401)
        signOut({ redirect: true, callbackUrl: "/login" });
    }
  },
});

const mutationCache = new MutationCache({
  onError: (error) => {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.error);
      if (error.response?.status === 401)
        signOut({ redirect: true, callbackUrl: "/login" });
    }
  },
});

export const queryClient = new QueryClient({
  queryCache,
  mutationCache,
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 360000, // ? 5 mins
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

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
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
