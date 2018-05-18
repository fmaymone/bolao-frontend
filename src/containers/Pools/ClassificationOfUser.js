import React, { Component } from "react";
import Loader from "../../components/UI/Loader";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import PointsOfMatch from '../Matches/PointsOfMatch';

class ClassificationOfUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderList = () => {
    return (
      <Table>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn style={{ width: "30%" }}>Jogo</TableHeaderColumn>
            <TableHeaderColumn>Minha Aposta</TableHeaderColumn>
            <TableHeaderColumn>Resultado</TableHeaderColumn>
            <TableHeaderColumn>Pontos</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {this.props.matchesOfUser.map(userMatch => (
            <PointsOfMatch userMatch={userMatch} outcomeMatch={this.props.outcomeMatches.find(k=>k.name===userMatch.name)} />
          ))}
        </TableBody>
      </Table>
    );
  };
  render() {
    if (
      this.props.matchesOfUser.length > 0 &&
      this.props.outcomeMatches.length > 0
    ) {
      console.log("oi");
      return this.renderList();
    } else {
      return <Loader />;
    }
  }
}

export default ClassificationOfUser;
