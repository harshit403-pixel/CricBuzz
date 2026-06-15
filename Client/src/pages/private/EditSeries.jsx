import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";

import { createSeriesSchema } from "../../features/series/schemas/series.schema.js";
import { useUpdateSeries } from "../../features/series/hooks/useUpdateSeries";
import { getSeriesById } from "../../features/series/api/series.api";

import {
  SERIES_STATUS_OPTIONS,
} from "../../shared/constants/series";
import { toast } from "sonner";
import { getErrorMessage } from "../../shared/utils/getErrorMessage.js";

function EditSeries() {
  const { id } = useParams();
  const navigate = useNavigate();

  const updateSeriesMutation = useUpdateSeries();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createSeriesSchema),
  });

  const { data, isLoading } = useQuery({
    queryKey: ["series", id],
    queryFn: () => getSeriesById(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (data?.data?.data) {
      reset({
        name: data.data.data.name || "",
        shortName: data.data.data.shortName || "",
        season: data.data.data.season || "",
        status: data.data.data.status || "",
        logo: data.data.data.logo || "",
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData) => {
    try {
      await updateSeriesMutation.mutateAsync({
        id,
        data: formData,
      });

      navigate("/admin/series");
      toast.success("Series Updated Successfully")
    } catch (error) {
      console.error(error);
      alert(
       toast.error(getErrorMessage(error))
      );
    }
  };

  if (isLoading) {
    return <div>Loading series...</div>;
  }

  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 text-3xl font-bold">
        Edit Series
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div>
          <label className="mb-2 block">
            Series Name
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

        <div>
          <label className="mb-2 block">
            Season
          </label>

          <input
            {...register("season")}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
          />

          {errors.season && (
            <p className="mt-1 text-sm text-red-500">
              {errors.season.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block">
            Status
          </label>

          <select
            {...register("status")}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
          >
            <option value="">
              Select Status
            </option>

            {SERIES_STATUS_OPTIONS.map((status) => (
              <option
                key={status}
                value={status}
              >
                {status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block">
            Logo URL
          </label>

          <input
            {...register("logo")}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
          />
        </div>

        <button
          type="submit"
          disabled={updateSeriesMutation.isPending}
          className="rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-white"
        >
          {updateSeriesMutation.isPending
            ? "Updating..."
            : "Update Series"}
        </button>
      </form>
    </div>
  );
}

export default EditSeries;