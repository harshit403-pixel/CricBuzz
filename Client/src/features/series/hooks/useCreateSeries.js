import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSeries } from "../api/series.api";

export const useCreateSeries = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSeries,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["series"],
      });
    },
  });
};