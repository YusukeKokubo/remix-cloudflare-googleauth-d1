import {
  type LoaderFunctionArgs,
  type MetaFunction,
  json,
} from "@remix-run/cloudflare"
import { Form, useLoaderData } from "@remix-run/react"
import { drizzle } from "drizzle-orm/d1"
import { users } from "~/db/schema"
import authenticator from "~/libs/remix-auth/auth.server"

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ]
}

export async function loader({ request, context }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request)

  const db = drizzle(context.cloudflare.env.DB, { schema: { users } })
  const usersData = await db.query.users.findMany()
  return json({ user, usersData })
}

export default function Index() {
  const { user, usersData } = useLoaderData<typeof loader>()
  if (!user) {
    return (
      <>
        <Form action="/api/auth/signin" method="post">
          <button type="submit">サインイン</button>
        </Form>
      </>
    )
  }
  return (
    <>
      <div>
        hello
        {user.name}
        <img src={user.image} alt={user.name} />
      </div>

      <div>
        <h2>Users</h2>
        <ul>
          {usersData.map((u) => (
            <li key={u.id}>
              {/* biome-ignore lint/style/noNonNullAssertion: <explanation> */}
              <img src={u.image!} alt={u.name!} />
              {u.name}
            </li>
          ))}
        </ul>
      </div>

      <Form action="/api/auth/signout" method="post">
        <button type="submit">サインアウト</button>
      </Form>
    </>
  )
}
