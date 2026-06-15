import { useQuery } from "@tanstack/react-query";
import { getPlayerById } from "../api/player.api";

export const usePlayer = (id) => {
  return useQuery({
    queryKey: ["player", id],
    queryFn: () => getPlayerById(id),
    enabled: !!id,
  });
};
