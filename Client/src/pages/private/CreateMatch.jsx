import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { matchSchema } from "../../features/matches/schemas/match.schema";
import { useCreateMatch } from "../../features/matches/hooks/useCreateMatch";

import { useSeries } from "../../features/series/hooks/useSeries";
import { useTeams } from "../../features/teams/hooks/useTeams";

import { getErrorMessage } from "../../shared/utils/getErrorMessage";

function CreateMatch() {
  const navigate = useNavigate();

  const createMatchMutation = useCreateMatch();

  const { data: seriesData } = useSeries();
  const { data: teamsData } = useTeams();

  const series = seriesData?.data?.data || [];
  const teams = teamsData?.data?.data || [];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(matchSchema),
    defaultValues: {
      seriesId: "",
      team1: "",
      team2: "",
      venue: "",
      startTime: "",
      matchNumber: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await createMatchMutation.mutateAsync({
        ...data,
        startTime: new Date(data.startTime).toISOString(),
      });

      toast.success("Match created successfully");

      navigate("/admin/matches");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 text-3xl font-bold">Create Match</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Series */}
        <div>
          <label className="mb-2 block">Series</label>

          <select
            {...register("seriesId")}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
          >
            <option value="">Select Series</option>

            {series.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>

          {errors.seriesId && (
            <p className="mt-1 text-sm text-red-500">
              {errors.seriesId.message}
            </p>
          )}
        </div>

        {/* Team 1 */}
        <div>
          <label className="mb-2 block">Team 1</label>

          <select
            {...register("team1")}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
          >
            <option value="">Select Team</option>

            {teams.map((team) => (
              <option key={team._id} value={team._id}>
                {team.name}
              </option>
            ))}
          </select>

          {errors.team1 && (
            <p className="mt-1 text-sm text-red-500">{errors.team1.message}</p>
          )}
        </div>

        {/* Team 2 */}
        <div>
          <label className="mb-2 block">Team 2</label>

          <select
            {...register("team2")}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
          >
            <option value="">Select Team</option>

            {teams.map((team) => (
              <option key={team._id} value={team._id}>
                {team.name}
              </option>
            ))}
          </select>

          {errors.team2 && (
            <p className="mt-1 text-sm text-red-500">{errors.team2.message}</p>
          )}
        </div>

        {/* Venue */}
        <div>
          <label className="mb-2 block">Venue</label>

          <input
            {...register("venue")}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
            placeholder="Wankhede Stadium"
          />

          {errors.venue && (
            <p className="mt-1 text-sm text-red-500">{errors.venue.message}</p>
          )}
        </div>

        {/* Match Number */}
        <div>
          <label className="mb-2 block">Match Number</label>

          <input
            {...register("matchNumber")}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
            placeholder="Match 1"
          />
        </div>

        {/* Start Time */}
        <div>
          <label className="mb-2 block">Start Time</label>

          <input
            type="datetime-local"
            {...register("startTime")}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
          />

          {errors.startTime && (
            <p className="mt-1 text-sm text-red-500">
              {errors.startTime.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={createMatchMutation.isPending}
          className="rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-white"
        >
          {createMatchMutation.isPending ? "Creating..." : "Create Match"}
        </button>
      </form>
    </div>
  );
}

export default CreateMatch;
