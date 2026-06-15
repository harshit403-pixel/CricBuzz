import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { useMatch } from "../../features/matches/hooks/useMatch";
import { useCompleteMatch } from "../../features/matches/hooks/useCompleteMatch";

function CompleteMatch() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useMatch(id);

  const completeMatchMutation = useCompleteMatch();

  const match = data?.data?.data;

  const [winner, setWinner] = useState("");

  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!winner) {
      return toast.error("Please select a winner");
    }

    if (!result.trim()) {
      return toast.error("Please enter result");
    }

    try {
      await completeMatchMutation.mutateAsync({
        id,
        data: {
          winner,
          result,
        },
      });

      toast.success("Match completed successfully");

      navigate("/admin/matches");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to complete match");
    }
  };

  if (isLoading) {
    return <div className="flex justify-center">Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-3xl font-bold">Complete Match</h1>

      <div className="mb-6 rounded-lg border border-slate-700 p-4">
        <h2 className="text-xl font-semibold">
          {match?.team1?.shortName} vs {match?.team2?.shortName}
        </h2>

        <p className="text-slate-400">Venue: {match?.venue}</p>

        <p className="text-slate-400">Status: {match?.status}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="mb-3 block text-lg font-semibold">
            Select Winner
          </label>

          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="radio"
                value={match?.team1?._id}
                checked={winner === match?.team1?._id}
                onChange={(e) => setWinner(e.target.value)}
              />

              {match?.team1?.name}
            </label>

            <label className="flex items-center gap-3">
              <input
                type="radio"
                value={match?.team2?._id}
                checked={winner === match?.team2?._id}
                onChange={(e) => setWinner(e.target.value)}
              />

              {match?.team2?.name}
            </label>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-lg font-semibold">
            Match Result
          </label>

          <textarea
            value={result}
            onChange={(e) => setResult(e.target.value)}
            rows={4}
            placeholder="RCB won by 7 wickets"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
          />
        </div>

        <button
          type="submit"
          disabled={completeMatchMutation.isPending}
          className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white"
        >
          {completeMatchMutation.isPending ? "Completing..." : "Complete Match"}
        </button>
      </form>
    </div>
  );
}

export default CompleteMatch;
