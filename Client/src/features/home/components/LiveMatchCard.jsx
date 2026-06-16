import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  buildTeamScoreRows,
  getLiveSummary,
  getOversLabel,
  getScoreLine,
  getTeamInitials,
} from "../../matches/utils/matchPresentation";

function TeamLogo({ team }) {
  if (team?.logo) {
    return (
      <img
        src={team.logo}
        alt={team.name}
        className="h-11 w-11 rounded-full border border-slate-200 object-cover"
      />
    );
  }

  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-xs font-semibold text-slate-700">
      {getTeamInitials(team?.shortName || team?.name)}
    </div>
  );
}

function LiveMatchCard({ match, scorecard, latestCommentary }) {
  const scoreRows = buildTeamScoreRows(match, scorecard);
  const liveSummary = getLiveSummary(match, scorecard, latestCommentary);

  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="rounded-[28px] border border-slate-200 bg-white px-5 py-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            {match?.seriesId?.name}
          </p>
          <p className="mt-2 text-sm text-slate-500">
            {match?.matchNumber || "Live Match"}
          </p>
        </div>

        <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-rose-600">
          {match?.status === "INNINGS_BREAK" ? "Break" : "Live"}
        </span>
      </div>

      <div className="space-y-5">
        {scoreRows.map(({ team, innings }) => (
          <div
            key={team?._id}
            className="flex items-center justify-between gap-4"
          >
            <div className="flex min-w-0 items-center gap-3">
              <TeamLogo team={team} />
              <div className="min-w-0">
                <p className="truncate text-lg font-semibold text-slate-900">
                  {team?.shortName}
                </p>
                <p className="truncate text-sm text-slate-500">{team?.name}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-3xl font-semibold tracking-tight text-slate-950">
                {innings ? getScoreLine(innings) : "--"}
              </p>
              <p className="text-sm text-slate-500">
                {innings ? getOversLabel(innings) : "Yet to bat"}
              </p>
            </div>
          </div>
        ))}

        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          {liveSummary}
        </div>

        <Link
          to={`/matches/${match._id}`}
          className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
        >
          View Match
        </Link>
      </div>
    </motion.article>
  );
}

export default LiveMatchCard;
