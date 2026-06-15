import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateToss } from "../api/matchLifecycle.js";

export const useUpdateToss = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateToss(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["matches"],
      });

      queryClient.invalidateQueries({
        queryKey: ["match", variables.id],
      });
    },
  });
};
