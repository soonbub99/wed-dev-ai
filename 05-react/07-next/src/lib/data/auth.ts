import "server-only";
import { createClient } from "@/lib/supabase";
import type { User } from "@/types";

export const getCurrentUser = async (): Promise<User | null> => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return null;

  const { data: profile } = await supabase
    .from("users")
    .select("name, profile_image")
    .eq("id", data.user.id)
    .single();

  return {
    id: data.user.id,
    email: data.user.email ?? "",
    name: profile?.name ?? "",
    profile_image: profile?.profile_image,
  };
};
