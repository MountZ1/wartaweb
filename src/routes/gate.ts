import { Hono } from "hono";
import { Login } from "../views/appviews/login";


const gate = new Hono();

gate.get('/login', c => {
  return c.html(Login)
});


export default gate;
