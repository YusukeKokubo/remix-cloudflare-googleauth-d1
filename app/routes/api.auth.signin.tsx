import { ActionFunctionArgs, redirect } from "@remix-run/cloudflare"
import authenticator from "~/libs/remix-auth/auth.server"

export const loader = () => redirect("/")

export const action = async ({ request }: ActionFunctionArgs) => {
  return authenticator.authenticate("google", request)
}
