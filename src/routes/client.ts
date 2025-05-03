import { Hono } from "hono";

const client = new Hono();

client.get('/', c => {
  return c.body('hello world');
})

export default client;
