import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Test from "@/components/test";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div>
      <Test userId={user.id} />
    </div>
  );
}
