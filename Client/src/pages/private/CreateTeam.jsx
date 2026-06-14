import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { teamSchema } from "../../features/teams/schemas/team.schema.js";
import { useCreateTeam } from "../../features/teams/hooks/useCreateTeam";

import { getErrorMessage } from "../../shared/utils/getErrorMessage";

function CreateTeam() {
  const navigate = useNavigate();

  const createTeamMutation = useCreateTeam();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      name: "",
      shortName: "",
      logo: "",
      primaryColor: "#000000",
    },
  });

  const onSubmit = async (data) => {
    try {
      await createTeamMutation.mutateAsync(data);

      toast.success("Team created successfully");

      navigate("/admin/teams");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 text-3xl font-bold">
        Create Team
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Team Name */}
        <div>
          <label className="mb-2 block">
            Team Name
          </label>

          <input
            {...register("name")}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
            placeholder="Mumbai Indians"
          />

          {errors.name && (
            <p className="mt-1 text-sm text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Short Name */}
        <div>
          <label className="mb-2 block">
            Short Name
          </label>

          <input
            {...register("shortName")}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
            placeholder="MI"
          />

          {errors.shortName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.shortName.message}
            </p>
          )}
        </div>

        {/* Logo */}
        <div>
          <label className="mb-2 block">
            Logo URL
          </label>

          <input
            {...register("logo")}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
            placeholder="https://..."
          />

          {errors.logo && (
            <p className="mt-1 text-sm text-red-500">
              {errors.logo.message}
            </p>
          )}

          {watch("logo") && (
            <div className="mt-4">
              <img
                src={watch("logo")}
                alt="Team Logo Preview"
                className="h-20 w-20 rounded-lg border border-slate-700 object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          )}
        </div>

        {/* Primary Color */}
        <div>
          <label className="mb-2 block">
            Primary Color
          </label>

          <div className="flex items-center gap-4">
            <input
              type="color"
              {...register("primaryColor")}
              className="h-12 w-20 cursor-pointer rounded border border-slate-700 bg-slate-900"
            />

            <span className="text-slate-400">
              {watch("primaryColor")}
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={createTeamMutation.isPending}
          className="rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-white"
        >
          {createTeamMutation.isPending
            ? "Creating..."
            : "Create Team"}
        </button>
      </form>
    </div>
  );
}

export default CreateTeam;