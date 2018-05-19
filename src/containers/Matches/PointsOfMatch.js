import React, { Component } from "react";
import {
  ROUND_4,
  ROUND_8,
  TOP_SCORER,
  ROUND_16,
  ROUND_FINALS,
  ROUND_3x4,
  FINAL_RESULT
} from "../../store/actions/types";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import TeamClassification from "../../components/Match/TeamClassification";

class PointsOfMatch extends Component {
  constructor(props) {
    super(props);
    this.state = { points: 0 };
  }
  componentDidMount() {
    this.calculatePointsOfMatch();
  }
  calculatePointsOfMatch = () => {
    const { userMatch, outcomeMatch } = this.props;
    let actualPoints = this.state.points;
    actualPoints += this.calculateRegularPoints(userMatch, outcomeMatch);
    if (userMatch.isKnockout === true && userMatch.name !== undefined) {
      actualPoints += this.calculateKnockoutPoints(userMatch, outcomeMatch);
    } else {
      if (userMatch.first !== undefined) {
        console.log("calculate champions");
      }
      if (userMatch.nameOfTopScorer !== undefined) {
        console.log("calculate topScorer");
      }
    }
    this.setState({ points: actualPoints });
  };
  calculateRegularPoints = (userMatch, outcomeMatch) => {
    let points = 0;

    if (
      Math.sign(userMatch.home_result - userMatch.away_result) ===
      Math.sign(outcomeMatch.home_result - outcomeMatch.away_result)
    ) {
      console.log("oi");
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
    return points;
  };
  calculateKnockoutPoints = (userMatch, outcomeMatch) => {
    let result = 0;
    let pointsPerTeam = this.numberPointsKnockoutMatches(userMatch.group)
      .specificTeam;
    //calculate if the team is inside all the matches

    //calculate if the teams is the same
    if (userMatch.home_team === outcomeMatch.home_team) {
      result += pointsPerTeam;
    }

    if (userMatch.away_team === outcomeMatch.away_team) {
      result += pointsPerTeam;
    }

    return 0;
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
        return { classified: 4, specificTeam: 8 };
      case FINAL_RESULT:
        return { specificTeam: 8, first: 15, second: 10, third: 7, forth: 5 };
      case TOP_SCORER:
        return { name: 12, goals: 5 };
      default:
        return 0;
    }
  };
  renderCell = () => {
    const { userMatch, outcomeMatch } = this.props;
    console.log("oi");
    if (userMatch.name !== undefined) {
      return (
        <TableRow>
          <TableRowColumn style={{ width: "8%" }}>
            {userMatch.name}
          </TableRowColumn>
          <TableRowColumn style={{ width: "23%" }}>
            <div style={{ display: "inline-block" }}>
              <TeamClassification isHomeTeam={true} id={userMatch.home_team} />{" "}
              <div style={{ display: "inline-block" }}>{" x "}</div>
              <TeamClassification isHomeTeam={true} id={userMatch.away_team} />
            </div>
          </TableRowColumn>
          <TableRowColumn style={{ width: "23%" }}>
            <div style={{ display: "inline-block" }}>
              {userMatch.home_result + " x " + userMatch.away_result}
            </div>
          </TableRowColumn>
          <TableRowColumn style={{ width: "23%" }}>
            <div style={{ display: "inline-block" }}>
              {outcomeMatch.home_result + " x " + outcomeMatch.away_result}
            </div>
          </TableRowColumn>
          <TableRowColumn style={{ width: "23%" }}>
            <div style={{ display: "inline-block" }}>{this.state.points}</div>
          </TableRowColumn>
        </TableRow>
      );
    } else {
      
      return <div />;
    }
  };
  render() {
    console.log("oi");
    return this.renderCell();
  }
}

export default PointsOfMatch;
