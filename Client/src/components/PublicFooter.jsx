import { Link } from "react-router-dom";

function PublicFooter() {
  return (
    <footer className="border-t border-slate-200/80 bg-white/85">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 text-sm text-slate-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-2xl font-semibold tracking-tight text-slate-900">
            CricBuzz 2.0
          </p>
          <p className="mt-2">
            Precision cricket analytics, live scores, and modern match
            storytelling.
          </p>
        </div>

        <div className="flex flex-wrap gap-5">
          <Link to="/" className="transition hover:text-slate-900">
            Live Scores
          </Link>
          <Link to="/series" className="transition hover:text-slate-900">
            Series
          </Link>
          <Link to="/teams" className="transition hover:text-slate-900">
            Teams
          </Link>
          <Link to="/login" className="transition hover:text-slate-900">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default PublicFooter;
