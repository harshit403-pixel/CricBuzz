import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSeries } from "../api/series.api";

export const useUpdateSeries = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) =>
      updateSeries(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["series"],
      });
    },
  });
};