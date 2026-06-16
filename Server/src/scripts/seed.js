import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import env from "../config/env.js";
import User from "../models/user.model.js";
import Team from "../models/team.model.js";
import Player from "../models/player.model.js";
import Series from "../models/series.model.js";
import Match from "../models/match.model.js";
import Score from "../models/score.model.js";
import Commentary from "../models/commentary.model.js";

// Constant roles and statuses
import Roles from "../shared/constant/role.constant.js";
import PLAYER_ROLES from "../shared/constant/player.constant.js";
import SERIES_STATUS from "../shared/constant/series.constant.js";
import MATCH_STATUS from "../shared/constant/match.constant.js";
import COMMENTARY_TYPE from "../shared/constant/commentary.constant.js";

const seed = async () => {
  try {
    console.log("Connecting to database...");
    await mongoose.connect(env.MONGODB_URI);
    console.log("Database connected. Dropping database for a clean start...");

    // Drop database to get rid of any legacy/incorrect unique indexes
    if (process.env.NODE_ENV !== "production") {
      await mongoose.connection.db.dropDatabase();
    }

    // Seed Users
    console.log("Seeding users...");
    const hashedPassword = await bcrypt.hash("password123", 10);
    const users = await User.insertMany([
      {
        name: "Super Admin",
        email: "superadmin@cricbuzz.com",
        password: hashedPassword,
        role: Roles.SUPER_ADMIN,
      },
      {
        name: "Admin Scorer",
        email: "admin@cricbuzz.com",
        password: hashedPassword,
        role: Roles.ADMIN,
      },
      {
        name: "Match Scorer",
        email: "scorer@cricbuzz.com",
        password: hashedPassword,
        role: Roles.SCORER,
      },
    ]);

    const adminId = users[0]._id;

    // Seed Players
    console.log("Seeding players...");
    const playerDefinitions = {
      IND: [
        {
          name: "Rohit Sharma",
          role: PLAYER_ROLES.BATTER,
          country: "India",
          battingStyle: "Right-handed",
          bowlingStyle: "Right-arm offbreak",
        },
        {
          name: "Yashasvi Jaiswal",
          role: PLAYER_ROLES.BATTER,
          country: "India",
          battingStyle: "Left-handed",
          bowlingStyle: "Right-arm legbreak",
        },
        {
          name: "Virat Kohli",
          role: PLAYER_ROLES.BATTER,
          country: "India",
          battingStyle: "Right-handed",
          bowlingStyle: "Right-arm medium",
        },
        {
          name: "Rishabh Pant",
          role: PLAYER_ROLES.WICKET_KEEPER,
          country: "India",
          battingStyle: "Left-handed",
        },
        {
          name: "Hardik Pandya",
          role: PLAYER_ROLES.ALL_ROUNDER,
          country: "India",
          battingStyle: "Right-handed",
          bowlingStyle: "Right-arm fast-medium",
        },
        {
          name: "Ravindra Jadeja",
          role: PLAYER_ROLES.ALL_ROUNDER,
          country: "India",
          battingStyle: "Left-handed",
          bowlingStyle: "Slow left-arm orthodox",
        },
        {
          name: "Axar Patel",
          role: PLAYER_ROLES.ALL_ROUNDER,
          country: "India",
          battingStyle: "Left-handed",
          bowlingStyle: "Slow left-arm orthodox",
        },
        {
          name: "Jasprit Bumrah",
          role: PLAYER_ROLES.BOWLER,
          country: "India",
          battingStyle: "Right-handed",
          bowlingStyle: "Right-arm fast",
        },
        {
          name: "Kuldeep Yadav",
          role: PLAYER_ROLES.BOWLER,
          country: "India",
          battingStyle: "Left-handed",
          bowlingStyle: "Left-arm wrist spin",
        },
        {
          name: "Mohammed Siraj",
          role: PLAYER_ROLES.BOWLER,
          country: "India",
          battingStyle: "Right-handed",
          bowlingStyle: "Right-arm fast",
        },
        {
          name: "Arshdeep Singh",
          role: PLAYER_ROLES.BOWLER,
          country: "India",
          battingStyle: "Left-handed",
          bowlingStyle: "Left-arm medium-fast",
        },
      ],
      AUS: [
        {
          name: "Travis Head",
          role: PLAYER_ROLES.BATTER,
          country: "Australia",
          battingStyle: "Left-handed",
          bowlingStyle: "Right-arm offbreak",
        },
        {
          name: "David Warner",
          role: PLAYER_ROLES.BATTER,
          country: "Australia",
          battingStyle: "Left-handed",
          bowlingStyle: "Right-arm legbreak",
        },
        {
          name: "Mitchell Marsh",
          role: PLAYER_ROLES.ALL_ROUNDER,
          country: "Australia",
          battingStyle: "Right-handed",
          bowlingStyle: "Right-arm medium",
        },
        {
          name: "Glenn Maxwell",
          role: PLAYER_ROLES.ALL_ROUNDER,
          country: "Australia",
          battingStyle: "Right-handed",
          bowlingStyle: "Right-arm offbreak",
        },
        {
          name: "Marcus Stoinis",
          role: PLAYER_ROLES.ALL_ROUNDER,
          country: "Australia",
          battingStyle: "Right-handed",
          bowlingStyle: "Right-arm medium-fast",
        },
        {
          name: "Tim David",
          role: PLAYER_ROLES.BATTER,
          country: "Australia",
          battingStyle: "Right-handed",
          bowlingStyle: "Right-arm offbreak",
        },
        {
          name: "Matthew Wade",
          role: PLAYER_ROLES.WICKET_KEEPER,
          country: "Australia",
          battingStyle: "Left-handed",
        },
        {
          name: "Pat Cummins",
          role: PLAYER_ROLES.BOWLER,
          country: "Australia",
          battingStyle: "Right-handed",
          bowlingStyle: "Right-arm fast",
        },
        {
          name: "Mitchell Starc",
          role: PLAYER_ROLES.BOWLER,
          country: "Australia",
          battingStyle: "Left-handed",
          bowlingStyle: "Left-arm fast",
        },
        {
          name: "Adam Zampa",
          role: PLAYER_ROLES.BOWLER,
          country: "Australia",
          battingStyle: "Right-handed",
          bowlingStyle: "Right-arm legbreak",
        },
        {
          name: "Josh Hazlewood",
          role: PLAYER_ROLES.BOWLER,
          country: "Australia",
          battingStyle: "Right-handed",
          bowlingStyle: "Right-arm fast-medium",
        },
      ],
      PAK: [
        {
          name: "Babar Azam",
          role: PLAYER_ROLES.BATTER,
          country: "Pakistan",
          battingStyle: "Right-handed",
          bowlingStyle: "Right-arm offbreak",
        },
        {
          name: "Mohammad Rizwan",
          role: PLAYER_ROLES.WICKET_KEEPER,
          country: "Pakistan",
          battingStyle: "Right-handed",
        },
        {
          name: "Fakhar Zaman",
          role: PLAYER_ROLES.BATTER,
          country: "Pakistan",
          battingStyle: "Left-handed",
        },
        {
          name: "Usman Khan",
          role: PLAYER_ROLES.BATTER,
          country: "Pakistan",
          battingStyle: "Right-handed",
        },
        {
          name: "Iftikhar Ahmed",
          role: PLAYER_ROLES.ALL_ROUNDER,
          country: "Pakistan",
          battingStyle: "Right-handed",
          bowlingStyle: "Right-arm offbreak",
        },
        {
          name: "Shadab Khan",
          role: PLAYER_ROLES.ALL_ROUNDER,
          country: "Pakistan",
          battingStyle: "Right-handed",
          bowlingStyle: "Right-arm legbreak",
        },
        {
          name: "Imad Wasim",
          role: PLAYER_ROLES.ALL_ROUNDER,
          country: "Pakistan",
          battingStyle: "Left-handed",
          bowlingStyle: "Slow left-arm orthodox",
        },
        {
          name: "Shaheen Afridi",
          role: PLAYER_ROLES.BOWLER,
          country: "Pakistan",
          battingStyle: "Left-handed",
          bowlingStyle: "Left-arm fast",
        },
        {
          name: "Naseem Shah",
          role: PLAYER_ROLES.BOWLER,
          country: "Pakistan",
          battingStyle: "Right-handed",
          bowlingStyle: "Right-arm fast",
        },
        {
          name: "Haris Rauf",
          role: PLAYER_ROLES.BOWLER,
          country: "Pakistan",
          battingStyle: "Right-handed",
          bowlingStyle: "Right-arm fast",
        },
        {
          name: "Mohammad Amir",
          role: PLAYER_ROLES.BOWLER,
          country: "Pakistan",
          battingStyle: "Left-handed",
          bowlingStyle: "Left-arm fast-medium",
        },
      ],
    };

    // Save players to database and build a mapping
    const savedPlayers = {};
    for (const [teamCode, playersList] of Object.entries(playerDefinitions)) {
      savedPlayers[teamCode] = [];
      for (const p of playersList) {
        const playerDoc = await Player.create({
          ...p,
          createdBy: adminId,
          updatedBy: adminId,
        });
        savedPlayers[teamCode].push(playerDoc);
      }
    }

    console.log("Seeding teams...");
    const teamDocs = [];
    const indTeam = await Team.create({
      name: "India",
      shortName: "IND",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/320px-Flag_of_India.svg.png",
      primaryColor: "#005BA6",
      squadPlayers: savedPlayers.IND.map((p) => p._id),
      createdBy: adminId,
      updatedBy: adminId,
    });
    teamDocs.push(indTeam);

    const ausTeam = await Team.create({
      name: "Australia",
      shortName: "AUS",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia.svg/320px-Flag_of_Australia.svg.png",
      primaryColor: "#FFE000",
      squadPlayers: savedPlayers.AUS.map((p) => p._id),
      createdBy: adminId,
      updatedBy: adminId,
    });
    teamDocs.push(ausTeam);

    const pakTeam = await Team.create({
      name: "Pakistan",
      shortName: "PAK",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Flag_of_Pakistan.svg/320px-Flag_of_Pakistan.svg.png",
      primaryColor: "#00401A",
      squadPlayers: savedPlayers.PAK.map((p) => p._id),
      createdBy: adminId,
      updatedBy: adminId,
    });
    teamDocs.push(pakTeam);

    console.log("Seeding series...");
    const seriesDocs = await Series.insertMany([
      {
        name: "ICC Men's T20 World Cup 2026",
        shortName: "T20WC 2026",
        season: "2026",
        status: SERIES_STATUS.LIVE,
        logo: "https://example.com/t20wc.png",
        createdBy: adminId,
        updatedBy: adminId,
      },
      {
        name: "IPL 2026",
        shortName: "IPL 2026",
        season: "2026",
        status: SERIES_STATUS.UPCOMING,
        logo: "https://example.com/ipl.png",
        createdBy: adminId,
        updatedBy: adminId,
      },
      {
        name: "Ashes Series 2025",
        shortName: "ASHES 2025",
        season: "2025",
        status: SERIES_STATUS.COMPLETED,
        logo: "https://example.com/ashes.png",
        createdBy: adminId,
        updatedBy: adminId,
      },
    ]);

    const liveSeries = seriesDocs[0];
    const upcomingSeries = seriesDocs[1];
    const completedSeries = seriesDocs[2];

    // Helper to generate playing XI list
    const makePlayingXI = (players, captainIndex, wkIndex) => {
      return players.map((p, idx) => ({
        player: p._id,
        isCaptain: idx === captainIndex,
        isWicketKeeper: idx === wkIndex,
      }));
    };

    console.log("Seeding matches...");

    // 1. Live Match (IND vs PAK)
    const indPlayingXI = makePlayingXI(savedPlayers.IND, 0, 3); // Rohit capt, Pant WK
    const pakPlayingXI = makePlayingXI(savedPlayers.PAK, 0, 1); // Babar capt, Rizwan WK

    const liveMatch = await Match.create({
      seriesId: liveSeries._id,
      matchNumber: "Match 1",
      venue: "Narendra Modi Stadium, Ahmedabad",
      startTime: new Date(),
      status: MATCH_STATUS.LIVE,
      team1: indTeam._id,
      team2: pakTeam._id,
      tossWinner: indTeam._id,
      tossDecision: "BAT",
      playingXI: {
        team1: indPlayingXI,
        team2: pakPlayingXI,
      },
      createdBy: adminId,
      updatedBy: adminId,
    });

    // 2. Upcoming Match (IND vs AUS)
    const upcomingMatch = await Match.create({
      seriesId: upcomingSeries._id,
      matchNumber: "Match 2",
      venue: "Wankhede Stadium, Mumbai",
      startTime: new Date(Date.now() + 86400000 * 2), // 2 days later
      status: MATCH_STATUS.UPCOMING,
      team1: indTeam._id,
      team2: ausTeam._id,
      createdBy: adminId,
      updatedBy: adminId,
    });

    // 3. Completed Match (AUS vs PAK)
    const ausPlayingXI = makePlayingXI(savedPlayers.AUS, 7, 6); // Cummins capt, Wade WK
    const completedMatch = await Match.create({
      seriesId: completedSeries._id,
      matchNumber: "Final",
      venue: "Melbourne Cricket Ground, Melbourne",
      startTime: new Date(Date.now() - 86400000 * 5), // 5 days ago
      status: MATCH_STATUS.COMPLETED,
      team1: ausTeam._id,
      team2: pakTeam._id,
      tossWinner: ausTeam._id,
      tossDecision: "BOWL",
      playingXI: {
        team1: ausPlayingXI,
        team2: pakPlayingXI,
      },
      winner: ausTeam._id,
      result: "Australia won by 6 wickets",
      createdBy: adminId,
      updatedBy: adminId,
    });

    console.log("Seeding scores...");
    // Scores for Live Match (Innings 1 and 2)
    await Score.create({
      matchId: liveMatch._id,
      innings: 1,
      battingTeam: indTeam._id,
      score: 182,
      wickets: 5,
      overs: "20.0",
      runRate: 9.1,
    });

    await Score.create({
      matchId: liveMatch._id,
      innings: 2,
      battingTeam: pakTeam._id,
      score: 120,
      wickets: 4,
      overs: "15.2",
      runRate: 7.83,
      target: 183,
    });

    // Scores for Completed Match (Innings 1 and 2)
    await Score.create({
      matchId: completedMatch._id,
      innings: 1,
      battingTeam: pakTeam._id,
      score: 152,
      wickets: 8,
      overs: "20.0",
      runRate: 7.6,
    });

    await Score.create({
      matchId: completedMatch._id,
      innings: 2,
      battingTeam: ausTeam._id,
      score: 155,
      wickets: 4,
      overs: "18.4",
      runRate: 8.3,
      target: 153,
    });

    console.log("Seeding commentaries...");
    // Commentary for Live Match, Innings 2, over 15
    const liveCommData = [
      {
        matchId: liveMatch._id,
        innings: 2,
        over: 15,
        ball: 1,
        battingTeam: pakTeam._id,
        player: savedPlayers.PAK[0]._id, // Babar Azam
        type: COMMENTARY_TYPE.NORMAL,
        message:
          "Arshdeep Singh to Babar Azam, 1 run, tucked away to deep square leg for a single.",
        runs: 1,
        wicket: false,
        createdBy: adminId,
      },
      {
        matchId: liveMatch._id,
        innings: 2,
        over: 15,
        ball: 2,
        battingTeam: pakTeam._id,
        player: savedPlayers.PAK[1]._id, // Rizwan
        type: COMMENTARY_TYPE.FOUR,
        message:
          "Arshdeep Singh to Mohammad Rizwan, FOUR, slashed over point! That was short and wide, Rizwan didn't spare it.",
        runs: 4,
        wicket: false,
        createdBy: adminId,
      },
      {
        matchId: liveMatch._id,
        innings: 2,
        over: 15,
        ball: 3,
        battingTeam: pakTeam._id,
        player: savedPlayers.PAK[1]._id,
        type: COMMENTARY_TYPE.SIX,
        message:
          "Arshdeep Singh to Mohammad Rizwan, SIX, massive hit! Full delivery on the pads, Rizwan flicks it way over deep backward square leg.",
        runs: 6,
        wicket: false,
        createdBy: adminId,
      },
      {
        matchId: liveMatch._id,
        innings: 2,
        over: 15,
        ball: 4,
        battingTeam: pakTeam._id,
        player: savedPlayers.PAK[1]._id,
        type: COMMENTARY_TYPE.WICKET,
        message:
          "Arshdeep Singh to Mohammad Rizwan, OUT! Caught! Rizwan goes for another big one but gets a top edge. Kuldeep Yadav takes a comfortable catch at short fine leg.",
        runs: 0,
        wicket: true,
        createdBy: adminId,
      },
      {
        matchId: liveMatch._id,
        innings: 2,
        over: 15,
        ball: 5,
        battingTeam: pakTeam._id,
        player: savedPlayers.PAK[2]._id, // Fakhar Zaman
        type: COMMENTARY_TYPE.NORMAL,
        message:
          "Arshdeep Singh to Fakhar Zaman, no run, solid defense from the new batsman.",
        runs: 0,
        wicket: false,
        createdBy: adminId,
      },
      {
        matchId: liveMatch._id,
        innings: 2,
        over: 15,
        ball: 6,
        battingTeam: pakTeam._id,
        player: savedPlayers.PAK[2]._id,
        type: COMMENTARY_TYPE.NORMAL,
        message:
          "Arshdeep Singh to Fakhar Zaman, 1 run, pushed to extra cover for a quick single.",
        runs: 1,
        wicket: false,
        createdBy: adminId,
      },
    ];

    await Commentary.insertMany(liveCommData);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from database.");
  }
};

seed();
