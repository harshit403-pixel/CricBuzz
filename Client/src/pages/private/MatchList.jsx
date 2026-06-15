import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

import { useMatches } from "../../features/matches/hooks/useMatches";
import { useDeleteMatch } from "../../features/matches/hooks/useDeleteMatch";

import ConfirmModal from "../../shared/components/ui/ConfirmModal";
import { getErrorMessage } from "../../shared/utils/getErrorMessage";
import { useStartMatch } from "../../features/matches/hooks/useStartMatch";

function MatchesList() {
  const [selectedMatch, setSelectedMatch] = useState(null);

  const { data, isLoading, isError } = useMatches();

  const deleteMatchMutation = useDeleteMatch();

  const matches = data?.data?.data || [];

  const startMatchMutation = useStartMatch();

  const handleStart = async (id) => {
    try {
      await startMatchMutation.mutateAsync(id);

      toast.success("Match started successfully");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMatchMutation.mutateAsync(selectedMatch._id);

      toast.success("Match deleted successfully");

      setSelectedMatch(null);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">Loading matches...</div>
    );
  }

  if (isError) {
    return <div className="text-red-500">Failed to load matches.</div>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Matches</h1>

        <Link
          to="/admin/matches/create"
          className="rounded-lg bg-emerald-500 px-4 py-2 font-medium text-white"
        >
          Create Match
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {matches.map((match) => (
          <div
            key={match._id}
            className="rounded-xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-700"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold">
                {match.matchNumber || "Match"}
              </h3>

              <span
                className={`rounded px-3 py-1 text-xs font-medium text-white ${
                  match.status === "LIVE"
                    ? "bg-green-500"
                    : match.status === "COMPLETED"
                      ? "bg-slate-500"
                      : match.status === "TOSS_COMPLETED"
                        ? "bg-yellow-500"
                        : match.status === "PLAYING_XI_SELECTED"
                          ? "bg-purple-500"
                          : "bg-blue-500"
                }`}
              >
                {match.status}
              </span>
            </div>

            <div className="mb-4">
              <p className="text-xl font-semibold">
                {match.team1?.shortName}
                <span className="mx-2 text-slate-500">vs</span>
                {match.team2?.shortName}
              </p>

              <p className="mt-1 text-sm text-slate-400">
                {match.seriesId?.name}
              </p>
            </div>

            <div className="space-y-2 text-sm text-slate-300">
              <div>
                <span className="font-medium">Venue:</span> {match.venue}
              </div>

              <div>
                <span className="font-medium">Start:</span>{" "}
                {new Date(match.startTime).toLocaleString()}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                to={`/admin/matches/${match._id}/edit`}
                className="rounded bg-blue-500 px-3 py-1 text-sm text-white"
              >
                Edit
              </Link>

              {match.status === "UPCOMING" && (
                <Link
                  to={`/admin/matches/${match._id}/toss`}
                  className="rounded bg-yellow-500 px-3 py-1 text-sm text-white"
                >
                  Toss
                </Link>
              )}

              {match.status === "TOSS_COMPLETED" && (
                <Link
                  to={`/admin/matches/${match._id}/playing-xi`}
                  className="rounded bg-purple-500 px-3 py-1 text-sm text-white"
                >
                  Playing XI
                </Link>
              )}

              {match.status === "PLAYING_XI_SELECTED" && (
                <button
                  onClick={() => handleStart(match._id)}
                  className="rounded bg-green-600 px-3 py-1 text-sm text-white"
                >
                  Start Match
                </button>
              )}

              {match.status === "LIVE" && (
                <Link
                  to={`/admin/matches/${match._id}/complete`}
                  className="rounded bg-red-600 px-3 py-1 text-sm text-white"
                >
                  Complete
                </Link>
              )}
              {match.status === "LIVE" && (
                <Link
                  to={`/admin/matches/${match._id}/scores`}
                  className="rounded bg-indigo-600 px-3 py-1 text-sm text-white"
                >
                  Scores
                </Link>
              )}
              {match.status === "LIVE" && (
                <Link
                  to={`/admin/matches/${match._id}/commentary`}
                  className="rounded bg-orange-500 px-3 py-1 text-sm text-white"
                >
                  Commentary
                </Link>
              )}

              <button
                onClick={() => setSelectedMatch(match)}
                className="rounded bg-slate-700 px-3 py-1 text-sm text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {matches.length === 0 && (
          <div className="col-span-full rounded-lg border border-slate-800 p-6 text-center text-slate-400">
            No matches found.
          </div>
        )}
      </div>

      <ConfirmModal
        open={!!selectedMatch}
        title="Delete Match"
        description={`Are you sure you want to delete "${selectedMatch?.matchNumber || selectedMatch?._id}"?`}
        onConfirm={handleDelete}
        onCancel={() => setSelectedMatch(null)}
      />
    </div>
  );
}

export default MatchesList;
