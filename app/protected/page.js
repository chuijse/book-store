import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

export default async function Page(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  console.log(session);
  return <pre>{JSON.stringify(session, null, 2)}</pre>;
}
