import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Activity, Clock3, MapPin, Trophy, Users, Waves } from "lucide-react";

import PublicCommentaryTimeline from "../../features/commentary/components/PublicCommentaryTimeline";
import { useMatchCommentaryFeed } from "../../features/commentary/hooks/useMatchCommentaryFeed";
import { useMatchCenter } from "../../features/matches/hooks/useMatchCenter";
import { useMatchScorecard } from "../../features/matches/hooks/useMatchScorecard";
import { useTeam } from "../../features/teams/hooks/useTeam";
import {
  formatLongDateLabel,
  getCurrentInnings,
  getPlayingXiList,
  getPreviousInnings,
  getRequiredRunRate,
  getScoreLine,
  getScoreboardTitle,
  getTeamInitials,
  parseOversToBalls,
} from "../../features/matches/utils/matchPresentation";

const tabs = [
  { id: "scorecard", label: "Scorecard", icon: Activity },
  { id: "commentary", label: "Commentary", icon: Waves },
  { id: "playing-xi", label: "Playing XI", icon: Users },
  { id: "match-info", label: "Match Info", icon: Trophy },
];

function TeamBadge({ team }) {
  if (team?.logo) {
    return (
      <img
        src={team.logo}
        alt={team.name}
        className="h-20 w-20 rounded-full border border-slate-200 object-cover shadow-sm"
      />
    );
  }

  return (
    <div className="flex h-20 w-20 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-lg font-semibold text-slate-700">
      {getTeamInitials(team?.shortName || team?.name)}
    </div>
  );
}

function MatchCenter() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("commentary");

  const { data, isLoading } = useMatchCenter(id);
  const { data: scorecardResponse } = useMatchScorecard(id);
  const commentaryQuery = useMatchCommentaryFeed(id, 5);

  const matchCenter = data?.data?.data || {};
  const matchInfo = matchCenter.matchInfo || null;
  const playingXI = matchCenter.playingXI || {};
  const scorecard = scorecardResponse?.data?.data || null;

  const commentary = (commentaryQuery.data?.pages || []).flatMap(
    (page) => page?.data?.data?.commentary || [],
  );

  const currentInnings = getCurrentInnings(scorecard);
  const previousInnings = getPreviousInnings(scorecard);
  const requiredRate = getRequiredRunRate(scorecard);
  const latestCommentary = commentary[0] || null;

  const teamOneQuery = useTeam(matchInfo?.team1?._id);
  const teamTwoQuery = useTeam(matchInfo?.team2?._id);

  const teamOne = teamOneQuery.data?.data?.data || null;
  const teamTwo = teamTwoQuery.data?.data?.data || null;

  const teamOneXi = getPlayingXiList(
    playingXI.team1 || [],
    teamOne?.squadPlayers || [],
  );
  const teamTwoXi = getPlayingXiList(
    playingXI.team2 || [],
    teamTwo?.squadPlayers || [],
  );

  const runRate =
    currentInnings?.runRate?.toFixed?.(2) || currentInnings?.runRate;
  const target = currentInnings?.target || previousInnings?.score + 1 || null;
  const ballsConsumed = currentInnings
    ? parseOversToBalls(currentInnings.overs)
    : 0;

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-slate-500">
        Loading match center...
      </div>
    );
  }

  if (!matchInfo) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <p className="text-lg text-slate-500">Match details are unavailable.</p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white"
        >
          Back to live scores
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[28px] border border-slate-200 bg-white px-8 py-10 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <span className="inline-flex rounded-full bg-rose-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-rose-600">
              {matchInfo.status === "LIVE" ? "Live Match" : matchInfo.status}
            </span>

            <p className="mt-5 text-sm uppercase tracking-[0.16em] text-slate-500">
              {matchInfo.seriesId?.name} - {matchInfo.matchNumber}
            </p>

            <h1 className="mt-2 text-5xl font-semibold tracking-tight text-slate-950">
              {matchInfo.team1?.shortName} vs {matchInfo.team2?.shortName}
            </h1>

            <div className="mt-5 space-y-2 text-sm text-slate-500">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-500" />
                {matchInfo.venue}
              </p>
              <p className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-blue-500" />
                {formatLongDateLabel(matchInfo.startTime)}
              </p>
            </div>
          </div>

          <div className="grid min-w-[22rem] grid-cols-[auto_1fr_auto] items-center gap-6">
            <div className="text-center">
              <TeamBadge team={matchInfo.team1} />
              <p className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
                {matchInfo.team1?.shortName}
              </p>
            </div>

            <div className="text-center">
              <p className="text-7xl font-semibold tracking-tight text-blue-600">
                VS
              </p>
              <p className="mt-3 text-sm font-medium text-slate-500">
                {formatLongDateLabel(matchInfo.startTime)}
              </p>
            </div>

            <div className="text-center">
              <TeamBadge team={matchInfo.team2} />
              <p className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
                {matchInfo.team2?.shortName}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_0.72fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white px-8 py-8 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
                {getScoreboardTitle(matchInfo, currentInnings)}
              </p>

              <p className="mt-3 text-6xl font-semibold tracking-tight text-slate-950">
                {getScoreLine(currentInnings)}
                <span className="ml-3 text-3xl text-slate-500">
                  ({currentInnings?.overs || "0.0"} Overs)
                </span>
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm uppercase tracking-[0.16em] text-slate-500">
                {requiredRate ? "Required Rate" : "Current Rate"}
              </p>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-slate-950">
                {requiredRate || runRate || "--"} RPO
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            <div>
              <p className="text-sm text-slate-500">Target</p>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-blue-600">
                {target || "--"}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">CRR</p>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-slate-950">
                {runRate || "--"}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Latest Over</p>
              <p className="mt-2 text-xl font-semibold text-slate-950">
                {latestCommentary
                  ? `${latestCommentary.over}.${latestCommentary.ball}`
                  : "--"}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {latestCommentary?.player?.name ||
                  currentInnings?.battingTeam?.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Balls Faced</p>
              <p className="mt-2 text-xl font-semibold text-slate-950">
                {ballsConsumed}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {currentInnings?.innings
                  ? `Innings ${currentInnings.innings}`
                  : "Live"}
              </p>
            </div>
          </div>
        </div>

        <aside className="rounded-[28px] border border-slate-200 bg-white px-6 py-6 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
            Latest Update
          </h2>

          <div className="mt-8 space-y-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                Highlight
              </p>
              <p className="mt-3 text-lg leading-8 text-slate-700">
                {latestCommentary?.message ||
                  matchCenter.result ||
                  "Live insights will appear here as commentary flows in."}
              </p>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-2/3 rounded-full bg-blue-600" />
            </div>

            <div className="grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
              <div>
                <p className="text-slate-500">Series</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {matchInfo.seriesId?.shortName || matchInfo.seriesId?.name}
                </p>
              </div>
              <div>
                <p className="text-slate-500">Status</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {matchInfo.status}
                </p>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <section className="mt-10">
        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex min-w-[9rem] items-center justify-center gap-2 rounded-3xl border px-5 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "border-blue-600 bg-blue-600 text-white shadow-[0_12px_28px_rgba(37,99,235,0.25)]"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="mt-8">
          {activeTab === "commentary" && (
            <div>
              <PublicCommentaryTimeline commentary={commentary} />

              {commentaryQuery.hasNextPage && (
                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    onClick={() => commentaryQuery.fetchNextPage()}
                    disabled={commentaryQuery.isFetchingNextPage}
                    className="rounded-full border border-slate-200 bg-white px-10 py-4 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 disabled:opacity-60"
                  >
                    {commentaryQuery.isFetchingNextPage
                      ? "Loading commentary..."
                      : "Load Older Commentary"}
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "scorecard" && (
            <div className="grid gap-5 lg:grid-cols-2">
              {[scorecard?.innings1, scorecard?.innings2]
                .filter(Boolean)
                .map((innings) => (
                  <div
                    key={innings._id || innings.innings}
                    className="rounded-[28px] border border-slate-200 bg-white px-6 py-6 shadow-[0_10px_24px_rgba(15,23,42,0.05)]"
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
                      {innings.battingTeam?.name} - Innings {innings.innings}
                    </p>
                    <p className="mt-4 text-5xl font-semibold tracking-tight text-slate-950">
                      {innings.score}/{innings.wickets}
                    </p>
                    <div className="mt-5 grid gap-4 text-sm text-slate-600 sm:grid-cols-3">
                      <div>
                        <p className="text-slate-500">Overs</p>
                        <p className="mt-1 font-semibold text-slate-900">
                          {innings.overs}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-500">Run Rate</p>
                        <p className="mt-1 font-semibold text-slate-900">
                          {innings.runRate}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-500">Target</p>
                        <p className="mt-1 font-semibold text-slate-900">
                          {innings.target || "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {activeTab === "playing-xi" && (
            <div className="grid gap-6 lg:grid-cols-2">
              {[
                { team: matchInfo.team1, players: teamOneXi },
                { team: matchInfo.team2, players: teamTwoXi },
              ].map(({ team, players }) => (
                <div
                  key={team?._id}
                  className="rounded-[28px] border border-slate-200 bg-white px-6 py-6 shadow-[0_10px_24px_rgba(15,23,42,0.05)]"
                >
                  <div className="mb-5 flex items-center gap-3">
                    <TeamBadge team={team} />
                    <div>
                      <p className="text-2xl font-semibold tracking-tight text-slate-950">
                        {team?.name}
                      </p>
                      <p className="text-sm text-slate-500">Playing XI</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {players.length > 0 ? (
                      players.map((entry, index) => (
                        <div
                          key={`${team?._id}-${entry.player}-${index}`}
                          className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
                        >
                          <div>
                            <p className="font-semibold text-slate-900">
                              {entry.playerData?.name || entry.player}
                            </p>
                            <p className="text-sm text-slate-500">
                              {entry.playerData?.role || "Selected player"}
                            </p>
                          </div>

                          <div className="flex gap-2">
                            {entry.isCaptain && (
                              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                                C
                              </span>
                            )}
                            {entry.isWicketKeeper && (
                              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                                WK
                              </span>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-slate-500">
                        Playing XI not published yet.
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "match-info" && (
            <div className="rounded-[28px] border border-slate-200 bg-white px-6 py-6 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                <div>
                  <p className="text-sm text-slate-500">Venue</p>
                  <p className="mt-2 font-semibold text-slate-900">
                    {matchInfo.venue}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Start Time</p>
                  <p className="mt-2 font-semibold text-slate-900">
                    {formatLongDateLabel(matchInfo.startTime)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Toss</p>
                  <p className="mt-2 font-semibold text-slate-900">
                    {matchInfo.tossWinner?.name
                      ? `${matchInfo.tossWinner.name} chose to ${matchInfo.tossDecision?.toLowerCase()}`
                      : "Pending"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Result</p>
                  <p className="mt-2 font-semibold text-slate-900">
                    {matchCenter.result ||
                      matchInfo.result ||
                      "Match in progress"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default MatchCenter;
