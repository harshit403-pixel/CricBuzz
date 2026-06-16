import { Link, useParams } from "react-router-dom";

import { useSeriesDetails } from "../../features/series/hooks/useSeriesDetails";
import { formatLongDateLabel } from "../../features/matches/utils/matchPresentation";

function SeriesDetailPage() {
  const { id } = useParams();
  const { data, isLoading } = useSeriesDetails(id);

  const seriesData = data?.data?.data || {};
  const series = seriesData.series || null;
  const matches = seriesData.matches || [];
  const pointsTable = seriesData.pointsTable || [];

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-slate-500">
        Loading series details...
      </div>
    );
  }

  if (!series) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <p className="text-lg text-slate-500">
          Series details are unavailable.
        </p>
        <Link
          to="/series"
          className="mt-6 inline-flex rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white"
        >
          Back to series
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[28px] border border-slate-200 bg-white px-8 py-8 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
          {series.status}
        </p>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight text-slate-950">
          {series.name}
        </h1>
        <p className="mt-4 text-lg text-slate-500">
          {series.shortName} - {series.season}
        </p>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white px-6 py-6 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
            Matches
          </h2>

          <div className="mt-6 space-y-4">
            {matches.map((match) => (
              <div
                key={match._id}
                className="rounded-3xl border border-slate-100 bg-slate-50 px-5 py-5"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-slate-950">
                      {match.team1?.shortName} vs {match.team2?.shortName}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {match.matchNumber} - {match.venue}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                      {match.status}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {formatLongDateLabel(match.startTime)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-4">
                  <p className="text-sm text-slate-600">
                    {match.result || "Awaiting result"}
                  </p>
                  <Link
                    to={`/matches/${match._id}`}
                    className="text-sm font-semibold text-blue-600"
                  >
                    Match Center
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-[28px] border border-slate-200 bg-white px-6 py-6 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
            Points Table
          </h2>

          <div className="mt-6 space-y-3">
            {pointsTable.length > 0 ? (
              pointsTable.map((entry, index) => (
                <div
                  key={entry.team?._id || index}
                  className="grid grid-cols-[2rem_1fr_auto_auto] items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm"
                >
                  <span className="font-semibold text-slate-500">
                    {index + 1}
                  </span>
                  <span className="font-semibold text-slate-900">
                    {entry.team?.shortName}
                  </span>
                  <span className="text-slate-500">P {entry.played}</span>
                  <span className="font-semibold text-blue-600">
                    {entry.points} pts
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">
                No completed matches yet, so the points table is still forming.
              </p>
            )}
          </div>
        </aside>
      </section>
    </div>
  );
}

export default SeriesDetailPage;
