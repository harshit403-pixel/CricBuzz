import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { useCommentary } from "../../features/commentary/hooks/useCommentary.js";
import { useCreateCommentary } from "../../features/commentary/hooks/useCreateCommentary.js";
import CommentaryTimeline from "../../features/commentary/components/CommentaryTimeline";

import { useMatch } from "../../features/matches/hooks/useMatch";

function CommentaryManagement() {
  const { id } = useParams();

  const { data: matchResponse } = useMatch(id);

  const { data, isLoading } = useCommentary(id);

  const createMutation = useCreateCommentary();

  const commentary = data?.data?.data || [];

  const match = matchResponse?.data?.data;

  const [formData, setFormData] = useState({
    innings: 1,
    over: 0,
    ball: 1,
    battingTeam: "",
    type: "NORMAL",
    message: "",
    runs: 0,
    wicket: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createMutation.mutateAsync({
        matchId: id,
        innings: Number(formData.innings),
        over: Number(formData.over),
        ball: Number(formData.ball),
        battingTeam: formData.battingTeam,
        type: formData.type,
        message: formData.message,
        runs: Number(formData.runs),
        wicket: formData.wicket,
      });

      toast.success("Commentary added");

      setFormData({
        innings: 1,
        over: 0,
        ball: 1,
        battingTeam: "",
        type: "NORMAL",
        message: "",
        runs: 0,
        wicket: false,
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to create commentary",
      );
    }
  };

  if (isLoading) {
    return <div>Loading commentary...</div>;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* FORM */}

      <div className="rounded-xl border border-slate-800 p-6">
        <h2 className="mb-6 text-2xl font-bold">Add Commentary</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="innings"
            value={formData.innings}
            onChange={handleChange}
            className="w-full rounded border border-slate-700 bg-slate-900 p-2"
          >
            <option value={1}>1st Innings</option>

            <option value={2}>2nd Innings</option>
          </select>

          <div className="grid grid-cols-2 gap-3">
            <input
              name="over"
              type="number"
              placeholder="Over"
              value={formData.over}
              onChange={handleChange}
              className="rounded border border-slate-700 bg-slate-900 p-2"
            />

            <input
              name="ball"
              type="number"
              placeholder="Ball"
              value={formData.ball}
              onChange={handleChange}
              className="rounded border border-slate-700 bg-slate-900 p-2"
            />
          </div>

          <select
            name="battingTeam"
            value={formData.battingTeam}
            onChange={handleChange}
            className="w-full rounded border border-slate-700 bg-slate-900 p-2"
          >
            <option value="">Select Team</option>

            <option value={match?.team1?._id}>{match?.team1?.name}</option>

            <option value={match?.team2?._id}>{match?.team2?.name}</option>
          </select>

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full rounded border border-slate-700 bg-slate-900 p-2"
          >
            <option value="NORMAL">NORMAL</option>

            <option value="FOUR">FOUR</option>

            <option value="SIX">SIX</option>

            <option value="WICKET">WICKET</option>

            <option value="MILESTONE">MILESTONE</option>
          </select>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Commentary..."
            rows={4}
            className="w-full rounded border border-slate-700 bg-slate-900 p-2"
          />

          <input
            type="number"
            name="runs"
            value={formData.runs}
            onChange={handleChange}
            placeholder="Runs"
            className="w-full rounded border border-slate-700 bg-slate-900 p-2"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="wicket"
              checked={formData.wicket}
              onChange={handleChange}
            />
            Wicket
          </label>

          <button
            type="submit"
            disabled={createMutation.isPending}
            className="rounded bg-orange-500 px-5 py-2 text-white"
          >
            {createMutation.isPending ? "Adding..." : "Add Commentary"}
          </button>
        </form>
      </div>

      {/* TIMELINE */}

      <div>
        <h2 className="mb-6 text-2xl font-bold">Timeline</h2>

        <CommentaryTimeline commentary={commentary} />
      </div>
    </div>
  );
}

export default CommentaryManagement;
