import "next-auth";
import "next-auth/jwt";

interface UserWithId extends DefaultSession["user"] {
  id?: string;
}

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    idToken?: string;
    user: UserWithId;
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    accessTokenExpires?: number;
    refreshToken?: string;
    user: UserWithId;
    error?: string;
  }
}
