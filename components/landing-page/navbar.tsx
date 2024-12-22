import Image from "next/image";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <div className="w-full flex flex-row justify-between bg-white mt-5 rounded-xl px-4 md:px-8 py-3 items-center">
      <Image
        src="/branding/ed_tech_logo_text.png"
        width={151}
        height={46}
        alt="EdTech Logo"
      />
      <Button
        variant={"outline"}
        size={"edTechOutline"}
        className="text-[14px] md:text-[18px] px-6 md:px-9"
      >
        <p>contact us</p>
      </Button>
    </div>
  );
};

export default Navbar;
