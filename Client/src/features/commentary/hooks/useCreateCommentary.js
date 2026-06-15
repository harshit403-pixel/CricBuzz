import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createCommentary } from "../api/commentary.api";

export const useCreateCommentary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCommentary,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["commentary"],
      });
    },
  });
};
