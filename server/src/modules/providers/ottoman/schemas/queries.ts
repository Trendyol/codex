const findChallenges = `SELECT q1.id,
q1.activeParticipants,
q1.date,
q1.description,
q1.duration,
q1.name,
q1.participants,
q1.status,
q1.teamSize,
userActiveParticipant,
userParticipant
FROM default q1
LET userActiveParticipant = (
SELECT "true"
FROM default q2
WHERE q2.type = 'challenge'
 AND q2.id == q1.id
 AND $USER_ID IN q2.activeParticipants),
userParticipant = (
SELECT "true"
FROM default q3
WHERE q3.type = 'challenge'
 AND q3.id == q1.id
 AND $USER_ID IN q3.participants)
WHERE q1.type = 'challenge'
GROUP BY q1.id,
  q1.activeParticipants,
  q1.date,
  q1.description,
  q1.duration,
  q1.name,
  q1.participants,
  q1.problem,
  q1.status,
  q1.teamSize,
  userActiveParticipant,
  userParticipant
ORDER BY q1.date`;

const findChallenge = `
SELECT q1.id,
       q1.activeParticipants,
       q1.date,
       q1.description,
       q1.duration,
       q1.name,
       q1.participants,
       q1.problemId,
       q1.status,
       q1.teamSize,
       userActiveParticipant,
       userParticipant,
       problem
FROM default q1
LET userActiveParticipant = (
    SELECT "true"
    FROM default q2
    WHERE q2.type = 'challenge'
        AND q2.id == q1.id
        AND $USER_ID IN q2.activeParticipants),
userParticipant = (
    SELECT "true"
    FROM default q3
    WHERE q3.type = 'challenge'
        AND q3.id == q1.id
        AND $USER_ID IN q3.participants),
problem = (
  SELECT *
  FROM default q4
  WHERE q4.type = 'problem'
      AND q4.id == q1.problemId)
WHERE q1.type = 'challenge'
    AND q1.id = $CHALLENGE_ID
GROUP BY q1.id,
         q1.activeParticipants,
         q1.date,
         q1.description,
         q1.duration,
         q1.name,
         q1.participants,
         q1.problemId,
         q1.status,
         q1.teamSize,
         userActiveParticipant,
         userParticipant,
         difficulty,
         problem`;

const findWinners = `
SELECT MAX([runtime, teamId])[0] as runtime, MAX([runtime, teamId])[1] as teamId FROM default
where type = 'submission' and challengeId = $CHALLENGE_ID
group by teamId order by runtime desc limit 3`;

const findChallengeTeamFinishRankings = `
SELECT MIN([date, teamId])[0] as date, MIN([date, teamId])[1] as teamId FROM default
where type = 'submission' and status = 3 and challengeId = $CHALLENGE_ID
group by teamId order by date asc
`;

const addPointsToUser = `
UPDATE default
SET points = points + $POINTS
WHERE type = 'user' and id = $USER_ID
`;

const findChallengePlacements = `
SELECT MIN([date, teamId])[0] AS date,
       MIN([date, teamId])[1] AS teamId,
       participants
FROM default q1
LET team = (
    SELECT participants
    FROM default q2
    WHERE type = 'team'
        AND id = q1.teamId),
participants = (
    SELECT *
    FROM default  where type = 'user' and id in team[0].participants)
WHERE type = 'submission'
    AND status = 3
    AND challengeId = $CHALLENGE_ID
GROUP BY teamId,
         participants
ORDER BY date ASC
`;

export const queries = {
  findChallenges,
  findChallenge,
  findWinners,
  findChallengeTeamFinishRankings,
  addPointsToUser,
  findChallengePlacements
};
