import { Link } from "react-router-dom";
import { useSeries } from "../../features/series/hooks/useSeries";
import StatusBadge from "../../shared/components/ui/StatusBadge";
import { useState } from "react";
import ConfirmModal from "../../shared/components/ui/ConfirmModal";
import { useDeleteSeries } from "../../features/series/hooks/useDeleteSeries";
import { toast } from "sonner";
import { getErrorMessage } from "../../shared/utils/getErrorMessage";
function SeriesList() {
  const { data, isLoading, isError } = useSeries();

  const [selectedSeries, setSelectedSeries] = useState(null);

const deleteSeriesMutation = useDeleteSeries();

const handleDelete = async () => {
  try {
    await deleteSeriesMutation.mutateAsync(
      selectedSeries._id,
    );

    setSelectedSeries(null);
    toast.success("Series Deleted Successfully")
  } catch (error) {
    console.error(error);
    alert(
     toast.error(getErrorMessage(error))
    );
  }
};

  const series = data?.data?.data || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        Loading series...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500">
        Failed to load series.
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Series
        </h1>

        <Link
          to="/admin/series/create"
          className="rounded-lg bg-emerald-500 px-4 py-2 font-medium text-white"
        >
          Create Series
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-800">
        <table className="w-full">
          <thead className="bg-slate-900">
            <tr>
  <th className="px-4 py-3 text-left">Logo</th>
  <th className="px-4 py-3 text-left">Name</th>
  <th className="px-4 py-3 text-left">Short Name</th>
  <th className="px-4 py-3 text-left">Season</th>
  <th className="px-4 py-3 text-left">Status</th>
  <th className="px-4 py-3 text-left">Created</th>
  <th className="px-4 py-3 text-left">Actions</th>
</tr>
          </thead>

          <tbody>
            {series.map((item) => (
              <tr
  key={item._id}
  className="border-t border-slate-800"
>
  <td className="px-4 py-3">
    <img
      src={item.logo}
      alt={item.name}
      className="h-10 w-10 rounded-lg object-cover"
    />
  </td>

  <td className="px-4 py-3">
    {item.name}
  </td>

  <td className="px-4 py-3">
    {item.shortName}
  </td>

  <td className="px-4 py-3">
    {item.season}
  </td>

  <td className="px-4 py-3">
    <StatusBadge status={item.status} />
  </td>

  <td className="px-4 py-3">
    {new Date(item.createdAt).toLocaleDateString()}
  </td>

  <td className="px-4 py-3">
  <div className="flex gap-2">
    <Link
      to={`/admin/series/${item._id}/edit`}
      className="rounded bg-blue-500 px-3 py-1 text-sm text-white"
    >
      Edit
    </Link>

    <button
      onClick={() => setSelectedSeries(item)}
      className="rounded bg-red-500 px-3 py-1 text-sm text-white"
    >
      Delete
    </button>
  </div>
</td>
</tr>
            ))}
          </tbody>
        </table>

        {series.length === 0 && (
          <div className="p-6 text-center text-slate-400">
            No series found.
          </div>
        )}
      </div>
      <ConfirmModal
  open={!!selectedSeries}
  title="Delete Series"
  description={`Are you sure you want to delete "${selectedSeries?.name}"?`}
  onConfirm={handleDelete}
  onCancel={() => setSelectedSeries(null)}
/>
    </div>
    
  );
}

export default SeriesList;