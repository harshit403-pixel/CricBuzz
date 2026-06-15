import { useMutation, useQueryClient } from "@tanstack/react-query";
import { startMatch } from "../api/matchLifecycle.js";

export const useStartMatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => startMatch(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["matches"],
      });
    },
  });
};
