import { signInAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { UserRound } from "lucide-react";
import Link from "next/link";

export default function SignIn() {
  return (
    <div className="flex flex-col items-start bg-white rounded-xl p-10 justify-between min-h-full gap-y-8 md:gap-y-20">
      <div className="flex flex-col">
        <span className="text-et-black text-[32px] font-bold pb-4">
          join today
        </span>
        <div className="flex flex-col sm:flex-row justify-between gap-x-8 gap-y-4">
          <Link href={"/sign-up"}>
            <Button variant={"default"} size={"edTech"}>
              as a school
            </Button>
          </Link>
          <Link href={"/sign-up"}>
            <Button variant={"default"} size={"edTech"}>
              as a student
            </Button>
          </Link>
        </div>
      </div>
      <div className="w-full mb-12">
        <form className="flex-1 flex flex-col min-w-64">
          <h1 className="text-xl font-light text-[#858585] font-outfit pb-2">
            already have an account?
          </h1>
          <div className="flex flex-row items-center gap-x-4">
            <UserRound strokeWidth={2} size={32} />
            <span className="text-et-black text-[32px] font-bold">sign in</span>
          </div>
          <div className="flex flex-col gap-2 [&>input]:mb-3 mt-2">
            <Label htmlFor="email" className="text-xl font-light font-outfit">
              email address
            </Label>
            <Input
              name="email"
              placeholder="email@example.com"
              required
              className="rounded-[0.3rem] border-gray-400 text-black font-medium placeholder:text-gray-400 py-5 text-[12px] md:text-[14px]"
            />
            <div className="flex justify-between items-center">
              <Label
                htmlFor="password"
                className="text-xl font-light font-outfit"
              >
                password
              </Label>
            </div>
            <Input
              type="password"
              name="password"
              placeholder="your password"
              required
              className="rounded-[0.3rem] border-gray-400 text-black font-medium placeholder:text-gray-400 py-5 text-[12px] md:text-[14px]"
            />
            <SubmitButton
              pendingText="going..."
              formAction={signInAction}
              variant={"default"}
              size={"edTech"}
              className="place-self-end"
            >
              let's go
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
}
