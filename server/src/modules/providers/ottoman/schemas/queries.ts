const findChallenges = `SELECT q1.id,
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
ORDER by q1.date`;

const findChallenge = `
SELECT q1.id,
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
       userParticipant,
       difficulty
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
difficulty = (
    SELECT q4.difficulty
    FROM default q4
    WHERE q4.type = 'problem'
        AND q4.id == q1.problem)
WHERE q1.type = 'challenge'
    AND q1.id = $CHALLENGE_ID
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
         userParticipant,
         difficulty`;

export const queries = {
  findChallenges,
  findChallenge
};
