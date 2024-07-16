import { withSession } from "./session";

export function withAuth(handler) {
  return withSession(async (req, res) => {
    if (!req.session.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }
    return handler(req, res);
  });
}
