import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createSeriesSchema } from "../../features/series/schemas/series.schema.js";
import { useCreateSeries } from "../../features/series/hooks/useCreateSeries";
import {
  SERIES_STATUS_OPTIONS,
} from "../../shared/constants/series";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getErrorMessage } from "../../shared/utils/getErrorMessage";


function CreateSeries() {
  const createSeriesMutation = useCreateSeries();
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createSeriesSchema),

    defaultValues: {
      name: "",
      shortName: "",
      season: "",
      status: "",
      logo: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await createSeriesMutation.mutateAsync(data);
      
navigate("/admin/series");
      toast.success("Series created successfully");
    } catch (error) {
      
    toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 text-3xl font-bold">
        Create Series
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
    <option value="">Select Status</option>

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
          disabled={createSeriesMutation.isPending}
          className="rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-white"
        >
          {createSeriesMutation.isPending
            ? "Creating..."
            : "Create Series"}
        </button>
      </form>
    </div>
  );
}

export default CreateSeries;