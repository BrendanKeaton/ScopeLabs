import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { UserRound } from "lucide-react";

const NavbarProtected = () => {
  return (
    <div className="w-full flex flex-row justify-between bg-et-teal mt-5 rounded-xl px-4 md:px-8 py-3 items-center">
      <div className="flex flex-row gap-x-2 items-center">
        <Link href={"/protected"}>
          <Image
            src="/branding/ed_tech_logo_text_white.png"
            width={151}
            height={46}
            alt="EdTech Logo"
          />
        </Link>
        <Link
          href={"/protected"}
          className="text-[14px] md:text-[18px] px-6 md:px-9 text-white hover:underline-offset-4 hover:underline duration-200 transition font-medium"
        >
          <p className="">home</p>
        </Link>
      </div>
      <Link href={"/protected/profile"}>
        <Button
          variant={"outline"}
          size={"edTechOutline"}
          className="text-[14px] md:text-[18px] px-6 md:px-9 flex flex-row gap-x-3"
        >
          <UserRound size={24} strokeWidth={2} />
          <p>profile</p>
        </Button>
      </Link>
    </div>
  );
};

export default NavbarProtected;
