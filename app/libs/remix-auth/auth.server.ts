import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { Authenticator } from "remix-auth";
import { GoogleStrategy } from "remix-auth-google";
import { users } from "~/db/schema";
import { sessionStorage } from "~/libs/remix-auth/session.server";
import type { User } from "~/types/user";

if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error("GOOGLE_CLIENT_ID is required")
}
if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("GOOGLE_CLIENT_SECRET is required")
}
if (!process.env.CLIENT_URL) {
  throw new Error("CLIENT_URL is required")
}

const googleStrategy = new GoogleStrategy<User>(
  {
    clientID: process.env.GOOGLE_CLIENT_ID ?? "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    callbackURL: `${process.env.CLIENT_URL}/api/auth/google/callback`,
  },
  async ({ accessToken, refreshToken, profile, context, request }) => {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const db = drizzle(context!.cloudflare.env.DB, { schema: { users } });
    const saved = await db.query.users.findFirst({
      where: eq(users.email, profile.emails?.[0].value),
    });
    if (!saved) {
      const inserted = await db.insert(users).values({
        email: profile.emails?.[0].value,
        name: profile.displayName,
        image: profile.photos?.[0].value,
      }).execute();
      console.log("inserted", inserted);
    }

    return {
      id: profile.id,
      name: profile.displayName ?? "",
      email: profile.emails?.[0].value ?? "",
      image: profile.photos?.[0].value ?? "",
    }
  },
)

const authenticator = new Authenticator<User>(sessionStorage)
authenticator.use(googleStrategy)
export default authenticator
