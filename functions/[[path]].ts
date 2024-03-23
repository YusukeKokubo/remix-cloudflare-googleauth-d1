import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages"

// the server build file is generated by `remix vite:build`
import * as build from "@remix-run/dev/server-build"

export const onRequest = createPagesFunctionHandler({
  build,
  getLoadContext: (context) => context,
})
