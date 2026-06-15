import { useMutation, useQueryClient } from "@tanstack/react-query";
import { selectPlayingXi } from "../api/matchLifecycle.js";

export const useSelectPlayingXi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => selectPlayingXi(id, data),

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
