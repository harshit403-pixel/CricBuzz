import { Link, useParams } from "react-router-dom";

import { useTeam } from "../../features/teams/hooks/useTeam";
import { getTeamInitials } from "../../features/matches/utils/matchPresentation";

function TeamMark({ team }) {
  if (team?.logo) {
    return (
      <img
        src={team.logo}
        alt={team.name}
        className="h-20 w-20 rounded-full border border-slate-200 object-cover"
      />
    );
  }

  return (
    <div className="flex h-20 w-20 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-lg font-semibold text-slate-700">
      {getTeamInitials(team?.shortName || team?.name)}
    </div>
  );
}

function TeamDetailPage() {
  const { id } = useParams();
  const { data, isLoading } = useTeam(id);

  const team = data?.data?.data || null;
  const squad = team?.squadPlayers || [];

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-slate-500">
        Loading team details...
      </div>
    );
  }

  if (!team) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <p className="text-lg text-slate-500">Team details are unavailable.</p>
        <Link
          to="/teams"
          className="mt-6 inline-flex rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white"
        >
          Back to teams
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[28px] border border-slate-200 bg-white px-8 py-8 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <TeamMark team={team} />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
              Team Profile
            </p>
            <h1 className="mt-3 text-5xl font-semibold tracking-tight text-slate-950">
              {team.name}
            </h1>
            <p className="mt-3 text-lg text-slate-500">{team.shortName}</p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-[28px] border border-slate-200 bg-white px-6 py-6 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
              Squad
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Public squad data from your current team endpoint
            </p>
          </div>
          <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            {squad.length} players
          </span>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {squad.map((player) => (
            <article
              key={player._id}
              className="rounded-3xl border border-slate-100 bg-slate-50 px-5 py-5"
            >
              <p className="text-xl font-semibold tracking-tight text-slate-950">
                {player.name}
              </p>
              <p className="mt-2 text-sm uppercase tracking-[0.16em] text-blue-600">
                {player.role}
              </p>
              <div className="mt-4 space-y-1 text-sm text-slate-500">
                <p>{player.country}</p>
                <p>{player.battingStyle || "Batting style pending"}</p>
                <p>{player.bowlingStyle || "Bowling style pending"}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default TeamDetailPage;
