import { useQuery } from "@tanstack/react-query";

import { getTeamById } from "../api/team.api";

export const useTeam = (id) => {
  return useQuery({
    queryKey: ["team", id],
    queryFn: () => getTeamById(id),
    enabled: !!id,
  });
};
