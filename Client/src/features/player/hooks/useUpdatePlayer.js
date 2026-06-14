import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePlayer } from "../api/player.api";

export const useUpdatePlayer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) =>
      updatePlayer(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["players"],
      });
    },
  });
};