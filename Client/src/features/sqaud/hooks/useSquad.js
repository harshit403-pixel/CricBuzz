import { useQuery } from "@tanstack/react-query";
import { getSquad } from "../api/squad.api";

export const useSquad = (teamId) => {
  return useQuery({
    queryKey: ["squad", teamId],
    queryFn: () => getSquad(teamId),
    enabled: !!teamId,
  });
};
