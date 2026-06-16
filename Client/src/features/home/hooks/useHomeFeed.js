import { useQueries } from "@tanstack/react-query";

import { getMatchCommentary } from "../../commentary/api/commentary.api";
import { getMatchScorecard } from "../../matches/api/publicMatch.api";
import { useHome } from "./useHome";

const toMap = (matches, queryResults, selector) => {
  return Object.fromEntries(
    matches.map((match, index) => [match._id, selector(queryResults[index])]),
  );
};

export const useHomeFeed = () => {
  const homeQuery = useHome();

  const homeData = homeQuery.data?.data?.data || {};
  const liveMatches = homeData.liveMatches || [];
  const upcomingMatches = homeData.upcomingMatches || [];
  const recentMatches = homeData.recentMatches || [];

  const liveScoreQueries = useQueries({
    queries: liveMatches.map((match) => ({
      queryKey: ["home-live-scorecard", match._id],
      queryFn: () => getMatchScorecard(match._id),
      enabled: !!match._id,
      staleTime: 30_000,
    })),
  });

  const recentScoreQueries = useQueries({
    queries: recentMatches.map((match) => ({
      queryKey: ["home-recent-scorecard", match._id],
      queryFn: () => getMatchScorecard(match._id),
      enabled: !!match._id,
      staleTime: 30_000,
    })),
  });

  const liveCommentaryQueries = useQueries({
    queries: liveMatches.map((match) => ({
      queryKey: ["home-live-commentary", match._id],
      queryFn: () =>
        getMatchCommentary(match._id, {
          page: 1,
          limit: 1,
        }),
      enabled: !!match._id,
      staleTime: 30_000,
    })),
  });

  return {
    ...homeQuery,
    homeData,
    liveMatches,
    upcomingMatches,
    recentMatches,
    liveScorecardsByMatchId: toMap(
      liveMatches,
      liveScoreQueries,
      (queryResult) => queryResult?.data?.data?.data || null,
    ),
    recentScorecardsByMatchId: toMap(
      recentMatches,
      recentScoreQueries,
      (queryResult) => queryResult?.data?.data?.data || null,
    ),
    liveCommentaryByMatchId: toMap(
      liveMatches,
      liveCommentaryQueries,
      (queryResult) => queryResult?.data?.data?.data?.commentary?.[0] || null,
    ),
  };
};
