import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function Login({ searchParams }: { searchParams: Message }) {
  return (
    <div className="flex flex-col min-w-screen items-start">
      <div className="flex justify-center rounded-md mb-16">
        <Image
          src="/branding/ed_tech_logo_text.png"
          width={423}
          height={128}
          alt="EdTech Logo"
        />
      </div>
      <div>
        <form className="flex-1 flex flex-col min-w-72">
          <h1 className="text-xl font-medium text-[#273B59]">Sign in</h1>
          <div className="flex flex-col gap-2 [&>input]:mb-3 mt-3">
            <Label htmlFor="email">Email</Label>
            <Input name="email" placeholder="email@example.com" required />
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              type="password"
              name="password"
              placeholder="Your password"
              required
            />
            <SubmitButton
              pendingText="Signing In..."
              formAction={signInAction}
              className="bg-[#273B59] hover:bg-[#496897] transition duration-200"
            >
              Sign in
            </SubmitButton>
            <FormMessage message={searchParams} />
          </div>
        </form>
      </div>
    </div>
  );
}
