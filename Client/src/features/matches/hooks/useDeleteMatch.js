import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMatch } from "../api/match.api";

export const useDeleteMatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMatch,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["matches"],
      });
    },
  });
};
