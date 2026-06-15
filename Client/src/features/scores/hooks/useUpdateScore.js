import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateScore } from "../api/score.api";

export const useUpdateScore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateScore(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["scores"],
      });
    },
  });
};
