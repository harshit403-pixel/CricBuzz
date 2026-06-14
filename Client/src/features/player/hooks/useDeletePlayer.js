import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePlayer } from "../api/player.api";

export const useDeletePlayer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePlayer,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["players"],
      });
    },
  });
};