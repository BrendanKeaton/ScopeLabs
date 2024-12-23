import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Dashboard from "@/components/protected/dashboard";
import NavbarProtected from "@/components/protected/navbar-protected";

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
      <Dashboard />
    </div>
  );
}
