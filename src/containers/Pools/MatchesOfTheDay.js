import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from "material-ui/Table";
import TeamClassification from "../../components/Match/TeamClassification";
import User from "../../components/User/User";

import { Card } from "material-ui/Card";

class MatchesOfTheDay extends Component {
  getUserByKey = (key) => {
    return this.props.users[key];
  };
  renderUserMatches = (user, filteredMatchesIds) => {
    let matchesToday = Object.keys(user.matches).map(
      (key) => user.matches[key]
    );
    let filteredMatches = matchesToday.filter((value) =>
      filteredMatchesIds.includes(value.name)
    );
    return (
      <TableRow style={{ height: "64px" }}>
        <TableRowColumn style={{ width: "20%", padding: 0 }}>
          <User user={this.getUserByKey(user.key)} />
        </TableRowColumn>
        {filteredMatches.map((userMatch) => (
          <TableRowColumn
            style={{ width: "20%", textAlign: "center", padding: 0 }}
          >
            {userMatch.home_result + " x " + userMatch.away_result}
          </TableRowColumn>
        ))}
      </TableRow>
    );
  };

  renderHeader = (matches) => {
    return (
      <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn style={{ width: "20%", padding: 0 }}>
            Jogador
          </TableHeaderColumn>
          {matches.map((match) => (
            <TableHeaderColumn
              style={{
                width: "20%",
                textAlign: "center",
                whiteSpace: "break-spaces",
                padding: 0,
              }}
            >
              <TeamClassification
                bothTeams={true}
                home={match.home_team}
                away={match.away_team}
              />
            </TableHeaderColumn>
          ))}
        </TableRow>
      </TableHeader>
    );
  };

  filterMatches = (value) => {
    const now = new Date();
    const dateToCompare = new Date(value.date);
    return dateToCompare.getDate() === now.getDate();
  };

  render() {
    const { outcomeMatches, poolData } = this.props;

    const matchesToday = Object.keys(outcomeMatches).map(
      (key) => outcomeMatches[key]
    );
    const filteredMatches = matchesToday.filter(this.filterMatches);

    const filteredMatchesIds = filteredMatches.map((value) => value.name);

    const renderData = poolData.map((user) =>
      this.renderUserMatches(user, filteredMatchesIds)
    );

    return (
      <Card>
        <Table className="table-matches-day">
          {this.renderHeader(filteredMatches)}
          <TableBody displayRowCheckbox={false}>{renderData}</TableBody>
        </Table>
      </Card>
    );
  }
}

export default MatchesOfTheDay;
