import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addPlayerToSquad } from "../api/squad.api";

export const useAddPlayerToSquad = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ teamId, playerId }) => addPlayerToSquad(teamId, playerId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["squad", variables.teamId],
      });
    },
  });
};
