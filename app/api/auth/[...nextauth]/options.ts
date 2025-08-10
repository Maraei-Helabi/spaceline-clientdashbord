import { tokensLoginWithOtpForCustomer } from "@/orval/tokens/tokens";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import { http } from "@/lib/axios";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.fullName = user.fullName
        token.refreshToken = user.refreshToken
        token.CustomerId = user.CustomerId
        token.token = user.token
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.fullName = token.fullName as string;
        session.user.refreshToken = token.refreshToken as string;
        session.user.CustomerId = token.CustomerId as string;
        session.user.token = token.token as string;
      }

      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        otp: { label: "OTP", type: "text" },
        phone: { label: "Phone", type: "text" },
      },
      async authorize(credentials) {
        try {
          const data = await tokensLoginWithOtpForCustomer({
            otp: credentials?.otp || "",
            phoneNumber: credentials?.phone || "",
          });

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const user = jwtDecode<any>(data.token ?? "");

          if (data.refreshToken)
            http.defaults.headers["authorization"] = `Bearer ${data.token}`;

          return {
            ...user,
            ...data,
          };
        } catch {
          throw new Error("Invalid OTP or phone number");
        }
      },
    }),
  ],
};
