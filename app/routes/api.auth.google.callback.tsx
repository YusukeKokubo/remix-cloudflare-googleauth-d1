import type { LoaderFunctionArgs } from "@remix-run/cloudflare"
import authenticator from "~/libs/remix-auth/auth.server"

export const loader = ({ request, context }: LoaderFunctionArgs) => {
  return authenticator.authenticate("google", request, {
    successRedirect: "/",
    failureRedirect: "/",
    context,
  })
}
