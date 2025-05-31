import { redirect } from "next/navigation";
import { auth } from "./utils/auth";

export default async function Home() {
  const session = await auth();
  if(!session) redirect("/login");
  return (
    <>
      <div className="flex h-screen w-full items-center justify-center">
        <h1>{session.user?.name}</h1>
      </div>
    </>
  );
}
