import { Hono } from "hono";
import { serveStatic } from 'hono/cloudflare-workers';
import app from "./routes/server";
import gate from "./routes/gate";
import client from "./routes/client";

const main = new Hono();

main.use('/public/*', serveStatic({ root: './', manifest: {} }));

main.get('/', (c) => c.html("Hello World"));
main.route('/', gate)
main.route('/', app)
main.route('/', client)
// every route started with /auth are working in admin panel

export default main
