import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeMatch } from "../api/matchLifecycle.js";

export const useCompleteMatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => completeMatch(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["matches"],
      });
    },
  });
};
