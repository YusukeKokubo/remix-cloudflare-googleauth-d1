import { createCookieSessionStorage } from "@remix-run/cloudflare"

const sessionSecret = process.env.SESSION_SECRET
if (!sessionSecret) {
  throw new Error("SESSION_SECRET is required")
}

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "auth_session",
    path: "/",
    secrets: [sessionSecret],
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
    // We're setting the cookie to be secure in production
    // so that it's only sent over HTTPS
    secure: process.env.NODE_ENV === "production",
    // We're setting the cookie to be HttpOnly so that it's
    // not accessible via JavaScript
    httpOnly: true,
    // We're setting the cookie to have the SameSite attribute
    // so that it's not sent in cross-origin requests
    sameSite: "lax",
  },
})
