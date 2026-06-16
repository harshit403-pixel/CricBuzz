import { Link } from "react-router-dom";
import { Trophy } from "lucide-react";

import { useSeries } from "../../features/series/hooks/useSeries";
import {
  formatDateLabel,
  getTeamInitials,
} from "../../features/matches/utils/matchPresentation";

function SeriesLogo({ series }) {
  if (series?.logo) {
    return (
      <img
        src={series.logo}
        alt={series.name}
        className="h-16 w-16 rounded-2xl border border-slate-200 object-cover"
      />
    );
  }

  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 text-sm font-semibold text-slate-700">
      {getTeamInitials(series?.shortName || series?.name)}
    </div>
  );
}

function SeriesPage() {
  const { data, isLoading } = useSeries();
  const series = data?.data?.data || [];

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-slate-500">
        Loading series...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Series
        </p>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight text-slate-950">
          Tournaments and storylines in one place.
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-500">
          Explore active, upcoming, and completed tournaments using the same
          public series APIs already available in your backend.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {series.map((item) => (
          <article
            key={item._id}
            className="rounded-[28px] border border-slate-200 bg-white px-6 py-6 shadow-[0_10px_24px_rgba(15,23,42,0.05)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <SeriesLogo series={item} />
                <div>
                  <p className="text-2xl font-semibold tracking-tight text-slate-950">
                    {item.name}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {item.shortName} - {item.season}
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                {item.status}
              </span>
            </div>

            <div className="mt-8 flex items-center justify-between text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-blue-500" />
                Tournament hub
              </div>
              <span>{formatDateLabel(item.createdAt)}</span>
            </div>

            <Link
              to={`/series/${item._id}`}
              className="mt-8 inline-flex rounded-full border border-slate-200 bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              View Series
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

export default SeriesPage;
