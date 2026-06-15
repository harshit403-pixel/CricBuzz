import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { useMatch } from "../../features/matches/hooks/useMatch";
import { useUpdateToss } from "../../features/matches/hooks/useUpdateToss";

function MatchToss() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useMatch(id);

  const match = data?.data?.data;

  const [tossWinner, setTossWinner] = useState("");

  const [tossDecision, setTossDecision] = useState("");

  const updateTossMutation = useUpdateToss();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tossWinner) {
      return toast.error("Select toss winner");
    }

    if (!tossDecision) {
      return toast.error("Select toss decision");
    }

    try {
      await updateTossMutation.mutateAsync({
        id,
        data: {
          tossWinner,
          tossDecision,
        },
      });

      toast.success("Toss updated successfully");

      navigate(`/admin/matches/${id}/playing-xi`);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update toss");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-3xl font-bold">Match Toss</h1>

      <div className="mb-6 rounded-lg border border-slate-700 p-4">
        <h2 className="text-xl font-semibold">
          {match?.team1?.shortName} vs {match?.team2?.shortName}
        </h2>

        <p className="text-slate-400">{match?.venue}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <h3 className="mb-4 text-lg font-semibold">Toss Winner</h3>

          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="radio"
                value={match?.team1?._id}
                checked={tossWinner === match?.team1?._id}
                onChange={(e) => setTossWinner(e.target.value)}
              />

              {match?.team1?.name}
            </label>

            <label className="flex items-center gap-3">
              <input
                type="radio"
                value={match?.team2?._id}
                checked={tossWinner === match?.team2?._id}
                onChange={(e) => setTossWinner(e.target.value)}
              />

              {match?.team2?.name}
            </label>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Toss Decision</h3>

          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="radio"
                value="BAT"
                checked={tossDecision === "BAT"}
                onChange={(e) => setTossDecision(e.target.value)}
              />
              Bat
            </label>

            <label className="flex items-center gap-3">
              <input
                type="radio"
                value="BOWL"
                checked={tossDecision === "BOWL"}
                onChange={(e) => setTossDecision(e.target.value)}
              />
              Bowl
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={updateTossMutation.isPending}
          className="rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-white"
        >
          {updateTossMutation.isPending ? "Updating..." : "Update Toss"}
        </button>
      </form>
    </div>
  );
}

export default MatchToss;
