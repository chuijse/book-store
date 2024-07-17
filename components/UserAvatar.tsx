import { auth } from "../auth";

export default async function UserAvatar() {
  const session = await auth();

  if (!session?.user) return null;

  //console.log(session);

  return (
    <div>
      <img width={50} height={50} src={session.user.image} alt="User Avatar" />
    </div>
  );
}
