import React, { Component } from "react";
import Loader from "../../components/UI/Loader";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,

} from "material-ui/Table";
import MatchOfUser from "../Matches/MatchOfUser";
import {
  Card,

  CardHeader,
 
} from "material-ui/Card";

import {
  ROUND_16,
  ROUND_8,
  ROUND_4,
  ROUND_FINALS,
  ROUND_3x4,
  FINAL_RESULT,
  TOP_SCORER
} from "../../store/actions/types";

import { Activity } from "rmw-shell";

import PointsOfClassifiedsTeams from "../Matches/PointsOfClassifiedsTeams";


class MatchesOfUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      points_matches: 0,
      ROUND_16: 0,
      ROUND_8: 0,
      ROUND_4: 0,
      ROUND_FINALS: 0,
      ROUND_3x4: 0,
      FINAL_RESULT: 0,
      TOP_SCORER: 0
    };
  }
  getAllPoints = () =>{
    return 100;
  }
  updatePoints = (group, data) => {
    //console.log('mamae');
    this.setState({group: data});
  }
  renderPointsOfMatch = (matchesOfUser, outcomeMatches) => {
    return (
      <Card>
        <CardHeader title="Apostas" />
        <Table>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn style={{ width: "8%" }}>
                Jogo
              </TableHeaderColumn>
              <TableHeaderColumn style={{ width: "23%" }}>
                Times
              </TableHeaderColumn>
              <TableHeaderColumn style={{ width: "23%" }}>
                Aposta
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {matchesOfUser.map(userMatch => (
              <MatchOfUser
                userMatch={userMatch}
                outcomeMatch={outcomeMatches.find(
                  k => k.name === userMatch.name
                )}
              />
            ))}
          </TableBody>
        </Table>
      </Card>
    );
  };
  render() {
    
    const { user, outcomeMatches, profile } = this.props.location.state;
    const matchesOfUser = user.matches;
    if (matchesOfUser.length > 0 && outcomeMatches.length > 0) {
      //console.log("oi");
      return (
        
        <Activity title={`Jogo de ${profile.displayName}`}>
        <div>
          {this.renderPointsOfMatch(matchesOfUser, outcomeMatches)}
        </div>
        <div>
          <PointsOfClassifiedsTeams
            matchesOfUser={matchesOfUser}
            outcomeMatches={outcomeMatches}
            group={ROUND_16}
            updatePoints={this.updatePoints}
          />
          <PointsOfClassifiedsTeams
            matchesOfUser={matchesOfUser}
            outcomeMatches={outcomeMatches}
            group={ROUND_8}
            updatePoints={this.updatePoints}
          />
          <PointsOfClassifiedsTeams
            matchesOfUser={matchesOfUser}
            outcomeMatches={outcomeMatches}
            group={ROUND_4}
            updatePoints={this.updatePoints}
          />
          <PointsOfClassifiedsTeams
            matchesOfUser={matchesOfUser}
            outcomeMatches={outcomeMatches}
            group={ROUND_3x4}
            updatePoints={this.updatePoints}
          />
          <PointsOfClassifiedsTeams
            matchesOfUser={matchesOfUser}
            outcomeMatches={outcomeMatches}
            group={ROUND_FINALS}
            updatePoints={this.updatePoints}
          />
           <PointsOfClassifiedsTeams
            matchesOfUser={matchesOfUser}
            outcomeMatches={outcomeMatches}
            group={FINAL_RESULT}
            updatePoints={this.updatePoints}
          />
           <PointsOfClassifiedsTeams
            matchesOfUser={matchesOfUser}
            outcomeMatches={outcomeMatches}
            group={TOP_SCORER}
            updatePoints={this.updatePoints}
          />
        </div>
        </Activity>
    
      );
    } else {
      return <Loader />;
    }
  }
}

export default MatchesOfUser;
