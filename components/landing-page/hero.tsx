import Image from "next/image";

const Hero = () => {
  return (
    <div className="w-full bg-white rounded-xl px-10 py-8 md:py-16 shadow-large-component h-fit">
      <div className="w-full justify-between flex flex-row h-fit items-center">
        <div className="text-[48px] xl:text-[72px] font-bold text-et-black text-center w-full md:text-left leading-none items-center">
          <p>knowledge</p>
          <p>
            made{" "}
            <span className="bg-gradient-to-br from-et-teal to-teal-400 bg-clip-text text-transparent">
              simple.
            </span>
          </p>
        </div>

        <Image
          src="/branding/ed_tech_logo.png"
          width={200}
          height={200}
          alt="EdTech Logo"
          className="hidden lg:flex"
        />
      </div>
    </div>
  );
};

export default Hero;
