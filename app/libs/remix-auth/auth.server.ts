import { Authenticator } from "remix-auth"
import { sessionStorage } from "./session.server"
import { GoogleStrategy } from "remix-auth-google"
import { User } from "~/types/user"

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
  async ({ accessToken, refreshToken, profile }) => {
    // TODO: Save the user to the database
    return {
      id: profile.id,
      name: profile.displayName ?? "",
      email: profile.emails?.[0].value ?? "",
      image: profile.photos?.[0].value ?? "",
    }
  }
)

const authenticator = new Authenticator<User>(sessionStorage)
authenticator.use(googleStrategy)
export default authenticator
