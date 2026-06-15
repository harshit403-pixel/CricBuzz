import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { usePlayers } from "../../features/player/hooks/usePlayers";

import { useSquad } from "../../features/sqaud/hooks/useSquad";
import { useAddPlayerToSquad } from "../../features/sqaud/hooks/useAddPlayerToSquad";
import { useRemovePlayerFromSquad } from "../../features/sqaud/hooks/useRemovePlayerFromSquad";

import { getErrorMessage } from "../../shared/utils/getErrorMessage";

function ManageTeamSquad() {
  const { id: teamId } = useParams();

  const { data: squadData, isLoading: squadLoading } = useSquad(teamId);

  const { data: playersData, isLoading: playersLoading } = usePlayers();

  const addPlayerMutation = useAddPlayerToSquad();

  const removePlayerMutation = useRemovePlayerFromSquad();

  const squad = squadData?.data?.data;

  const allPlayers = playersData?.data?.data || [];

  const squadPlayers = squad?.squadPlayers || [];

  const squadPlayerIds = new Set(squadPlayers.map((player) => player._id));

  const availablePlayers = allPlayers.filter(
    (player) => !squadPlayerIds.has(player._id),
  );

  const handleAddPlayer = async (playerId) => {
    try {
      await addPlayerMutation.mutateAsync({
        teamId,
        playerId,
      });

      toast.success("Player added to squad");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleRemovePlayer = async (playerId) => {
    try {
      await removePlayerMutation.mutateAsync({
        teamId,
        playerId,
      });

      toast.success("Player removed from squad");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  if (squadLoading || playersLoading) {
    return (
      <div className="flex items-center justify-center">Loading squad...</div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{squad?.teamName}</h1>

        <p className="mt-2 text-slate-400">
          Squad Count: {squad?.squadCount || 0}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Available Players */}

        <div className="rounded-xl border border-slate-800">
          <div className="border-b border-slate-800 p-4">
            <h2 className="text-xl font-semibold">Available Players</h2>
          </div>

          <div>
            {availablePlayers.map((player) => (
              <div
                key={player._id}
                className="flex items-center justify-between border-b border-slate-800 p-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={player.image || "https://placehold.co/50x50"}
                    alt={player.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-medium">{player.name}</p>

                    <p className="text-sm text-slate-400">
                      {player.role} • {player.country}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleAddPlayer(player._id)}
                  className="rounded bg-emerald-500 px-3 py-1 text-sm text-white"
                >
                  Add
                </button>
              </div>
            ))}

            {availablePlayers.length === 0 && (
              <div className="p-6 text-center text-slate-400">
                No players available
              </div>
            )}
          </div>
        </div>

        {/* Squad Players */}

        <div className="rounded-xl border border-slate-800">
          <div className="border-b border-slate-800 p-4">
            <h2 className="text-xl font-semibold">Current Squad</h2>
          </div>

          <div>
            {squadPlayers.map((player) => (
              <div
                key={player._id}
                className="flex items-center justify-between border-b border-slate-800 p-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={player.image || "https://placehold.co/50x50"}
                    alt={player.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-medium">{player.name}</p>

                    <p className="text-sm text-slate-400">
                      {player.role} • {player.country}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleRemovePlayer(player._id)}
                  className="rounded bg-red-500 px-3 py-1 text-sm text-white"
                >
                  Remove
                </button>
              </div>
            ))}

            {squadPlayers.length === 0 && (
              <div className="p-6 text-center text-slate-400">
                No players in squad
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageTeamSquad;
