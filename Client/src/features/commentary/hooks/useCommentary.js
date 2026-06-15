import { useQuery } from "@tanstack/react-query";

import { getMatchCommentary } from "../api/commentary.api";

export const useCommentary = (matchId) => {
  return useQuery({
    queryKey: ["commentary", matchId],

    queryFn: () => getMatchCommentary(matchId),

    enabled: !!matchId,
  });
};
