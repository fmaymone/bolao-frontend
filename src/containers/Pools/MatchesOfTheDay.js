import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import TeamClassification from "../../components/Match/TeamClassification";
import User from "../../components/User/User";

import { Card } from "material-ui/Card";

class MatchesOfTheDay extends Component {
  getMatchesOfDay = () => {
    let current = new Date();
  };
  getUserByKey = key => {
    const a = this.props.users.find(k => k.key === key);
    return a.val;
  };
  renderUserMatches = user => {
    let matchesToday = Object.keys(user.matches).map(key => user.matches[key]);
    let filteredMatches = matchesToday.filter(this.filterMatches);
    return (
      <TableRow>
        <TableRowColumn style={{ width: "30%" }}>
          <User user={this.getUserByKey(user.key)} />
        </TableRowColumn>
        {filteredMatches.map(userMatch => (
          <TableRowColumn style={{ width: "15%" }}>
            {userMatch.home_result + " x " + userMatch.away_result}
          </TableRowColumn>
        ))}
      </TableRow>
    );
  };

  renderHeader = matches => {
    return (
      <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn style={{ width: "30%" }}>
            Jogador
          </TableHeaderColumn>
          {matches.map(match => (
            <TableHeaderColumn style={{ width: "15%" }}>
              <div style={{ display: "inline-block" }}>
                <TeamClassification isHomeTeam={true} id={match.home_team} />{" "}
                <div style={{ display: "inline-block" }}>{" x "} </div>
                <TeamClassification isHomeTeam={true} id={match.away_team} />
              </div>
            </TableHeaderColumn>
          ))}
        </TableRow>
      </TableHeader>
    );
  };

  filterMatches = value => {
    const now = new Date();
    const dateToCompare = new Date(value.date);
    return dateToCompare.getDate() === now.getDate();
  };

  render() {
    const { outcomeMatches, users, poolData } = this.props;

    let matchesToday = Object.keys(outcomeMatches).map(
      key => outcomeMatches[key]
    );
    let filteredMatches = matchesToday.filter(this.filterMatches);

    //console.log(filteredMatches);

    const renderData = poolData.map(user => this.renderUserMatches(user));

    return (
      <Card>
        <Table>
          {this.renderHeader(filteredMatches)}
          <TableBody displayRowCheckbox={false}>{renderData}</TableBody>
        </Table>
      </Card>
    );
  }
}

export default MatchesOfTheDay;
