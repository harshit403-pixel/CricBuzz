import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../lib/axiosInstance";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users");
      return res.data;
    },
  });
};
