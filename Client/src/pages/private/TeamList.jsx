import { Link } from "react-router-dom";
import { useTeams } from "../../features/teams/hooks/useTeams";
import { useState } from "react";
import { toast } from "sonner";

import ConfirmModal from "../../shared/components/ui/ConfirmModal";

import { useDeleteTeam } from "../../features/teams/hooks/useDeleteTeam";

import { getErrorMessage } from "../../shared/utils/getErrorMessage";

function TeamsList() {
    const [selectedTeam, setSelectedTeam] = useState(null);

const deleteTeamMutation = useDeleteTeam();
const handleDelete = async () => {
  try {
    await deleteTeamMutation.mutateAsync(
      selectedTeam._id,
    );

    toast.success("Team deleted successfully");

    setSelectedTeam(null);
  } catch (error) {
    toast.error(getErrorMessage(error));
  }
};
  const { data, isLoading, isError } = useTeams();

  const teams = data?.data?.data || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        Loading teams...
      </div> 
    );
  }

  if (isError) {
    return (
      <div className="text-red-500">
        Failed to load teams.
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Teams
        </h1>

        <Link
          to="/admin/teams/create"
          className="rounded-lg bg-emerald-500 px-4 py-2 font-medium text-white"
        >
          Create Team
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-800">
        <table className="w-full">
          <thead className="bg-slate-900">
            <tr>
              <th className="px-4 py-3 text-left">
                Logo
              </th>

              <th className="px-4 py-3 text-left">
                Name
              </th>

              <th className="px-4 py-3 text-left">
                Short Name
              </th>

              <th className="px-4 py-3 text-left">
                Primary Color
              </th>

              <th className="px-4 py-3 text-left">
                Created
              </th>

              <th className="px-4 py-3 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {teams.map((team) => (
              <tr
                key={team._id}
                className="border-t border-slate-800"
              >
                <td className="px-4 py-3">
                  <img
                    src={team.logo}
                    alt={team.name}
                    className="h-10 w-10 rounded-lg object-cover"
                  />
                </td>

                <td className="px-4 py-3">
                  {team.name}
                </td>

                <td className="px-4 py-3">
                  {team.shortName}
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-4 w-4 rounded-full border"
                      style={{
                        backgroundColor:
                          team.primaryColor,
                      }}
                    />

                    {team.primaryColor ||
                      "Not Set"}
                  </div>
                </td>

                <td className="px-4 py-3">
                  {new Date(
                    team.createdAt,
                  ).toLocaleDateString()}
                </td>

                <td className="px-4 py-3">
                  <div className="flex gap-2">
  <Link
    to={`/admin/teams/${team._id}/edit`}
    className="rounded bg-blue-500 px-3 py-1 text-sm text-white"
  >
    Edit
  </Link>

  <button
    onClick={() => setSelectedTeam(team)}
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

        {teams.length === 0 && (
          <div className="p-6 text-center text-slate-400">
            No teams found.
          </div>
        )}
      </div>
      <ConfirmModal
  open={!!selectedTeam}
  title="Delete Team"
  description={`Are you sure you want to delete "${selectedTeam?.name}"?`}
  onConfirm={handleDelete}
  onCancel={() => setSelectedTeam(null)}
/>
    </div>
  );
}

export default TeamsList;