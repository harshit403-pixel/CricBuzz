import { useQuery } from "@tanstack/react-query";

import { getMatchCenter } from "../api/publicMatch.api.js";

export const useMatchCenter = (id) => {
  return useQuery({
    queryKey: ["match-center", id],
    queryFn: () => getMatchCenter(id),
    enabled: !!id,
  });
};
