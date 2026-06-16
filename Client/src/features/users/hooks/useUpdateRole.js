import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../lib/axiosInstance";

export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, role }) =>
      axiosInstance.patch(`/users/${id}/role`, {
        role,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};
