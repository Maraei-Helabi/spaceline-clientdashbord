import NextAuth, { JWT } from "next-auth/jwt";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
      fullName: string;
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname": string;
      ipAddress: string;
      role: string;
      image_url: string;
      agentId: string;
      branchId: string;
      isAdmin: string;
      UserType: string;
      CustomerId: string;
      exp: number;
      token?: string;
      refreshToken?: string;
      refreshTokenExpiryTime?: string;
    } & DefaultSession["user"]; // Keep default properties like name, email, image
  }

  interface User {
    // Define additional properties for the User interface if needed
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
    fullName: string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname": string;
    ipAddress: string;
    role: string;
    image_url: string;
    agentId: string;
    branchId: string;
    isAdmin: string;
    UserType: string;
    CustomerId: string;
    exp: number;
    token?: string;
    refreshToken?: string;
    refreshTokenExpiryTime?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    // Add your custom properties here for the JWT
    id: string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
    fullName: string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname": string;
    ipAddress: string;
    role: string;
    image_url: string;
    agentId: string;
    branchId: string;
    isAdmin: string;
    UserType: string;
    CustomerId: string;
    exp: number;
    token?: string;
    refreshToken?: string;
    refreshTokenExpiryTime?: string;
  }
}
