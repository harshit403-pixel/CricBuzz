import { useQuery } from "@tanstack/react-query";
import { getAllSeries } from "../api/series.api";

export const useSeries = () => {
  return useQuery({
    queryKey: ["series"],
    queryFn: getAllSeries,
  });
};