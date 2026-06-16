import { Link } from "react-router-dom";
import { Users } from "lucide-react";

import { useTeams } from "../../features/teams/hooks/useTeams";
import { getTeamInitials } from "../../features/matches/utils/matchPresentation";

function TeamBadge({ team }) {
  if (team?.logo) {
    return (
      <img
        src={team.logo}
        alt={team.name}
        className="h-16 w-16 rounded-full border border-slate-200 object-cover"
      />
    );
  }

  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-sm font-semibold text-slate-700">
      {getTeamInitials(team?.shortName || team?.name)}
    </div>
  );
}

function TeamsPage() {
  const { data, isLoading } = useTeams();
  const teams = data?.data?.data || [];

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-slate-500">
        Loading teams...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Teams
        </p>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight text-slate-950">
          National and franchise identities, all in one feed.
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-500">
          Team cards and squad views are powered by your current public team
          endpoints, with no backend changes required.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {teams.map((team) => (
          <article
            key={team._id}
            className="rounded-[28px] border border-slate-200 bg-white px-6 py-6 shadow-[0_10px_24px_rgba(15,23,42,0.05)]"
          >
            <div className="flex items-center gap-4">
              <TeamBadge team={team} />
              <div>
                <p className="text-2xl font-semibold tracking-tight text-slate-950">
                  {team.name}
                </p>
                <p className="mt-1 text-sm text-slate-500">{team.shortName}</p>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-2 text-sm text-slate-500">
              <Users className="h-4 w-4 text-blue-500" />
              {team.squadPlayers?.length || 0} squad players
            </div>

            <Link
              to={`/teams/${team._id}`}
              className="mt-8 inline-flex rounded-full border border-slate-200 bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              View Team
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

export default TeamsPage;
