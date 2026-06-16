import { useQuery } from "@tanstack/react-query";

import { getMatchScorecard } from "../api/publicMatch.api.js";

export const useMatchScorecard = (id) => {
  return useQuery({
    queryKey: ["match-scorecard", id],
    queryFn: () => getMatchScorecard(id),
    enabled: !!id,
  });
};
