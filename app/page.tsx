import { auth } from "@/app/utils/auth"
import HomePage from "@/components/HomePage";

export default async function Home() {
  const session = await auth();
  if(!session) {
    return (
      // <div className="flex flex-col w-full items-center justify-center h-[calc(100vh-64px)] gap-4">
      //   <h1 className="text-5xl font-bold">HomePage</h1>
      // </div>
      <HomePage />
    );
  }
  return (
    <h1 className="text-5xl font-bold">Authenticated HomePage</h1>
  );
}
