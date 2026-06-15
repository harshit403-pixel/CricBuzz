import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { useMatch } from "../../features/matches/hooks/useMatch";
import { useUpdateMatch } from "../../features/matches/hooks/useUpdateMatch";
import { matchSchema } from "../../features/matches/schemas/match.schema";
import { updateMatchSchema } from "../../features/matches/schemas/match.schema";

import { getErrorMessage } from "../../shared/utils/getErrorMessage";

function EditMatch() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data, isLoading } = useMatch(id);

  const updateMatchMutation = useUpdateMatch();

  const match = data?.data?.data;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateMatchSchema),
    defaultValues: {
      venue: "",
      startTime: "",
      matchNumber: "",
    },
  });

  useEffect(() => {
    if (!match) {
      return;
    }

    reset({
      venue: match.venue || "",

      matchNumber: match.matchNumber || "",

      startTime: match.startTime
        ? new Date(match.startTime).toISOString().slice(0, 16)
        : "",
    });
  }, [match, reset]);

  const onSubmit = async (formData) => {
    try {
      await updateMatchMutation.mutateAsync({
        id,
        data: {
          venue: formData.venue,
          matchNumber: formData.matchNumber,
          startTime: new Date(formData.startTime).toISOString(),
        },
      });

      toast.success("Match updated successfully");

      navigate("/admin/matches");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">Loading match...</div>
    );
  }

  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 text-3xl font-bold">Edit Match</h1>

      {/* Read-only info */}

      <div className="mb-8 space-y-3 rounded-lg border border-slate-800 bg-slate-900 p-4">
        <div>
          <span className="font-semibold">Series:</span> {match?.seriesId?.name}
        </div>

        <div>
          <span className="font-semibold">Teams:</span>{" "}
          {match?.team1?.shortName} vs {match?.team2?.shortName}
        </div>

        <div>
          <span className="font-semibold">Status:</span> {match?.status}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Match Number */}

        <div>
          <label className="mb-2 block">Match Number</label>

          <input
            {...register("matchNumber")}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
            placeholder="Match 1"
          />

          {errors.matchNumber && (
            <p className="mt-1 text-sm text-red-500">
              {errors.matchNumber.message}
            </p>
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
          disabled={updateMatchMutation.isPending}
          className="rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white"
        >
          {updateMatchMutation.isPending ? "Updating..." : "Update Match"}
        </button>
      </form>
    </div>
  );
}

export default EditMatch;
