import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

// This page routes the user to respective wallet pages.
export default async function WalletRoute() {
  const supabase = createClient();
  const user = supabase.auth.getUser();
  if (!user) {
    return redirect("/wallet/login");
  }

  redirect("/wallet/home");
}

// export async function getServersideProps() {
//   const supabase = createClient();
//   const user = supabase.auth.getUser();
//   if (!user) {
//     return redirect("/wallet/login");
//   }

//   redirect("/wallet/home");
// }
