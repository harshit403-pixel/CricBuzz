import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSeries } from "../api/series.api";

export const useDeleteSeries = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSeries,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["series"],
      });
    },
  });
};