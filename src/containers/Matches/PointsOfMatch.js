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

class PointsOfMatch extends Component {
  constructor(props) {
    super(props);
    this.state = { points: 0 };
  }
  calculatePointsOfMatch = async (userMatch, outcomeMatch) => {};

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
    console.log('oi');
    
      return (
        <TableRow>
          <TableRowColumn style={{width: '30%'}}>{userMatch.name}</TableRowColumn>
        </TableRow>
      );

    
  };
  render() {
    console.log("oi");
    return this.renderCell();
  }
}

export default PointsOfMatch;
