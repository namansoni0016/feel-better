import { auth } from "@/app/utils/auth"
import HomePage from "@/components/HomePage";
import { Card, CardContent } from "@/components/ui/card";

export default async function Home() {
  const session = await auth();
  if(!session) {
    return (
      <HomePage />
    );
  }
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <Card className="mt-16 rounded-sm py-4">
          <CardContent>
            <span className="italic font-semibold text-xl">"Healing isn't about returning to who you were - it's about discovering who you are beneath the pain."</span>
          </CardContent>
        </Card>
        <p className="mt-6 font-bold text-blue-950">This is your safe space for mental wellness. Track your mood, journal your thoughts, and find peace.</p>
      </div>
    </>
  );
}
