import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCommentary } from "../api/commentary.api";

export const useDeleteCommentary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCommentary,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["commentary"],
      });
    },
  });
};
