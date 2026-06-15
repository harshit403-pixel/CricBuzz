import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createScore } from "../api/score.api";

export const useCreateScore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createScore,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["scores"],
      });
    },
  });
};
