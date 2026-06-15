import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { useMatch } from "../../features/matches/hooks/useMatch.js";
import { useTeamSquad } from "../../features/matches/hooks/useTeamSquad";
import { useSelectPlayingXi } from "../../features/matches/hooks/useSelectPlayingXi";

function PlayingXi() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: matchResponse, isLoading: matchLoading } = useMatch(id);

  const match = matchResponse?.data?.data;

  const team1Id = match?.team1?._id;
  const team2Id = match?.team2?._id;

  const { data: team1Response } = useTeamSquad(team1Id);

  const { data: team2Response } = useTeamSquad(team2Id);

  const team1Squad = team1Response?.data?.data?.squadPlayers || [];

  const team2Squad = team2Response?.data?.data?.squadPlayers || [];

  const [team1Players, setTeam1Players] = useState([]);

  const [team2Players, setTeam2Players] = useState([]);

  const selectPlayingXiMutation = useSelectPlayingXi();

  const togglePlayer = (team, playerId) => {
    const state = team === "team1" ? team1Players : team2Players;

    const setState = team === "team1" ? setTeam1Players : setTeam2Players;

    const exists = state.find((p) => p.player === playerId);

    if (exists) {
      setState(state.filter((p) => p.player !== playerId));
      return;
    }

    if (state.length >= 11) {
      toast.error("Only 11 players can be selected");
      return;
    }

    setState([
      ...state,
      {
        player: playerId,
        isCaptain: false,
        isWicketKeeper: false,
      },
    ]);
  };

  const setCaptain = (team, playerId) => {
    const state = team === "team1" ? team1Players : team2Players;

    const setState = team === "team1" ? setTeam1Players : setTeam2Players;

    setState(
      state.map((player) => ({
        ...player,
        isCaptain: player.player === playerId,
      })),
    );
  };

  const setKeeper = (team, playerId) => {
    const state = team === "team1" ? team1Players : team2Players;

    const setState = team === "team1" ? setTeam1Players : setTeam2Players;

    setState(
      state.map((player) => ({
        ...player,
        isWicketKeeper: player.player === playerId,
      })),
    );
  };

  const validateTeam = (teamPlayers, label) => {
    if (teamPlayers.length !== 11) {
      toast.error(`${label} must have exactly 11 players`);
      return false;
    }

    const captainCount = teamPlayers.filter((p) => p.isCaptain).length;

    if (captainCount !== 1) {
      toast.error(`${label} must have exactly 1 captain`);
      return false;
    }

    const keeperCount = teamPlayers.filter((p) => p.isWicketKeeper).length;

    if (keeperCount !== 1) {
      toast.error(`${label} must have exactly 1 wicket keeper`);
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    const team1Valid = validateTeam(team1Players, match?.team1?.shortName);

    const team2Valid = validateTeam(team2Players, match?.team2?.shortName);

    if (!team1Valid || !team2Valid) {
      return;
    }

    try {
      await selectPlayingXiMutation.mutateAsync({
        id,
        data: {
          team1: team1Players,
          team2: team2Players,
        },
      });

      toast.success("Playing XI selected successfully");

      navigate("/admin/matches");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to select Playing XI",
      );
    }
  };

  const renderTeamCards = (players, selectedPlayers, teamKey, title) => {
    return (
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{title}</h2>

          <span className="rounded bg-slate-800 px-3 py-1 text-sm">
            Selected: {selectedPlayers.length}/11
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {players.map((player) => {
            const selected = selectedPlayers.find(
              (p) => p.player === player._id,
            );

            return (
              <div
                key={player._id}
                className={`rounded-xl border p-4 transition ${
                  selected
                    ? "border-green-500 bg-green-500/10"
                    : "border-slate-700 bg-slate-900"
                }`}
              >
                <img
                  src={player.image}
                  alt={player.name}
                  className="mx-auto mb-3 h-20 w-20 rounded-full object-cover"
                />

                <h3 className="text-center font-semibold">{player.name}</h3>

                <p className="text-center text-sm text-slate-400">
                  {player.role}
                </p>

                <div className="mt-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={!!selected}
                      onChange={() => togglePlayer(teamKey, player._id)}
                    />
                    Select
                  </label>

                  {selected && (
                    <>
                      <label className="mt-2 flex items-center gap-2">
                        <input
                          type="radio"
                          name={`${teamKey}-captain`}
                          checked={selected.isCaptain}
                          onChange={() => setCaptain(teamKey, player._id)}
                        />
                        Captain
                      </label>

                      <label className="mt-2 flex items-center gap-2">
                        <input
                          type="radio"
                          name={`${teamKey}-keeper`}
                          checked={selected.isWicketKeeper}
                          onChange={() => setKeeper(teamKey, player._id)}
                        />
                        Wicket Keeper
                      </label>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (matchLoading) {
    return <div className="flex justify-center">Loading Playing XI...</div>;
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold">Select Playing XI</h1>

        <p className="mt-2 text-slate-400">
          {match?.team1?.shortName} vs {match?.team2?.shortName}
        </p>
      </div>

      {renderTeamCards(
        team1Squad,
        team1Players,
        "team1",
        `${match?.team1?.name} Playing XI`,
      )}

      {renderTeamCards(
        team2Squad,
        team2Players,
        "team2",
        `${match?.team2?.name} Playing XI`,
      )}

      <button
        onClick={handleSubmit}
        disabled={selectPlayingXiMutation.isPending}
        className="rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white"
      >
        {selectPlayingXiMutation.isPending ? "Saving..." : "Save Playing XI"}
      </button>
    </div>
  );
}

export default PlayingXi;
