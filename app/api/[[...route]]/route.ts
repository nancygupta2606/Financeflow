import { Hono } from "hono";
import { handle } from "hono/vercel";
import accounts from "./accounts";
import { HTTPException } from "hono/http-exception";
import categories from "./categories";
import transactions from "./transactions";
import summary from "./summary";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.onError((err, c) => {
  console.log(err);
  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  return c.json({ error: "Internal Server Error" }, 500);
});

const routes = app
  .route("/accounts", accounts)
  .route("/categories", categories)
  .route("/transactions", transactions)
  .route("/summary", summary);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
