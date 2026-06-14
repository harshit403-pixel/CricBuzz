import { useQuery } from "@tanstack/react-query";
import { getAllPlayers } from "../api/player.api";

export const usePlayers = () => {
  return useQuery({
    queryKey: ["players"],
    queryFn: getAllPlayers,
  });
};