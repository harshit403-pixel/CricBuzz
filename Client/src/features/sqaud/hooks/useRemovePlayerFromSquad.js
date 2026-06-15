import { useMutation, useQueryClient } from "@tanstack/react-query";

import { removePlayerFromSquad } from "../api/squad.api";

export const useRemovePlayerFromSquad = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ teamId, playerId }) =>
      removePlayerFromSquad(teamId, playerId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["squad", variables.teamId],
      });
    },
  });
};
