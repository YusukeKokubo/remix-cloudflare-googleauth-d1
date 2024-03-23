import { ActionFunctionArgs } from "@remix-run/cloudflare"
import authenticator from "~/libs/remix-auth/auth.server"

export const action = async ({ request }: ActionFunctionArgs) => {
  return authenticator.logout(request, { redirectTo: "/" })
}
