import { useQuery } from "@tanstack/react-query";
import { getAllMatches } from "../api/match.api";

export const useMatches = () => {
  return useQuery({
    queryKey: ["matches"],
    queryFn: getAllMatches,
  });
};
