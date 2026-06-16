import { useQuery } from "@tanstack/react-query";

import { searchPublicContent } from "../api/search.api.js";

export const useSearch = (query) => {
  const normalizedQuery = query.trim();

  return useQuery({
    queryKey: ["public-search", normalizedQuery],
    queryFn: () => searchPublicContent(normalizedQuery),
    enabled: normalizedQuery.length > 1,
    staleTime: 30000,
  });
};
