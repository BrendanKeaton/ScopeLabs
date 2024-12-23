import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { UserRoundPlus } from "lucide-react";
import Image from "next/image";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 px-4 pt-8 ">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <div className="">
      <form className="flex flex-col min-w-72 max-w-72 lg:min-w-96 lg:max-w-96 mx-auto bg-white rounded-3xl p-10 border border-et-teal shadow-custom-black">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-x-4">
            <UserRoundPlus strokeWidth={2} size={32} />
            <span className="text-et-black text-[32px] font-bold">sign up</span>
          </div>
          <Image
            src="/branding/ed_tech_logo.png"
            width={40}
            height={40}
            alt="EdTech Logo"
            className="min-w-[40px] h-[40px]"
          />
        </div>
        <p className="text-sm font-light text-[#858585] font-outfit pb-2">
          already have an account?
          <Link
            className="pl-1 font-medium underline text-et-teal"
            href="/sign-in"
          >
            sign in
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">email</Label>
          <Input
            name="email"
            placeholder="you@example.com"
            required
            className="rounded-[0.3rem] border-gray-400 text-black font-light font-outfit placeholder:text-gray-400 py-5 text-[12px] md:text-[14px]"
          />
          <Label htmlFor="password">password</Label>
          <Input
            type="password"
            name="password"
            placeholder="your password"
            minLength={8}
            required
            className="rounded-[0.3rem] border-gray-400 text-black font-light font-outfit placeholder:text-gray-400 py-5 text-[12px] md:text-[14px]"
          />
          <SubmitButton
            formAction={signUpAction}
            pendingText="signing up..."
            size={"edTech"}
            className="place-self-end"
          >
            sign up
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </div>
  );
}
