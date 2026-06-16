import { useQuery } from "@tanstack/react-query";

import { getSeriesById } from "../api/series.api";

export const useSeriesDetails = (id) => {
  return useQuery({
    queryKey: ["public-series-details", id],
    queryFn: () => getSeriesById(id),
    enabled: !!id,
  });
};
