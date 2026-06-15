import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  playerSchema,
  PLAYER_ROLES,
} from "../../features/player/schemas/player.schema";

import { useCreatePlayer } from "../../features/player/hooks/useCreatePlayer";

import { getErrorMessage } from "../../shared/utils/getErrorMessage";

function CreatePlayer() {
  const navigate = useNavigate();

  const createPlayerMutation =
    useCreatePlayer();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(playerSchema),

    defaultValues: {
      name: "",
      image: "",
      role: PLAYER_ROLES.BATTER,
      country: "",
      battingStyle: "",
      bowlingStyle: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await createPlayerMutation.mutateAsync(
        data,
      );

      toast.success(
        "Player created successfully",
      );

      navigate("/admin/players");
    } catch (error) {
      toast.error(
        getErrorMessage(error),
      );
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 text-3xl font-bold">
        Create Player
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <input
          {...register("name")}
          placeholder="Player Name"
          className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
        />

        {errors.name && (
          <p className="text-red-500">
            {errors.name.message}
          </p>
        )}

        <input
          {...register("image")}
          placeholder="Image URL"
          className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
        />

        <select
          {...register("role")}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
        >
          {Object.values(
            PLAYER_ROLES,
          ).map((role) => (
            <option
              key={role}
              value={role}
            >
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
          disabled={
            createPlayerMutation.isPending
          }
          className="rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-white"
        >
          {createPlayerMutation.isPending
            ? "Creating..."
            : "Create Player"}
        </button>
      </form>
    </div>
  );
}

export default CreatePlayer;