import { motion } from "framer-motion";
import { ArrowRight, Dot } from "lucide-react";
import { Link } from "react-router-dom";

import LiveMatchCard from "../../features/home/components/LiveMatchCard";
import ResultCard from "../../features/home/components/ResultCard";
import UpcomingMatchCard from "../../features/home/components/UpcomingMatchCard";
import { useHomeFeed } from "../../features/home/hooks/useHomeFeed";

function Home() {
  const {
    isLoading,
    liveMatches,
    upcomingMatches,
    recentMatches,
    liveScorecardsByMatchId,
    recentScorecardsByMatchId,
    liveCommentaryByMatchId,
  } = useHomeFeed();

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-slate-500">
        Loading live experience...
      </div>
    );
  }

  return (
    <div className="pb-16">
      <section className="border-b border-slate-200/80 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_30%),linear-gradient(180deg,#fbfbf9_0%,#f6f7f4_100%)]">
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-5 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-blue-600 shadow-sm">
              <Dot className="h-5 w-5 fill-current text-blue-500" />
              Platform Reimagined
            </div>

            <h1 className="mt-8 text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
              Live Cricket.
              <br />
              Beautifully Simplified.
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-500">
              Experience the precision of live scores, modern match center
              views, and clean storytelling built directly on your existing
              CricBuzz APIs.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#live-matches"
                className="inline-flex items-center rounded-full bg-blue-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                View Live Matches
              </a>

              <Link
                to="/series"
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-7 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                Explore Series
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <section id="live-matches" className="pt-4">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-rose-500">
                Live Matches
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                Real-time updates from global arenas
              </h2>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-blue-600"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {liveMatches.map((match) => (
              <LiveMatchCard
                key={match._id}
                match={match}
                scorecard={liveScorecardsByMatchId[match._id]}
                latestCommentary={liveCommentaryByMatchId[match._id]}
              />
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
                Upcoming Matches
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Scheduled fixtures powered by the existing match feed
              </p>
            </div>

            <Link
              to="/series"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-blue-600"
            >
              Explore
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {upcomingMatches.map((match) => (
              <UpcomingMatchCard key={match._id} match={match} />
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
              Recent Results
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Final results and score summaries from completed fixtures
            </p>
          </div>

          <div className="space-y-5">
            {recentMatches.map((match) => (
              <ResultCard
                key={match._id}
                match={match}
                scorecard={recentScorecardsByMatchId[match._id]}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
