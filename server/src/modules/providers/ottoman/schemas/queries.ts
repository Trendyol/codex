import config from '@core/config/configuration';

const bucketName = config.couchbase.bucketName;

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
FROM ${bucketName} q1
LET userActiveParticipant = (
SELECT "true"
FROM ${bucketName} q2
WHERE q2.type = 'challenge'
 AND q2.id == q1.id
 AND $USER_ID IN q2.activeParticipants),
userParticipant = (
SELECT "true"
FROM ${bucketName} q3
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
ORDER BY q1.date desc`;

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
FROM ${bucketName} q1
LET userActiveParticipant = (
    SELECT "true"
    FROM ${bucketName} q2
    WHERE q2.type = 'challenge'
        AND q2.id == q1.id
        AND $USER_ID IN q2.activeParticipants),
userParticipant = (
    SELECT "true"
    FROM ${bucketName} q3
    WHERE q3.type = 'challenge'
        AND q3.id == q1.id
        AND $USER_ID IN q3.participants),
problem = (
  SELECT *
  FROM ${bucketName} q4
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
SELECT MAX([runtime, teamId])[0] as runtime, MAX([runtime, teamId])[1] as teamId FROM ${bucketName}
where type = 'submission' and challengeId = $CHALLENGE_ID
group by teamId order by runtime desc limit 3`;

const findChallengeTeamFinishRankings = `
SELECT MIN([date, teamId])[0] as date, MIN([date, teamId])[1] as teamId FROM ${bucketName}
where type = 'submission' and status = 3 and challengeId = $CHALLENGE_ID
group by teamId order by date asc
`;

const addPointsToUser = `
UPDATE ${bucketName}
SET points = points + $POINTS
WHERE type = 'user' and id = $USER_ID
`;

const findChallengePlacements = `
SELECT MIN([date, teamId])[0] AS date,
       MIN([date, teamId])[1] AS teamId,
       participants,
       submission
FROM ${bucketName} submission
LET team = (
    SELECT participants
    FROM ${bucketName} q2
    WHERE type = 'team'
        AND id = submission.teamId),
participants = (
    SELECT *
    FROM ${bucketName}  where type = 'user' and id in team[0].participants)
WHERE type = 'submission'
    AND status = 3
    AND challengeId = $CHALLENGE_ID
GROUP BY teamId,
         participants,
         submission
ORDER BY date ASC
`;

const appendChallengeToUser = `
Update ${bucketName} set challenges = ARRAY_APPEND(challenges, $CHALLENGE)
where type = 'user' and id = $USER_ID
`;

const appendProblemToUser = `
Update ${bucketName} set problems = ARRAY_APPEND(problems, $PROBLEM)
where type = 'user' and id = $USER_ID
`;

const findProblems = `
SELECT *, solved
FROM ${bucketName} q1
LET solved = (
    SELECT TRUE
    FROM ${bucketName} q2
    WHERE type = 'user'
        AND q1.id in q2.problems and q2.id = $USER_ID),
    tags = (
    select * from ${bucketName} q3 where type = 'tag' and q3.id in q1.tags
    )
WHERE type = 'problem' 
`;

const findProblemsWithTags = `
SELECT *, solved
FROM ${bucketName} q1
LET solved = (
    SELECT TRUE
    FROM ${bucketName} q2
    WHERE type = 'user'
        AND q1.id in q2.problems and q2.id = $USER_ID),
    tags = (
    select * from ${bucketName} q3 where type = 'tag' and q3.id in q1.tags
    )
WHERE type = 'problem' and ANY tag IN q1.tags SATISFIES tag IN $TAG_IDS END;
`;

const findProblemProgression = `SELECT ARRAY_LENGTH(solvedAll) AS solvedAll,
ARRAY_LENGTH(totalAll) AS totalAll,
ARRAY_LENGTH(solvedEasy) AS solvedEasy,
ARRAY_LENGTH(totalEasy) AS totalEasy,
ARRAY_LENGTH(solvedMedium) AS solvedMedium,
ARRAY_LENGTH(totalMedium) AS totalMedium,
ARRAY_LENGTH(solvedHard) AS solvedHard,
ARRAY_LENGTH(totalHard) AS totalHard
FROM ${bucketName} q1
LET solvedAll = (
SELECT *
FROM ${bucketName} q2
WHERE type = 'problem'
 AND id IN q1.problems),
totalAll = (
SELECT *
FROM ${bucketName} q2
WHERE type = 'problem'),
solvedEasy = (
SELECT *
FROM ${bucketName} q2
WHERE type = 'problem'
 AND difficulty = 1
 AND id IN q1.problems),
totalEasy = (
SELECT *
FROM ${bucketName} q2
WHERE type = 'problem'
 AND difficulty = 1),
solvedMedium = (
SELECT *
FROM ${bucketName} q2
WHERE type = 'problem'
 AND difficulty = 2
 AND id IN q1.problems),
totalMedium = (
SELECT *
FROM ${bucketName} q2
WHERE type = 'problem'
 AND difficulty = 2),
solvedHard = (
SELECT *
FROM ${bucketName} q2
WHERE type = 'problem'
 AND difficulty = 3
 AND id IN q1.problems),
totalHard = (
SELECT *
FROM ${bucketName} q2
WHERE type = 'problem'
 AND difficulty = 3)
WHERE type = 'user'
AND id = $USER_ID`;

const findArticle = `
SELECT *, author
FROM default q1
LET author = (
  SELECT q2.id, q2.name, q2.avatar
  FROM default q2
  WHERE q2.type = 'user' AND q2.id == q1.userId)
  WHERE q1.type = 'article' AND q1.id = $ARTICLE_ID
`;

const findArticles = `
  SELECT *, author
  FROM default q1
  LET author = (
    SELECT q2.id, q2.name, q2.avatar
    FROM default q2
    WHERE q2.type = 'user' AND q2.id == q1.userId
  )
  WHERE q1.type = 'article' AND q1.isPublished = true
`;

const findDraftArticles = `
  SELECT *, author
  FROM default q1
  LET author = (
    SELECT q2.id, q2.name, q2.avatar
    FROM default q2
    WHERE q2.type = 'user' AND q2.id == q1.userId
  )
  WHERE q1.type = 'article' AND q1.isPublished = false AND q1.userId = $USER_ID
`;

export const queries = {
  findChallenges,
  findChallenge,
  findWinners,
  findChallengeTeamFinishRankings,
  addPointsToUser,
  findChallengePlacements,
  appendChallengeToUser,
  appendProblemToUser,
  findProblems,
  findProblemsWithTags,
  findProblemProgression,
  findArticle,
  findArticles,
  findDraftArticles,
};
