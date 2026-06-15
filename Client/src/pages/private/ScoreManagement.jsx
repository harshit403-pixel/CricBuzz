import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { useMatch } from "../../features/matches/hooks/useMatch";
import { useMatchScores } from "../../features/scores/hooks/useMatchScores";
import { useCreateScore } from "../../features/scores/hooks/useCreateScore";
import { useUpdateScore } from "../../features/scores/hooks/useUpdateScore";

function ScoreManagement() {
  const { id } = useParams();
  const [editingScore, setEditingScore] = useState(null);

  const updateScoreMutation = useUpdateScore();

  const { data: matchResponse } = useMatch(id);

  const { data: scoreResponse } = useMatchScores(id);

  const createScoreMutation = useCreateScore();

  const match = matchResponse?.data?.data;

  const scores = scoreResponse?.data?.data || [];

  const [formData, setFormData] = useState({
    innings: 1,
    battingTeam: "",
    score: 0,
    wickets: 0,
    overs: "0",
    runRate: 0,
    target: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (score) => {
    setEditingScore(score);

    setFormData({
      innings: score.innings,
      battingTeam: score.battingTeam?._id || score.battingTeam,
      score: score.score,
      wickets: score.wickets,
      overs: score.overs,
      runRate: score.runRate,
      target: score.target || "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      matchId: id,
      innings: Number(formData.innings),
      battingTeam: formData.battingTeam,
      score: Number(formData.score),
      wickets: Number(formData.wickets),
      overs: formData.overs,
      runRate: Number(formData.runRate),
      target: formData.target ? Number(formData.target) : null,
    };

    try {
      if (editingScore) {
        await updateScoreMutation.mutateAsync({
          id: editingScore._id,
          data: payload,
        });

        toast.success("Score updated successfully");
      } else {
        await createScoreMutation.mutateAsync(payload);

        toast.success("Score created successfully");
      }

      setEditingScore(null);

      setFormData({
        innings: 1,
        battingTeam: "",
        score: 0,
        wickets: 0,
        overs: "0",
        runRate: 0,
        target: "",
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Operation failed");
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Score Management</h1>

        <p className="text-slate-400">
          {match?.team1?.shortName} vs {match?.team2?.shortName}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-slate-800 p-6"
      >
        <div>
          <label>Innings</label>

          <select
            name="innings"
            value={formData.innings}
            onChange={handleChange}
            className="mt-1 w-full rounded border border-slate-700 bg-slate-900 p-2"
          >
            <option value={1}>1st Innings</option>

            <option value={2}>2nd Innings</option>
          </select>
        </div>

        <div>
          <label>Batting Team</label>

          <select
            name="battingTeam"
            value={formData.battingTeam}
            onChange={handleChange}
            className="mt-1 w-full rounded border border-slate-700 bg-slate-900 p-2"
          >
            <option value="">Select Team</option>

            <option value={match?.team1?._id}>{match?.team1?.name}</option>

            <option value={match?.team2?._id}>{match?.team2?.name}</option>
          </select>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label>Runs</label>

            <input
              type="number"
              name="score"
              value={formData.score}
              onChange={handleChange}
              className="mt-1 w-full rounded border border-slate-700 bg-slate-900 p-2"
            />
          </div>

          <div>
            <label>Wickets</label>

            <input
              type="number"
              name="wickets"
              value={formData.wickets}
              onChange={handleChange}
              className="mt-1 w-full rounded border border-slate-700 bg-slate-900 p-2"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label>Overs</label>

            <input
              name="overs"
              value={formData.overs}
              onChange={handleChange}
              placeholder="15.2"
              className="mt-1 w-full rounded border border-slate-700 bg-slate-900 p-2"
            />
          </div>

          <div>
            <label>Run Rate</label>

            <input
              type="number"
              step="0.01"
              name="runRate"
              value={formData.runRate}
              onChange={handleChange}
              className="mt-1 w-full rounded border border-slate-700 bg-slate-900 p-2"
            />
          </div>
        </div>

        <div>
          <label>Target</label>

          <input
            type="number"
            name="target"
            value={formData.target}
            onChange={handleChange}
            className="mt-1 w-full rounded border border-slate-700 bg-slate-900 p-2"
          />
        </div>

        <button
          type="submit"
          disabled={
            createScoreMutation.isPending || updateScoreMutation.isPending
          }
          className="rounded bg-indigo-600 px-6 py-2 text-white"
        >
          {createScoreMutation.isPending || updateScoreMutation.isPending
            ? editingScore
              ? "Updating..."
              : "Saving..."
            : editingScore
              ? "Update Score"
              : "Save Score"}
        </button>
      </form>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Existing Scores</h2>

        {scores.map((score) => (
          <div
            key={score._id}
            className="rounded-lg border border-slate-800 p-4"
          >
            <div>Innings: {score.innings}</div>

            <div>
              Runs: {score.score}/{score.wickets}
            </div>

            <div>Overs: {score.overs}</div>

            <div>Run Rate: {score.runRate}</div>
            <button
              onClick={() => handleEdit(score)}
              className="mt-3 rounded bg-blue-500 px-3 py-1 text-sm text-white"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScoreManagement;
