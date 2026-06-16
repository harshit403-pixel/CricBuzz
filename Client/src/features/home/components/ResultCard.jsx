import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import {
  buildTeamScoreRows,
  getResultSummary,
  getScoreLine,
  getTeamInitials,
} from "../../matches/utils/matchPresentation";

function TeamMark({ team }) {
  if (team?.logo) {
    return (
      <img
        src={team.logo}
        alt={team.name}
        className="h-12 w-12 rounded-full border border-slate-200 object-cover"
      />
    );
  }

  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-xs font-semibold text-slate-700">
      {getTeamInitials(team?.shortName || team?.name)}
    </div>
  );
}

function ResultCard({ match, scorecard }) {
  const scoreRows = buildTeamScoreRows(match, scorecard);

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="rounded-[28px] border border-slate-200 bg-white px-5 py-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            {match?.seriesId?.name}
          </p>
          <p className="mt-2 text-sm text-slate-500">{match?.matchNumber}</p>
        </div>

        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
          Result
        </span>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-6">
        {scoreRows.map(({ team, innings }) => (
          <div key={team?._id} className="flex items-center gap-3">
            <TeamMark team={team} />
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {team?.shortName}
              </p>
              <p className="text-xl font-semibold tracking-tight text-slate-900">
                {innings ? getScoreLine(innings) : "--"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
        <div>
          <p className="text-base font-semibold text-blue-600">
            {getResultSummary(match, scorecard)}
          </p>
          <p className="mt-1 text-sm text-slate-500">{match?.venue}</p>
        </div>

        <Link
          to={`/matches/${match._id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-900"
        >
          Details
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.article>
  );
}

export default ResultCard;
