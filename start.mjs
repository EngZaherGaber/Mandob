// C:\apps\mandob-ssr\start.mjs
import { createServer } from "node:http";

const mod = await import("./dist/mandob/server/server.mjs");

// Angular v17–19 often exports a Node request handler (via createNodeRequestHandler)
// under `default` (sometimes also `reqHandler`).
const handler = mod.default ?? mod.reqHandler;

if (typeof handler !== "function") {
  console.error("Expected a Node request handler function. Exports:", Object.keys(mod));
  process.exit(1);
}

const port = process.env.PORT || 4000;
createServer(handler).listen(port, () => {
  console.log(`SSR listening on http://localhost:${port}`);
});
