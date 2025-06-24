import { auth } from "@/app/utils/auth"
import HomePage from "@/components/HomePage";

export default async function Home() {
  const session = await auth();
  if(!session) {
    return (
      <HomePage />
    );
  }
  return (
    <h1 className="text-5xl font-bold">Authenticated HomePage</h1>
  );
}
