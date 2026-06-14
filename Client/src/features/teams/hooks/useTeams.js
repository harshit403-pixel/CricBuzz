import { useQuery } from "@tanstack/react-query";
import { getAllTeams } from "../api/team.api";

export const useTeams = () => {
  return useQuery({
    queryKey: ["teams"],
    queryFn: getAllTeams,
  });
};