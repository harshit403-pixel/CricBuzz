import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import { Link } from "react-router-dom";

import {
  formatDateLabel,
  getTeamInitials,
} from "../../matches/utils/matchPresentation";

function TeamDot({ team }) {
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

function UpcomingMatchCard({ match }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="rounded-[28px] border border-slate-200 bg-white px-5 py-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)]"
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
          {formatDateLabel(match?.startTime)}
        </p>

        <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
          Upcoming
        </span>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col items-center gap-2">
          <TeamDot team={match?.team1} />
          <p className="text-base font-semibold text-slate-900">
            {match?.team1?.shortName}
          </p>
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
            VS
          </p>
          <p className="mt-3 text-xs text-slate-500">{match?.matchNumber}</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <TeamDot team={match?.team2} />
          <p className="text-base font-semibold text-slate-900">
            {match?.team2?.shortName}
          </p>
        </div>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-4 text-center text-sm text-slate-500">
        <p>{match?.seriesId?.name}</p>
        <p className="mt-1">{match?.venue}</p>
      </div>

      <Link
        to={`/matches/${match._id}`}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        <Bell className="h-4 w-4" />
        Set Reminder
      </Link>
    </motion.article>
  );
}

export default UpcomingMatchCard;
