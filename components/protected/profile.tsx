"use client";
import { createClient } from "@/utils/supabase/client";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";

interface SurveyProps {
  userId: string;
}

const Profile: React.FC<SurveyProps> = () => {
  const supabase = createClient();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      console.log("Successfully signed out");
      window.location.href = "/";
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="flex flex-col gap-2 items-start w-full">
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between w-full items-center">
            <h2 className="font-bold text-[32px] mb-2">Profile</h2>
            <div>
              <Button
                onClick={handleSignOut}
                variant={"default"}
                className="min-w-36 bg-red-600 text-white"
              >
                <LogOut strokeWidth={1.5} size={24} className="mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
