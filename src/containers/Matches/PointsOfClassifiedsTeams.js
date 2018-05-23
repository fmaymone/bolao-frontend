import React, { Component } from "react";
import {
  ROUND_16,
  ROUND_8,
  ROUND_4,
  ROUND_FINALS,
  ROUND_3x4,
  FINAL_RESULT,
  TOP_SCORER
} from "../../store/actions/types";

import ClassifiedTeamsPhase from "../../components/Classification/ClassifiedTeamsPhase";
import FinalResult from "../../components/Classification/FinalResult";
import TopScorer from "../../components/Classification/TopScorer";

class PointsOfClassifiedsTeams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true
    };
  }
  componentDidMount() {
    this.fillClassifieds();
    
  }
  renderCard = () => {
    return (
      <ClassifiedTeamsPhase data={this.state.data} group={this.props.group} />
    );
  };

  renderFinalResult =  () =>{
    let points = 0;
    
    const {matchesOfUser, outcomeMatches} = this.props;
    const userFinalResult = matchesOfUser.find(k=>k.group===FINAL_RESULT);
    const outcomeFinalResult = outcomeMatches.find(k=>k.group===FINAL_RESULT);
    let structuredReturn = {points: 0,
      first:{id:userFinalResult.first,type:userFinalResult.first === outcomeFinalResult.first},
      second:{id:userFinalResult.second,type:userFinalResult.second === outcomeFinalResult.second},
      third:{id:userFinalResult.third,type:userFinalResult.third === outcomeFinalResult.third},
      fourth:{id:userFinalResult.fourth,type:userFinalResult.fourth === outcomeFinalResult.fourth}
    }

    points += structuredReturn.first.type * this.numberPointsKnockoutMatches(this.props.group).first
    points += structuredReturn.second.type * this.numberPointsKnockoutMatches(this.props.group).second
    points += structuredReturn.third.type * this.numberPointsKnockoutMatches(this.props.group).third
    points += structuredReturn.fourth.type * this.numberPointsKnockoutMatches(this.props.group).fourth

    structuredReturn.points = points;

  //  this.setState({points: structuredReturn.points, data: structuredReturn})
//    await this.props.updatePoints(this.props.group, this.state.data);

    return (<FinalResult data={structuredReturn} group={this.props.group} />)
  }

  renderTopScorer = () =>{
    let points = 0;
    
    const {matchesOfUser, outcomeMatches} = this.props;
    const userFinalResult = matchesOfUser.find(k=>k.group===TOP_SCORER);
    const outcomeFinalResult = outcomeMatches.find(k=>k.group===TOP_SCORER);
    
    
    if(userFinalResult.nameOfTopScorer === outcomeFinalResult.nameOfTopScorer){
      points += this.numberPointsKnockoutMatches(this.props.group).name
    }
    if(userFinalResult.goals === outcomeFinalResult.goals){
      points += this.numberPointsKnockoutMatches(this.props.group).goals
    }

    return (<TopScorer name={userFinalResult.nameOfTopScorer} goals={userFinalResult.goals} points={points} group={this.props.group}/>)
  }

  fillClassifieds = async () => {
    await this.calculatePointsIsClassified(
      this.props.group,
      this.getMatchesFiltered(this.props.group, this.props.matchesOfUser),
      this.getMatchesFiltered(this.props.group, this.props.outcomeMatches)
    );
    await this.props.updatePoints(this.props.group, this.state.data);
  };

  calculatePointsIsClassified = async (
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

    for (let index = 0; index < matchesOfUser.length; index++) {
      const elementUser = matchesOfUser[index];
      const elementOutcome = outcomeMatches[index];
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
        structuredReturn.points += this.numberPointsKnockoutMatches(
          group
        ).classified;
        if (teamsSpecificPosition.includes(element)) {
          structuredReturn.teams.push({ id: element, type: "specific" });
          structuredReturn.points += this.numberPointsKnockoutMatches(
            group
          ).specificTeam;
        } else {
          structuredReturn.teams.push({ id: element, type: "included" });
        }
      } else {
        structuredReturn.teams.push({ id: element, type: "not_included" });
      }
    }
    this.setState({ data: structuredReturn, isLoading: false });
  };

  numberPointsKnockoutMatches = group => {
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
  getMatchesFiltered = (group, matches) => {
    let matchesOfUserFiltered = [];
    for (let index = 0; index < matches.length; index++) {
      const element = matches[index];
      if (element.group === group) {
        matchesOfUserFiltered.push(element);
      }
    }
    return matchesOfUserFiltered;
  };

  render() {
    const { matchesOfUser, outcomeMatches } = this.props;

    if (
      matchesOfUser.length > 0 &&
      outcomeMatches.length > 0 &&
      this.state.isLoading === false
    ) {
      if(this.props.group === FINAL_RESULT){
        return this.renderFinalResult();
      }
      if(this.props.group === TOP_SCORER){
        return this.renderTopScorer();
      }
      return this.renderCard();
    } else {
      return <div />;
    }
  }
}

export default PointsOfClassifiedsTeams;
