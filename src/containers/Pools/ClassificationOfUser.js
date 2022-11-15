import React, { Component } from "react";
import Loader from "../../components/UI/Loader";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from "material-ui/Table";
import PointsOfMatch from "../Matches/PointsOfMatch";
import { Card, CardHeader } from "material-ui/Card";

import {
  ROUND_16,
  ROUND_8,
  ROUND_4,
  ROUND_FINALS,
  ROUND_3x4,
  FINAL_RESULT,
  TOP_SCORER,
} from "../../store/actions/types";

import PointsOfClassifiedsTeams from "../Matches/PointsOfClassifiedsTeams";

class ClassificationOfUser extends Component {
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
      TOP_SCORER: 0,
    };
  }
  getAllPoints = () => {
    return 100;
  };
  updatePoints = (group, data) => {
    //console.log('mamae');
    this.setState({ group: data });
  };
  renderPointsOfMatch = () => {
    return (
      <Card>
        <CardHeader title="Pontos por Jogo" />
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
                Minha Aposta
              </TableHeaderColumn>
              <TableHeaderColumn style={{ width: "23%" }}>
                Resultado
              </TableHeaderColumn>
              <TableHeaderColumn style={{ width: "23%" }}>
                Pontos
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.props.matchesOfUser.map((userMatch) => (
              <PointsOfMatch
                userMatch={userMatch}
                outcomeMatch={this.props.outcomeMatches.find(
                  (k) => k.name === userMatch.name
                )}
              />
            ))}
          </TableBody>
        </Table>
      </Card>
    );
  };
  render() {
    const { matchesOfUser, outcomeMatches } = this.props;
    if (matchesOfUser.length > 0 && outcomeMatches.length > 0) {
      //console.log("oi");
      return (
        <div>
          <div>{this.renderPointsOfMatch()}</div>
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
        </div>
      );

      //return this.renderList();
    } else {
      return <Loader />;
    }
  }
}

export default ClassificationOfUser;
