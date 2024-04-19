import { type ActionFunctionArgs, redirect } from "@remix-run/cloudflare"
import authenticator from "~/libs/remix-auth/auth.server"

export const loader = () => redirect("/")

export const action = async ({ request, context }: ActionFunctionArgs) => {
  return authenticator.authenticate("google", request, { context })
}
