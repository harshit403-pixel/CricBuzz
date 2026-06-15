import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  playerSchema,
  PLAYER_ROLES,
} from "../../features/player/schemas/player.schema";

import { usePlayer } from "../../features/player/hooks/usePlayer.js";
import { useUpdatePlayer } from "../../features/player/hooks/useUpdatePlayer";

import { getErrorMessage } from "../../shared/utils/getErrorMessage";

function EditPlayer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = usePlayer(id);

  const updatePlayerMutation = useUpdatePlayer();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(playerSchema),
  });

  useEffect(() => {
    if (data?.data?.data) {
      const player = data.data.data;

      reset({
        name: player.name,
        image: player.image,
        role: player.role,
        country: player.country,
        battingStyle: player.battingStyle,
        bowlingStyle: player.bowlingStyle,
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData) => {
    try {
      await updatePlayerMutation.mutateAsync({
        id,
        data: formData,
      });

      toast.success("Player updated successfully");

      navigate("/admin/players");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  if (isLoading) {
    return <div>Loading player...</div>;
  }

  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 text-3xl font-bold">Edit Player</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <input
          {...register("name")}
          placeholder="Player Name"
          className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
        />

        <input
          {...register("image")}
          placeholder="Image URL"
          className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
        />

        <select
          {...register("role")}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
        >
          {Object.values(PLAYER_ROLES).map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>

        <input
          {...register("country")}
          placeholder="Country"
          className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
        />

        <input
          {...register("battingStyle")}
          placeholder="Batting Style"
          className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
        />

        <input
          {...register("bowlingStyle")}
          placeholder="Bowling Style"
          className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
        />

        {watch("image") && (
          <img
            src={watch("image")}
            alt="Preview"
            className="h-24 w-24 rounded-full object-cover"
          />
        )}

        <button
          type="submit"
          className="rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-white"
        >
          Update Player
        </button>
      </form>
    </div>
  );
}

export default EditPlayer;
