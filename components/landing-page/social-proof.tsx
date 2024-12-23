import { GraduationCap, UserRound, Video } from "lucide-react";

const SocialProof = () => {
  return (
    <div className="w-full bg-transparent rounded-xl px-4 xl:px-10 py-3 xl:py-8 h-fit">
      <div className="w-full justify-between flex flex-col h-fit items-center gap-y-1">
        <p className="text-[24px] lg:text-[32px] font-bold text-white text-center xl:pr-12 pb-2">
          join our growing community
        </p>
        <div className="flex flex-row justify-between xl:pl-10 items-center text-[20px] lg:text-[24px] text-center xl:text-left gap-x-2 xl:gap-x-0">
          <span className="xl:pl-8 text-[#BFD8DB] font-outfit hidden xl:flex">
            with over
          </span>
          <span className="xl:pl-16 text-white font-outfit">
            200,000 students
          </span>
          <GraduationCap
            strokeWidth={2}
            size={40}
            color="white"
            className="ml-4"
          />
        </div>
        <div className="flex flex-row justify-between xl:pl-10 items-center text-[20px] lg:text-[24px] text-center xl:text-left gap-x-2 xl:gap-x-0">
          <span className="xl:pl-28 text-[#BFD8DB] font-outfit hidden xl:flex">
            over
          </span>
          <span className="xl:pl-[70px] text-white font-outfit">
            1,000 creators
          </span>
          <UserRound strokeWidth={2} size={40} color="white" className="ml-4" />
        </div>
        <div className="flex flex-row justify-between xl:pl-10 items-center text-center xl:text-left text-[20px] lg:text-[24px] gap-x-2 xl:gap-x-0">
          <span className="xl:pl-40 text-[#BFD8DB] font-outfit hidden xl:flex">
            and
          </span>
          <span className="xl:pl-12 text-white font-outfit">1,500+ videos</span>
          <Video strokeWidth={2} size={40} color="white" className="ml-4" />
        </div>
      </div>
    </div>
  );
};

export default SocialProof;
