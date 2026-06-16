import { useInfiniteQuery } from "@tanstack/react-query";

import { getMatchCommentary } from "../api/commentary.api";

export const useMatchCommentaryFeed = (matchId, limit = 5) => {
  return useInfiniteQuery({
    queryKey: ["public-commentary-feed", matchId, limit],
    queryFn: ({ pageParam = 1 }) =>
      getMatchCommentary(matchId, {
        page: pageParam,
        limit,
      }),
    enabled: !!matchId,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const pagination = lastPage?.data?.data?.pagination;

      if (!pagination) {
        return undefined;
      }

      const hasMore = pagination.page * pagination.limit < pagination.total;

      return hasMore ? pagination.page + 1 : undefined;
    },
  });
};
