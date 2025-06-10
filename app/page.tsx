import { redirect } from "next/navigation";
import { auth } from "@/app/utils/auth"
import { SignOut } from "@/components/SignOut";

export default async function Home() {
  const session = await auth();
  if(!session) {
    redirect("/login");
  }
  return (
    <>
      <div className="flex flex-col h-screen w-full items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">{session.user?.name}</h1>
        <h1 className="text-2xl font-bold">{session.user?.email}</h1>
        <SignOut />
      </div>
    </>
  );
}
