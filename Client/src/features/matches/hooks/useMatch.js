import { useQuery } from "@tanstack/react-query";
import { getMatchById } from "../api/match.api";

export const useMatch = (id) => {
  return useQuery({
    queryKey: ["match", id],
    queryFn: () => getMatchById(id),
    enabled: !!id,
  });
};
