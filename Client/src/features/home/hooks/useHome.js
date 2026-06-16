import { useQuery } from "@tanstack/react-query";
import { getHomeData } from "../api/home.api";

export const useHome = () => {
  return useQuery({
    queryKey: ["home"],
    queryFn: getHomeData,
  });
};
