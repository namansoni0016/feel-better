import { redirect } from "next/navigation";
import { auth } from "@/app/utils/auth"

export default async function Home() {
  const session = await auth();
  if(!session) {
    redirect("/login");
  }
  return (
    <div className="flex flex-col w-full items-center justify-center h-[calc(100vh-64px)] gap-4">
      <h1 className="text-2xl font-bold">Hi, <span>{session.user?.name}</span>!</h1>
    </div>
  );
}
