const OVERS_PER_OVER = 6;
const KNOWN_LIMITED_OVERS = [5, 10, 20, 50];

export const formatDateLabel = (value) => {
  if (!value) {
    return "Schedule pending";
  }

  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
};

export const formatLongDateLabel = (value) => {
  if (!value) {
    return "Schedule pending";
  }

  return new Intl.DateTimeFormat("en", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
};

export const getTeamInitials = (value = "") => {
  return value
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};

export const parseOversToBalls = (overs = "0.0") => {
  const [completedOvers = "0", partialBalls = "0"] = String(overs).split(".");

  return Number(completedOvers) * OVERS_PER_OVER + Number(partialBalls);
};

export const getCurrentInnings = (scorecard) => {
  const innings2 = scorecard?.innings2;

  if (
    innings2 &&
    (innings2.score > 0 ||
      innings2.wickets > 0 ||
      innings2.overs !== "0.0" ||
      innings2.target)
  ) {
    return innings2;
  }

  return scorecard?.innings1 || innings2 || null;
};

export const getPreviousInnings = (scorecard) => {
  const currentInnings = getCurrentInnings(scorecard);

  if (!currentInnings) {
    return null;
  }

  if (scorecard?.innings2 && currentInnings.innings === 2) {
    return scorecard.innings1;
  }

  return null;
};

export const getScoreLine = (innings) => {
  if (!innings) {
    return "--";
  }

  return `${innings.score}/${innings.wickets}`;
};

export const getOversLabel = (innings) => {
  if (!innings) {
    return "Awaiting play";
  }

  return `${innings.overs} Overs`;
};

export const buildTeamScoreRows = (match, scorecard) => {
  const innings = [scorecard?.innings1, scorecard?.innings2].filter(Boolean);
  const inningsByTeamId = new Map(
    innings.map((entry) => [String(entry.battingTeam?._id), entry]),
  );

  return [
    {
      team: match?.team1,
      innings: inningsByTeamId.get(String(match?.team1?._id)) || null,
    },
    {
      team: match?.team2,
      innings: inningsByTeamId.get(String(match?.team2?._id)) || null,
    },
  ];
};

export const inferOverLimit = (scorecard) => {
  const inningsOvers = scorecard?.innings1?.overs;

  if (!inningsOvers) {
    return null;
  }

  const [fullOvers = "0", partialBalls = "0"] = String(inningsOvers).split(".");
  const overCount = Number(fullOvers);

  if (partialBalls === "0" && KNOWN_LIMITED_OVERS.includes(overCount)) {
    return overCount;
  }

  return null;
};

export const getRequiredRunRate = (scorecard) => {
  const currentInnings = getCurrentInnings(scorecard);
  const overLimit = inferOverLimit(scorecard);

  if (!currentInnings?.target || !overLimit || currentInnings.innings !== 2) {
    return null;
  }

  const runsNeeded = currentInnings.target - currentInnings.score;
  const ballsLeft =
    overLimit * OVERS_PER_OVER - parseOversToBalls(currentInnings.overs);

  if (runsNeeded <= 0 || ballsLeft <= 0) {
    return null;
  }

  return ((runsNeeded * OVERS_PER_OVER) / ballsLeft).toFixed(2);
};

export const getLiveSummary = (match, scorecard, commentaryItem) => {
  const currentInnings = getCurrentInnings(scorecard);
  const requiredRate = getRequiredRunRate(scorecard);

  if (!currentInnings) {
    return commentaryItem?.message || "Live coverage is warming up.";
  }

  if (currentInnings.target) {
    const overLimit = inferOverLimit(scorecard);
    const runsNeeded = currentInnings.target - currentInnings.score;
    const ballsLeft = overLimit
      ? overLimit * OVERS_PER_OVER - parseOversToBalls(currentInnings.overs)
      : null;

    if (runsNeeded > 0 && ballsLeft !== null && ballsLeft > 0) {
      return `${currentInnings.battingTeam?.name || match?.team2?.name} need ${runsNeeded} runs in ${ballsLeft} balls. RR ${requiredRate || currentInnings.runRate}.`;
    }

    if (runsNeeded > 0) {
      return `Target ${currentInnings.target}. Current RR ${currentInnings.runRate}.`;
    }
  }

  if (commentaryItem?.message) {
    return commentaryItem.message;
  }

  return `Current run rate ${currentInnings.runRate}.`;
};

export const getResultSummary = (match, scorecard) => {
  if (match?.result) {
    return match.result;
  }

  const currentInnings = getCurrentInnings(scorecard);

  if (!currentInnings) {
    return "Result pending";
  }

  if (currentInnings.target && currentInnings.score >= currentInnings.target) {
    return `${currentInnings.battingTeam?.name} chased the target successfully.`;
  }

  return "Completed";
};

export const getScoreboardTitle = (match, currentInnings) => {
  if (!currentInnings) {
    return `${match?.team1?.name} vs ${match?.team2?.name}`;
  }

  return `${currentInnings.battingTeam?.name} (${currentInnings.innings} Innings)`;
};

export const getPlayingXiList = (entries = [], squadPlayers = []) => {
  const squadById = new Map(
    squadPlayers.map((player) => [String(player._id), player]),
  );

  return entries.map((entry) => ({
    ...entry,
    playerData: squadById.get(String(entry.player)) || null,
  }));
};
