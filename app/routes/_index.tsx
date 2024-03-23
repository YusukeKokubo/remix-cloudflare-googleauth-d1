import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/cloudflare"
import { Form, useLoaderData } from "@remix-run/react"
import authenticator from "~/libs/remix-auth/auth.server"

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ]
}

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request)
  return json({ user })
}

export default function Index() {
  const { user } = useLoaderData<typeof loader>()
  if (user) {
    return (
      <>
        <div>
          hello
          {user.name}
          <img src={user.image} alt={user.name} />
        </div>

        <Form action="/api/auth/signout" method="post">
          <button type="submit">サインアウト</button>
        </Form>
      </>
    )
  } else {
    return (
      <>
        <Form action="/api/auth/signin" method="post">
          <button type="submit">サインイン</button>
        </Form>
      </>
    )
  }
}
