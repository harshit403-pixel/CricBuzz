import { useQuery } from "@tanstack/react-query";
import { getTeamSquad } from "../api/teamSquad.api";

export const useTeamSquad = (teamId) => {
  return useQuery({
    queryKey: ["team-squad", teamId],
    queryFn: () => getTeamSquad(teamId),
    enabled: !!teamId,
  });
};
