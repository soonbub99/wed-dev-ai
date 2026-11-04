"use server";

import { redirect } from "next/navigation"; // redirect -> 다른 화면으로 보내기
import { createClient } from "@/lib/supabase";
import type { ActionResult } from "@/types";

export const login = async (
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: String(formData.get("email")),
    password: String(formData.get("password")),
  });
  if (error) return { error: "이메일이나 비밀번호가 틀렸습니다" };
  redirect("/");
};

export const signup = async (
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: String(formData.get("email")),
    password: String(formData.get("password")),
  });
  if (error || !data.user) return { error: error?.message ?? "가입 실패" };

  let profileImage: string | null = null;
  const file = formData.get("profileImage");
  if (file instanceof File && file.size > 0) {
    const ext = file.name.split(".").pop();
    const path = `${data.user.id}/${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("profiles")
      .upload(path, file);
    if (!uploadError) {
      profileImage = supabase.storage.from("profiles").getPublicUrl(path)
        .data.publicUrl;
    }
  }

  const { error: insertError } = await supabase.from("users").insert({
    id: data.user.id,
    name: String(formData.get("userName")),
    phone: String(formData.get("phone")),
    profile_image: profileImage,
  });
  if (insertError) return { error: insertError.message };

  redirect("/");
};

export const logout = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
};
