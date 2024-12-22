"use client";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { fetchUser } from "@/api/supabase_api";

interface SurveyProps {
  userId: string;
}

const Profile: React.FC<SurveyProps> = ({ userId }) => {
  const [userName, setUserName] = useState<string>("User");
  const supabase = createClient();

  const getUser = async () => {
    let userName = await fetchUser(userId);
    setUserName(userName);
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      console.log("Successfully signed out");
      window.location.href = "/";
    }
  };

  useEffect(() => {
    getUser();
  }, [userId]);

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="flex flex-col gap-2 items-start w-full">
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between w-full items-center">
            <h2 className="font-bold text-[64px] mb-2">Profile</h2>
            <div>
              <button
                onClick={handleSignOut}
                className="font-medium text-[14px] md:text-[16px] text-red-500 border hover:bg-red-400 hover:text-white transition duration-200 border-red-500 px-5 py-2 rounded-md flex flex-row gap-x-2"
              >
                <LogOut strokeWidth={1.5} size={24} />
                Sign Out
              </button>
            </div>
          </div>
          <div className="w-full h-[1px] bg-gray-300"></div>
        </div>

        <p className="pb-2 text-[32px] text-[#273B59] font-bold">
          Hello, {userName}
        </p>
      </div>
    </div>
  );
};

export default Profile;
