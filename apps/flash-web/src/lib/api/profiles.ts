import { client } from "@/lib/api/client";
import { useQuery } from "@tanstack/react-query";

async function getProfile() {
  const res = await client.api.profiles.foruser.$get();

  if (!res.ok) return null;

  return await res.json();
}

export const useProfile = () =>
  useQuery({
    queryKey: ["get-profile"],
    queryFn: getProfile,
  });
