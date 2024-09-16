import supabase from "./supabaseClient";

export const getAvatarUrl = (userId: string) => {
  const { data, error } = supabase.storage
    .from("user_avatar")
    .getPublicUrl(`${userId}`);

  if (error) {
    console.error("Ошибка при получении URL аватара:", error);
    return null;
  }

  return `${data?.publicUrl}?t=${Date.now()}`;
};
