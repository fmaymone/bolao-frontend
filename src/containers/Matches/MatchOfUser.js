import React, { Component } from "react";
import {
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import TeamClassification from "../../components/Match/TeamClassification";

class MatchOfUser extends Component {


  renderCell = () => {
    const { userMatch } = this.props;

    if (userMatch.name !== undefined) {
      return (
        <TableRow>
          <TableRowColumn style={{ width: "8%" }}>
            {userMatch.name}
          </TableRowColumn>
          <TableRowColumn style={{ width: "23%" }}>
            <div style={{ display: "inline-block" }}>
              <TeamClassification isHomeTeam={true} id={userMatch.home_team} />{" "}
              <div style={{ display: "inline-block" }}>{" x "} {" "}</div>
              <TeamClassification isHomeTeam={true} id={userMatch.away_team} />
            </div>
          </TableRowColumn>
          <TableRowColumn style={{ width: "23%" }}>
            <div style={{ display: "inline-block" }}>
              {userMatch.home_result + " x " + userMatch.away_result}
            </div>
          </TableRowColumn>
        </TableRow>
      );
    } else {
      return <div />;
    }
  };
  render() {
    return this.renderCell();
  }
}

export default MatchOfUser;
