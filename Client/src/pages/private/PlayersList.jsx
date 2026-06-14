import { Link } from "react-router-dom";
import { usePlayers } from "../../features/player/hooks/usePlayers.js";
import { useState } from "react";
import { toast } from "sonner";

import ConfirmModal from "../../shared/components/ui/ConfirmModal";

import { useDeletePlayer } from "../../features/player/hooks/useDeletePlayer.js";

import { getErrorMessage } from "../../shared/utils/getErrorMessage";

function PlayersList() {
  const { data, isLoading, isError } = usePlayers();
  const [selectedPlayer, setSelectedPlayer] = useState(null);

const deletePlayerMutation = useDeletePlayer();
const handleDelete = async () => {
  try {
    await deletePlayerMutation.mutateAsync(
      selectedPlayer._id,
    );

    toast.success(
      "Player deleted successfully",
    );

    setSelectedPlayer(null);
  } catch (error) {
    toast.error(
      getErrorMessage(error),
    );
  }
};

  const players = data?.data?.data || [];

  if (isLoading) {
    return <div>Loading players...</div>;
  }

  if (isError) {
    return (
      <div className="text-red-500">
        Failed to load players.
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Players
        </h1>

        <Link
          to="/admin/players/create"
          className="rounded-lg bg-emerald-500 px-4 py-2 font-medium text-white"
        >
          Create Player
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-800">
        <table className="w-full">
          <thead className="bg-slate-900">
            <tr>
              <th className="px-4 py-3 text-left">
                Image
              </th>

              <th className="px-4 py-3 text-left">
                Name
              </th>

              <th className="px-4 py-3 text-left">
                Role
              </th>

              <th className="px-4 py-3 text-left">
                Country
              </th>

              <th className="px-4 py-3 text-left">
                Batting Style
              </th>

              <th className="px-4 py-3 text-left">
                Bowling Style
              </th>

              <th className="px-4 py-3 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {players.map((player) => (
              <tr
                key={player._id}
                className="border-t border-slate-800"
              >
                <td className="px-4 py-3">
                  <img
  src={player.image || "https://placehold.co/40x40?text=P"}
  alt={player.name}
  className="h-10 w-10 rounded-full object-cover"
  onError={(e) => {
    e.currentTarget.src =
      "https://placehold.co/40x40?text=P";
  }}
/>
                </td>

                <td className="px-4 py-3">
                  {player.name}
                </td>

                <td className="px-4 py-3">
                  {player.role}
                </td>

                <td className="px-4 py-3">
                  {player.country}
                </td>

                <td className="px-4 py-3">
                  {player.battingStyle || "-"}
                </td>

                <td className="px-4 py-3">
                  {player.bowlingStyle || "-"}
                </td>

               
                  <td className="px-4 py-3">
  <div className="flex gap-2">
    <Link
      to={`/admin/players/${player._id}/edit`}
      className="rounded bg-blue-500 px-3 py-1 text-sm text-white"
    >
      Edit
    </Link>

    <button
      onClick={() =>
        setSelectedPlayer(player)
      }
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

        {players.length === 0 && (
          <div className="p-6 text-center text-slate-400">
            No players found.
          </div>
        )}
      </div>
      <ConfirmModal
  open={!!selectedPlayer}
  title="Delete Player"
  description={`Are you sure you want to delete "${selectedPlayer?.name}"?`}
  onConfirm={handleDelete}
  onCancel={() =>
    setSelectedPlayer(null)
  }
/>
    </div>
  );
}

export default PlayersList;