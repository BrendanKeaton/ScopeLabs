import { createClient } from "@/utils/supabase/client";

export const fetchUser = async (userId: string): Promise<string> => {
  const supabase = createClient();

  let query = supabase.from("User_Info").select("Name").eq("user_uuid", userId);
  let { data: user } = await query;
  const userName = user && user.length > 0 ? user[0].Name : "Test";

  return userName;
};
