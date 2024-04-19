import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from "@remix-run/dev"
import { defineConfig, loadEnv } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import { getLoadContext } from "./load-context";

// export default defineConfig(({mode} =>{
//   return {
//   plugins: [remixCloudflareDevProxy(), remix(), tsconfigPaths()],
//   }
// }));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  return {
    define: {
      "process.env": env,
    },
    plugins: [remixCloudflareDevProxy(getLoadContext), remix(), tsconfigPaths()],
  }
})
