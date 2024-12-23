import SignIn from "@/components/landing-page/sign-in";
import Hero from "@/components/landing-page/hero";
import Navbar from "@/components/landing-page/navbar";
import SocialProof from "@/components/landing-page/social-proof";

export default async function Home() {
  return (
    <>
      <main className="min-h-screen bg-et-teal">
        <div className="flex-1 flex flex-col container mx-auto px-4 gap-y-8 h-full">
          <Navbar />
          <div className="flex flex-col md:flex-row gap-x-8 gap-y-4 h-full mb-16 min-h-full">
            <div className="flex flex-col gap-y-8 w-full">
              <Hero />
              <SocialProof />
            </div>
            <SignIn />
          </div>
        </div>
      </main>
    </>
  );
}
