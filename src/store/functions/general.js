import {
    ROUND_16,
    ROUND_8,
    ROUND_4,
    ROUND_FINALS,
    ROUND_3x4,
    FINAL_RESULT,
    TOP_SCORER
} from "../actions/types";


export const calculatePoints = (userMatches, outcomeMatches) => {
    let structuredReturn = {
        pointsOfMatches:{},
        ROUND_16: {},
        ROUND_8: {},
        ROUND_4: {},
        ROUND_FINALS,
        ROUND_3x4,
        TOP_SCORER,
        FINAL_RESULT

    }
    structuredReturn.FINAL_RESULT = getPointsOfFinalResult(userMatches, outcomeMatches);
    structuredReturn.TOP_SCORER = getPointsTopScorer(userMatches, outcomeMatches);
    structuredReturn.ROUND_16 = getPointsOfClassifiedInRounds(ROUND_16, userMatches, outcomeMatches);
    structuredReturn.ROUND_8 = getPointsOfClassifiedInRounds(ROUND_8, userMatches, outcomeMatches);
    structuredReturn.ROUND_4 = getPointsOfClassifiedInRounds(ROUND_4, userMatches, outcomeMatches);
    structuredReturn.ROUND_FINALS = getPointsOfClassifiedInRounds(ROUND_FINALS, userMatches, outcomeMatches);
    structuredReturn.ROUND_3x4 = getPointsOfClassifiedInRounds(ROUND_3x4, userMatches, outcomeMatches);
    structuredReturn.pointsOfMatches = getPointsOfMatches(userMatches,outcomeMatches);
 
    return structuredReturn;
 
}
const getPointsOfMatches = (matchesOfUser, outcomeMatches) => {
    let structuredReturn = {totalPoints:0, matches:[]};
    let totalPoints = 0;
    for (let index = 0; index < matchesOfUser.length; index++) {
        let points = 0;
        
        const elementUser = matchesOfUser[index];
        const elementOutcome = outcomeMatches[index];
        let tempElement = { points:0, match:elementUser};
        if(elementOutcome.finished === true){
            const pointsCalculated = getPointsOfMatch(elementUser, elementOutcome);
            tempElement.points = pointsCalculated;
            totalPoints += pointsCalculated
        }
        structuredReturn.matches.push(tempElement);
    }
    structuredReturn.totalPoints = totalPoints;
    
    return structuredReturn;

}

const getPointsOfMatch = (userMatch, outcomeMatch) => {
    let points = 0;

    if (
      Math.sign(userMatch.home_result - userMatch.away_result) ===
      Math.sign(outcomeMatch.home_result - outcomeMatch.away_result)
    ) {
      
      if (Math.sign(userMatch.home_result - userMatch.away_result) === 0) {
        points += 4;
        if (userMatch.home_result == outcomeMatch.home_result) {
          points += 2;
        }
      } else {
        points += 3;
        if (userMatch.home_result == outcomeMatch.home_result) {
          points += 1.5;
        }
        if (userMatch.away_result == outcomeMatch.away_result) {
          points += 1.5;
        }
      }
    }
    return points;
  };

const getPointsOfFinalResult = (matchesOfUser, outcomeMatches) => {
    let points = 0;
    let structuredReturn;

    if (matchesOfUser !== undefined && outcomeMatches !== undefined) {
        const userFinalResult = matchesOfUser.find(k => k.group === FINAL_RESULT);
        const outcomeFinalResult = outcomeMatches.find(k => k.group === FINAL_RESULT);
        structuredReturn = {
            points: 0,
            first: { id: userFinalResult.first, type: userFinalResult.first === outcomeFinalResult.first },
            second: { id: userFinalResult.second, type: userFinalResult.second === outcomeFinalResult.second },
            third: { id: userFinalResult.third, type: userFinalResult.third === outcomeFinalResult.third },
            fourth: { id: userFinalResult.fourth, type: userFinalResult.fourth === outcomeFinalResult.fourth }
        }

        points += structuredReturn.first.type * numberPointsKnockoutMatches(FINAL_RESULT).first
        points += structuredReturn.second.type * numberPointsKnockoutMatches(FINAL_RESULT).second
        points += structuredReturn.third.type * numberPointsKnockoutMatches(FINAL_RESULT).third
        points += structuredReturn.fourth.type * numberPointsKnockoutMatches(FINAL_RESULT).fourth

        structuredReturn.points = points;

    }
    return structuredReturn;
}


const numberPointsKnockoutMatches = group => {
    switch (group) {
        case ROUND_16:
            return { classified: 4, specificTeam: 6 };
        case ROUND_8:
            return { classified: 4, specificTeam: 6 };
        case ROUND_4:
            return { classified: 4, specificTeam: 8 };
        case ROUND_3x4:
            return { classified: 4, specificTeam: 6 };
        case ROUND_FINALS:
            return { classified: 0, specificTeam: 10 };
        case FINAL_RESULT:
            return { specificTeam: 8, first: 15, second: 10, third: 7, fourth: 5 };
        case TOP_SCORER:
            return { name: 12, goals: 5 };
        default:
            return 0;
    }
};

const getPointsTopScorer = (matchesOfUser, outcomeMatches) => {
    let points = 0;


    const userFinalResult = matchesOfUser.find(k => k.group === TOP_SCORER);
    const outcomeFinalResult = outcomeMatches.find(k => k.group === TOP_SCORER);
    let structuredReturn = { total: 0, scorer: 0, goals: 0 }

    if (userFinalResult.nameOfTopScorer === outcomeFinalResult.nameOfTopScorer) {
        structuredReturn.scorer += numberPointsKnockoutMatches(TOP_SCORER).name
    }
    if (userFinalResult.goals === outcomeFinalResult.goals) {
        structuredReturn.goals += numberPointsKnockoutMatches(TOP_SCORER).goals
    }
    structuredReturn.points = structuredReturn.scorer + structuredReturn.goals;

    return structuredReturn;
}

const getPointsOfClassifiedInRounds = (
    group,
    matchesOfUser,
    outcomeMatches
) => {
    let teamsOfUser = [];
    let teamsOutcome = [];
    let teamsSpecificPosition = [];
    let structuredReturn = {
        points: 0,
        teams: []
    };
    const actualMatchesOfUser = getActualMatches(matchesOfUser, group);
    const actualMatchesOutcome = getActualMatches(outcomeMatches, group);

    for (let index = 0; index < actualMatchesOfUser.length; index++) {
        const elementUser = actualMatchesOfUser[index];
        const elementOutcome = actualMatchesOutcome[index];
        teamsOfUser.push(elementUser.away_team);
        teamsOfUser.push(elementUser.home_team);
        teamsOutcome.push(elementOutcome.away_team);
        teamsOutcome.push(elementOutcome.home_team);
        if (elementUser.away_team === elementOutcome.away_team) {
            teamsSpecificPosition.push(elementUser.away_team);
        }
        if (elementUser.home_team === elementOutcome.home_team) {
            teamsSpecificPosition.push(elementUser.home_team);
        }
    }

    for (let index = 0; index < teamsOfUser.length; index++) {
        const element = teamsOfUser[index];
        if (teamsOutcome.includes(element)) {
            structuredReturn.points += numberPointsKnockoutMatches(
                group
            ).classified;
            if (teamsSpecificPosition.includes(element)) {
                structuredReturn.teams.push({ id: element, type: "specific" });
                structuredReturn.points += numberPointsKnockoutMatches(
                    group
                ).specificTeam;
            } else {
                structuredReturn.teams.push({ id: element, type: "included" });
            }
        } else {
            structuredReturn.teams.push({ id: element, type: "not_included" });
        }
    }
    return structuredReturn;
};

//   const filterFromGroup = (value) => {
//     return value.group === group;
//   };

const getActualMatches = (matches, group) => {
    const filteredMatches = matches.filter(function (elem, i, array) {
        return elem.group === group;
    });


    return filteredMatches;
};


const calculateRegularPoints = (userMatch, outcomeMatch) => {
    let structuredReturn = {userMatch: userMatch, outcomeMatch: outcomeMatch, points:0}
    let points = 0;

    if (
      Math.sign(userMatch.home_result - userMatch.away_result) ===
      Math.sign(outcomeMatch.home_result - outcomeMatch.away_result)
    ) {
      //console.log("oi");
      //draw
      if (Math.sign(userMatch.home_result - userMatch.away_result) === 0) {
        points += 4;
        if (userMatch.home_result == outcomeMatch.home_result) {
          points += 2;
        }
      } else {
        points += 3;
        if (userMatch.home_result == outcomeMatch.home_result) {
          points += 1.5;
        }
        if (userMatch.away_result == outcomeMatch.away_result) {
          points += 1.5;
        }
      }
    }
    structuredReturn.points = points;
    return structuredReturn;
  };