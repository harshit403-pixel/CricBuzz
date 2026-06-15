import { useQuery } from "@tanstack/react-query";
import { getMatchScores } from "../api/score.api";

export const useMatchScores = (matchId) => {
  return useQuery({
    queryKey: ["scores", matchId],
    queryFn: () => getMatchScores(matchId),
    enabled: !!matchId,
  });
};
