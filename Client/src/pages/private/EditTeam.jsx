import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { teamSchema } from "../../features/teams/schemas/team.schema";
import { useUpdateTeam } from "../../features/teams/hooks/useUpdateTeam";
import { getTeamById } from "../../features/teams/api/team.api";

import { getErrorMessage } from "../../shared/utils/getErrorMessage";

function EditTeam() {
  const { id } = useParams();
  const navigate = useNavigate();

  const updateTeamMutation = useUpdateTeam();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(teamSchema),
  });

  const { data, isLoading } = useQuery({
    queryKey: ["team", id],
    queryFn: () => getTeamById(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (data?.data?.data) {
      reset({
        name: data.data.data.name || "",
        shortName: data.data.data.shortName || "",
        logo: data.data.data.logo || "",
        primaryColor:
          data.data.data.primaryColor || "#000000",
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData) => {
    try {
      await updateTeamMutation.mutateAsync({
        id,
        data: formData,
      });

      toast.success("Team updated successfully");

      navigate("/admin/teams");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  if (isLoading) {
    return <div>Loading team...</div>;
  }

  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 text-3xl font-bold">
        Edit Team
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
                alt="Team Logo"
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
              className="h-12 w-20 cursor-pointer rounded border border-slate-700"
            />

            <span className="text-slate-400">
              {watch("primaryColor")}
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={updateTeamMutation.isPending}
          className="rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-white"
        >
          {updateTeamMutation.isPending
            ? "Updating..."
            : "Update Team"}
        </button>
      </form>
    </div>
  );
}

export default EditTeam;