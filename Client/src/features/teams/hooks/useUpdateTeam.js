import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTeam } from "../api/team.api";

export const useUpdateTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) =>
      updateTeam(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["teams"],
      });
    },
  });
};