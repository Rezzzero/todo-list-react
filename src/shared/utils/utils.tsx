import supabase from "../api/supabaseClient";

export const getAvatarUrl = (userId: string) => {
  const { data } = supabase.storage
    .from("user_avatar")
    .getPublicUrl(`${userId}`);

  return `${data?.publicUrl}?t=${Date.now()}`;
};
