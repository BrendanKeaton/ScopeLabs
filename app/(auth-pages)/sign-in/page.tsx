import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserRound } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Login({ searchParams }: { searchParams: Message }) {
  return (
    <div className="">
      <form className="flex flex-col min-w-72 max-w-72 lg:min-w-96 lg:max-w-96 mx-auto bg-white rounded-3xl p-10 border border-et-teal shadow-custom-black">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-x-4">
            <UserRound strokeWidth={2} size={32} />
            <span className="text-et-black text-[32px] font-bold">sign in</span>
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
          need an account?
          <Link
            className="pl-1 font-medium underline text-et-teal"
            href="/sign-up"
          >
            sign up
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">email</Label>
          <Input
            name="email"
            placeholder="email@example.com"
            required
            className="rounded-[0.3rem] border-gray-400 text-black font-light placeholder:text-gray-400 py-5 text-[12px] md:text-[14px] font-outfit"
          />
          <div className="flex justify-between items-center">
            <Label htmlFor="password">password</Label>
          </div>
          <Input
            type="password"
            name="password"
            placeholder="your password"
            required
            className="rounded-[0.3rem] border-gray-400 text-black font-light font-outfit placeholder:text-gray-400 py-5 text-[12px] md:text-[14px]"
          />
          <SubmitButton
            pendingText="going..."
            formAction={signInAction}
            className="place-self-end"
            size={"edTech"}
          >
            let's go
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </div>
  );
}
