import type { Config } from "drizzle-kit"

export default {
  out: "./migrations",
  schema: "./app/db",
  driver: "d1",
  dbCredentials: {
    wranglerConfigPath: "./wrangler.toml",
    dbName: "remix-cloudflare-example",
  },
  breakpoints: false,
} satisfies Config
