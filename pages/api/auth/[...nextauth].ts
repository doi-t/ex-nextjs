import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { getToken } from "next-auth/jwt"
import CognitoProvider from "next-auth/providers/cognito";
import { Issuer } from "openid-client";

if (!process.env.COGNITO_CLIENT_ID || !process.env.COGNITO_CLIENT_SECRET) {
  throw new Error("Parameters for Cognito not set properly");
}

const cognitoProvider = CognitoProvider({
  clientId: process.env.COGNITO_CLIENT_ID,
  clientSecret: process.env.COGNITO_CLIENT_SECRET,
  issuer: process.env.COGNITO_ISSUER, // https://cognito-idp.{region}.amazonaws.com/{PoolId}
  idToken: true, // next-auth can decode the id_token to get the user information, instead of making an additional request to the userinfo endpoint.
  checks: 'nonce', // This resolves a "nonce missmatch" error. See https://github.com/nextauthjs/next-auth/pull/4100 and https://github.com/nextauthjs/next-auth/discussions/3551
});

// Ref. https://mseeeen.msen.jp/nextauth-cognito-token-refresh/
async function refreshAccessToken(token: any): Promise<JWT> {
  try {
    const client_id = cognitoProvider.options?.clientId ?? "";
    const client_secret = cognitoProvider.options?.clientSecret ?? "";
    const issuer = await Issuer.discover(cognitoProvider.wellKnown);
    const token_endpoint = issuer.metadata.token_endpoint ?? "";
    const basicAuthParams = `${client_id}:${client_secret}`;
    const basicAuth = Buffer.from(basicAuthParams).toString("base64");
    const params = new URLSearchParams({
      client_id,
      client_secret,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken,
    });
    // Refresh token
    const response = await fetch(token_endpoint, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${basicAuth}`,
      },
      method: "POST",
      body: params.toString(),
    });
    const newTokens = await response.json();
    if (!response.ok) {
      throw newTokens;
    }
    // Next expiration period
    const accessTokenExpires =
      Math.floor(Date.now() / 1000) + newTokens.expires_in;
    console.debug(`Token refreshed (expires at: ${accessTokenExpires})`);
    // Return new token set
    return {
      ...token,
      error: undefined,
      accessToken: newTokens.access_token,
      accessTokenExpires,
    };
  } catch (error) {
    console.debug(error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions = {
  providers: [cognitoProvider],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,

  },
  callbacks: {
    jwt: async ({ user, token, account }) => {
      // Initial sign in
      console.debug("jwt callback...", account, user)
      if (account && user) {
        console.debug(`Pre-generated ID Token: {account.id_token}`)
        return {
          accessToken: account.access_token,
          accessTokenExpires: account.expires_at,
          refreshToken: account.refresh_token,
          idToken: account.id_token, // Pass id_token to session. This is the pre-generated ID Token along with Cognito custom attributes.
          user,
        };
      }
      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.accessTokenExpires ?? 0) * 1000) {
        console.debug(`Token available (expires at: ${token.accessTokenExpires})`);
        return token;
      }
      console.debug(`Token expired at ${token.accessTokenExpires}. Trying to refresh...`);
      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    session: async ({ session, token }) => {
      // session callback will be executed after jwt callback.
      console.debug("callback: session...", session, token)
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;
      session.error = token.error;
      return session;
    },
    redirect({ url, baseUrl }) {
      // Ref. https://mseeeen.msen.jp/logout-cognito-session-with-nextauth/
      console.debug("redirect callback...", url, baseUrl)
      // Sign out from OAuth provider (Cognito)
      // call `signOut({ callbackUrl: "signOut" });` then this callback called
      // https://github.com/nextauthjs/next-auth/discussions/3938#discussioncomment-2231398
      if (url.startsWith(baseUrl)) return url;
      if (url === 'signOut' && process.env.COGNITO_LOGOUT_ENDPOINT_URL) {
        console.debug("Signing out via redirection...")
        // Sign out from auth provider
        const logoutEndpointUrl = process.env.COGNITO_LOGOUT_ENDPOINT_URL || "";
        const params = new URLSearchParams({
          client_id: process.env.COGNITO_CLIENT_ID || "",
          logout_uri: process.env.NEXTAUTH_URL,
          redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/cognito`,
          response_type: "code",
        });
        return `${logoutEndpointUrl}?${params.toString()}`;
      }
      // Allows relative callback URLs
      if (url.startsWith('/')) return new URL(url, baseUrl).toString();
      // Redirect to root when the redirect URL is still an external domain
      return baseUrl;
    },
  },
  // debug: true
};

console.debug("NextAuth Providers...")
// The following process will be executed once a user access http://localhost:3000/api/auth/callback/cognito.
export default NextAuth(authOptions);
